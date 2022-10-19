# Usage Sentence Bert [Japanese]
## Reference
https://qiita.com/sonoisa/items/1df94d0a98cd4f209051
## Dataset
None
## Model
- v1: sonoisa/sentence-bert-base-ja-mean-tokens
- v2: sonoisa/sentence-bert-base-ja-mean-tokens-v2
## Code
```
from transformers import BertJapaneseTokenizer, BertModel
import torch
class SentenceBertJapanese:
    def __init__(self, model_name_or_path, device=None):
        self.tokenizer = BertJapaneseTokenizer.from_pretrained(model_name_or_path)
        self.model = BertModel.from_pretrained(model_name_or_path)
        self.model.eval()
        if device is None:
            device = "cuda" if torch.cuda.is_available() else "cpu"
        self.device = torch.device(device)
        self.model.to(device)
    def _mean_pooling(self, model_output, attention_mask):
        token_embeddings = model_output[0]
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
        return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)
...
TODO
...
```
