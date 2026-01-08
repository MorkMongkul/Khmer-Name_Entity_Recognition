# Khmer Named Entity Recognition (NER) API

FastAPI-based REST API for Khmer Named Entity Recognition using BiLSTM-CRF with character-level embeddings.

## Features

- **Named Entity Recognition**: Identifies PER (Person) and LOC (Location) entities in Khmer text
- **Automatic Word Segmentation**: Handles both segmented and unsegmented Khmer text using khmercut
- **Character-level Embeddings**: Uses autoencoder for robust word representations
- **Database Logging**: PostgreSQL database tracks all predictions
- **pgAdmin Integration**: Web-based database management
- **Docker Deployment**: Fully containerized for easy setup

## Tech Stack

- **Backend**: FastAPI 0.109.0, Python 3.10
- **ML**: PyTorch 2.1.2, BiLSTM-CRF, Character Autoencoder
- **Database**: PostgreSQL 15, SQLAlchemy 2.0.25
- **NLP**: khmercut 0.1.0 for Khmer word segmentation
- **DevOps**: Docker, Docker Compose

## Project Structure

```
Khmer-NER/
├── backend/
│   ├── app/
│   │   ├── api/endpoints/    # API routes (predict, health)
│   │   ├── ml/               # Model loading, inference, preprocessing
│   │   ├── models/           # Database models and schemas
│   │   ├── config.py         # Configuration
│   │   ├── database.py       # Database setup
│   │   └── main.py           # FastAPI application
│   ├── models/               # Trained model files (.pth, char2idx.json)
│   ├── requirements.txt
│   └── Dockerfile
├── database/
│   └── init.sql              # Database schema
├── frontend/                 # (To be implemented)
├── docker-compose.yml
├── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites

- Docker Desktop installed and running
- Git

### First-Time Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Khmer-NER
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```
   
   Or manually create `.env`:
   ```env
    #Database Configuration
    POSTGRES_USER=khmer_ner_user
    POSTGRES_PASSWORD=your_secure_password_here
    POSTGRES_DB=khmer_ner_db

    #API Configuration
    API_V1_STR=/api/v1
    PROJECT_NAME=Khmer NER API

    #Model Configuration
    DEVICE=cpu
   ```

3. **Ensure model files exist in `backend/models/`:**
   - `ner_model_best.pth` (BiLSTM-CRF weights)
   - `autoencoder_model.pth` (Character encoder weights)
   - `char2idx.json` (Character vocabulary)

4. **Start all services:**
   ```bash
   docker-compose up -d
   ```
   
   First run will automatically build images (takes 2-3 minutes).

5. **Verify services are running:**
   ```bash
   docker-compose ps
   ```

## Usage

### API Endpoints

**Base URL**: `http://localhost:8000`

#### Health Check
```bash
curl http://localhost:8000/api/v1/health
```

#### NER Prediction
```bash
curl -X POST http://localhost:8000/api/v1/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "ហ៊ុន ម៉ាណែត"}' | python3 -m json.tool
```

**Example Response:**
```json
{
  "text": "ហ៊ុន ម៉ាណែត",
  "entities": [
    {"word": "ហ៊ុន", "label": "B-PER"},
    {"word": "ម៉ាណែត", "label": "I-PER"}
  ],
  "processing_time": 292
}
```

**Supported Inputs:**
- Pre-segmented: `"ហ៊ុន ម៉ាណែត"` (with spaces)
- Unsegmented: `"ហ៊ុនម៉ាណែត"` (auto-segmented by khmercut)

### Interactive API Documentation

Visit `http://localhost:8000/docs` for Swagger UI with live testing.

### Access pgAdmin

1. Open `http://localhost:5050`
2. Login: `admin@admin.com` / `admin`
3. Add server:
   - Host: `db`
   - Port: `5432`
   - Username: `khmer_ner`
   - Password: `khner123`

## Development Workflow

### Starting Development

```bash
cd Khmer-NER
docker-compose up -d
```

### View Logs

```bash
docker-compose logs -f backend    # Backend logs
docker-compose logs -f db         # Database logs
```

### Stop Services

```bash
docker-compose down              # Stop and remove containers
docker-compose stop              # Stop only (keeps data)
```

### Rebuild After Code Changes

Only needed if you modify `Dockerfile` or `requirements.txt`:

```bash
docker-compose build --no-cache backend
docker-compose up -d
```

For Python code changes in `backend/app/`, just restart:

```bash
docker-compose restart backend
```

## Entity Labels

| Label | Description |
|-------|-------------|
| B-PER | Beginning of person name |
| I-PER | Inside person name |
| B-LOC | Beginning of location |
| I-LOC | Inside location |
| O     | Outside any entity |

## Model Architecture

- **Character Autoencoder**: 99 Khmer characters → 128-dim embeddings
- **BiLSTM-CRF**: 256-dim input, 128-dim hidden, 5 output labels
- **Word Segmentation**: khmercut tokenizer for unsegmented text

## License

MIT License

Copyright (c) 2026 Khmer-NER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.