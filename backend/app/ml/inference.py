import torch
import numpy as np
from typing import List, Tuple
from app.ml.model_loader import model_manager
from app.ml.preprocessing import preprocess_text

def get_word_embedding(word, char2idx, autoencoder, device):
    autoencoder.eval()  # Ensure autoencoder is in eval mode
    char_indices = [char2idx.get(c, char2idx['<PAD>']) for c in word]
    char_tensor = torch.tensor(char_indices, dtype=torch.long).unsqueeze(0).to(device)
    with torch.no_grad():
        embedded = autoencoder.embedding(char_tensor)
        _, hidden = autoencoder.encoder_gru(embedded)
    word_emb = hidden[-1].squeeze(0)
    return word_emb.cpu().numpy()

def predict_ner(text: str) -> List[Tuple[str, str]]:
    models = model_manager.get_models()
    autoencoder = models['autoencoder']
    ner_model = models['ner_model']
    char2idx = models['char2idx']
    idx2label = models['idx2label']
    device = models['device']
    
    # Ensure models are in eval mode
    autoencoder.eval()
    ner_model.eval()
    
    # Preprocess and segment text
    segmented_text = preprocess_text(text)
    
    # Tokenize
    tokens = segmented_text.strip().split()
    
    # Get embeddings
    word_embs = [
        get_word_embedding(word, char2idx, autoencoder, device) 
        for word in tokens
    ]
    
    # Prepare input
    X = torch.tensor([word_embs], dtype=torch.float32).to(device)
    mask = torch.ones(1, len(tokens), dtype=torch.bool).to(device)
    
    # Predict
    with torch.no_grad():
        pred_ids = ner_model.predict(X, mask)[0]
    
    # Convert to labels
    pred_labels = [idx2label[i] for i in pred_ids]
    
    return list(zip(tokens, pred_labels))