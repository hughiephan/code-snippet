# Reference https://zenn.dev/hpp/articles/d347bcb7ed0fc0
import torch
from transformers import AutoModel, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("cl-tohoku/bert-base-japanese-whole-word-masking")
model = AutoModel.from_pretrained("cl-tohoku/bert-base-japanese-whole-word-masking")
token_embeddings = model.get_input_embeddings().weight.clone()
