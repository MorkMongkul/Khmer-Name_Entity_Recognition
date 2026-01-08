from khmercut import tokenize
import re

def segment_khmer_text(text: str) -> str:
    """
    Automatically segment Khmer text into words.
    If text is already segmented (has spaces), return as is.
    Otherwise, use khmercut to segment it.
    """
    text = text.strip()
    
    # Check if text already has spaces (pre-tokenized)
    if ' ' in text:
        # Text appears to be already segmented
        return text
    
    # Text is not segmented, use khmercut
    try:
        tokens = tokenize(text)
        return ' '.join(tokens)
    except Exception as e:
        # Fallback: return original text
        print(f"Word segmentation error: {e}")
        return text

def preprocess_text(text: str) -> str:
    """
    Preprocess text for NER prediction.
    - Segment Khmer text if needed
    - Clean up extra spaces
    """
    # Segment text
    segmented = segment_khmer_text(text)
    
    # Clean up extra spaces
    segmented = re.sub(r'\s+', ' ', segmented).strip()
    
    return segmented