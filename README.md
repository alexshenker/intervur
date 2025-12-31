# Intervur

Interview question search app with hybrid semantic + fuzzy search.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Download the embedding model

The app uses `bge-large-en-v1.5` for semantic search. Download the model files:

```bash
mkdir -p models/bge-large-en-v1.5/onnx
cd models/bge-large-en-v1.5

# Download model config and tokenizer
curl -LO https://huggingface.co/Xenova/bge-large-en-v1.5/resolve/main/config.json
curl -LO https://huggingface.co/Xenova/bge-large-en-v1.5/resolve/main/tokenizer.json
curl -LO https://huggingface.co/Xenova/bge-large-en-v1.5/resolve/main/tokenizer_config.json

# Download the model (~337MB)
cd onnx
curl -LO https://huggingface.co/Xenova/bge-large-en-v1.5/resolve/main/onnx/model_quantized.onnx
```

### 3. Run the app

```bash
npm start
```

## How it works

- Questions are indexed on startup using semantic embeddings
- Search combines 70% semantic similarity + 30% fuzzy text matching
- Model runs in Electron main process via IPC
