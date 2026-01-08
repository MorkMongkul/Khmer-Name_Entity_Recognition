import torch
import json
from pathlib import Path
from app.config import settings
import torch.nn as nn
from torchcrf import CRF

# Character-level Autoencoder for word embeddings
class CharAutoencoder(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_size, num_layers=2, dropout=0.2):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=0)
        self.encoder_gru = nn.GRU(embedding_dim, hidden_size, num_layers=num_layers, batch_first=True, dropout=dropout)
        self.decoder_gru = nn.GRU(embedding_dim, hidden_size, num_layers=num_layers, batch_first=True, dropout=dropout)
        self.output_fc = nn.Linear(hidden_size, vocab_size)
        self.vocab_size = vocab_size
        self.embedding_dim = embedding_dim
        self.hidden_size = hidden_size
        self.num_layers = num_layers

    def forward(self, input_seq, target_seq=None, teacher_forcing_ratio=0.5):
        embedded = self.embedding(input_seq)
        _, hidden = self.encoder_gru(embedded)
        batch_size, seq_len = input_seq.size()
        decoder_input = input_seq[:, 0].unsqueeze(1)
        outputs = []
        decoder_hidden = hidden
        for t in range(seq_len):
            decoder_embedded = self.embedding(decoder_input)
            decoder_output, decoder_hidden = self.decoder_gru(decoder_embedded, decoder_hidden)
            logits = self.output_fc(decoder_output.squeeze(1))
            outputs.append(logits.unsqueeze(1))
            if target_seq is not None and torch.rand(1).item() < teacher_forcing_ratio:
                next_input = target_seq[:, t].unsqueeze(1)
            else:
                next_input = logits.argmax(dim=1, keepdim=True)
            decoder_input = next_input
        outputs = torch.cat(outputs, dim=1)
        return outputs

# BiLSTM-CRF model for Named Entity Recognition
class BiLSTM_CRF(nn.Module):
    def __init__(self, embedding_dim, hidden_dim, tagset_size):
        super().__init__()
        self.lstm = nn.LSTM(embedding_dim, hidden_dim // 2, num_layers=1, bidirectional=True, batch_first=True)
        self.hidden2tag = nn.Linear(hidden_dim, tagset_size)
        self.crf = CRF(tagset_size, batch_first=True)

    def forward(self, embeds):
        # embeds: (batch, seq_len, embedding_dim)
        lstm_out, _ = self.lstm(embeds)
        emissions = self.hidden2tag(lstm_out)
        return emissions

    def loss(self, embeds, tags, mask):
        emissions = self.forward(embeds)
        return -self.crf(emissions, tags, mask=mask, reduction='mean')

    def predict(self, embeds, mask):
        emissions = self.forward(embeds)
        return self.crf.decode(emissions, mask=mask)

class ModelManager:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelManager, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        self.device = torch.device(settings.DEVICE)
        self._load_models()
    
    def _load_models(self):
        # Load char2idx
        with open(settings.CHAR2IDX_PATH, 'r', encoding='utf-8') as f:
            self.char2idx = json.load(f)
        self.idx2char = {v: k for k, v in self.char2idx.items()}
        
        # Load autoencoder
        vocab_size = len(self.char2idx)
        self.autoencoder = CharAutoencoder(
            vocab_size=vocab_size,
            embedding_dim=128,
            hidden_size=256,
            num_layers=2,
            dropout=0.2
        )
        self.autoencoder.load_state_dict(
            torch.load(settings.AUTOENCODER_PATH, map_location=self.device)
        )
        self.autoencoder.eval()
        self.autoencoder.to(self.device)
        
        # Load NER model
        self.ner_model = BiLSTM_CRF(
            embedding_dim=256,
            hidden_dim=128,
            tagset_size=5  # Your model has 5 labels
        )
        self.ner_model.load_state_dict(
            torch.load(settings.NER_MODEL_PATH, map_location=self.device)
        )
        self.ner_model.eval()
        self.ner_model.to(self.device)
        
        # Load label mappings - must match the sorted label set from training
        # Labels are sorted alphabetically: ['B-LOC', 'B-PER', 'I-LOC', 'I-PER', 'O']
        self.idx2label = {0: "B-LOC", 1: "B-PER", 2: "I-LOC", 3: "I-PER", 4: "O"}
        
    def get_models(self):
        return {
            'autoencoder': self.autoencoder,
            'ner_model': self.ner_model,
            'char2idx': self.char2idx,
            'idx2char': self.idx2char,
            'idx2label': self.idx2label,
            'device': self.device
        }

# Singleton instance
model_manager = ModelManager()