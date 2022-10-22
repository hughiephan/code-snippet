# Roberta: Add custom layer on top
## Reference
https://towardsdatascience.com/adding-custom-layers-on-top-of-a-hugging-face-model-f1ccdfc257bd
## Model
cardiffnlp/twitter-roberta-base-emotion
## Dataset
None
## Prerequisites
```
pip install datasets transformers[sentencepiece]
```
## Code
```python
checkpoint = "cardiffnlp/twitter-roberta-base-emotion"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
tokenizer.model_max_len=512
```
