# Reference
https://qiita.com/MMsk0914/items/b1fbc1601aae1d534287

# Content
- Made by Tohoku cl-tohoku/bert-base-japanese-whole-word-masking 

# Code 
```
# Prerequisites
!pip install -q transformers==4.9.0
!pip install -q fugashi
!pip install -q ipadic

# Setup
import torch
import transformers
from transformers import BertJapaneseTokenizer, BertForMaskedLM
bert_tokenizer = BertJapaneseTokenizer.from_pretrained('cl-tohoku/bert-base-japanese-whole-word-masking')
lm_bert = BertForMaskedLM.from_pretrained('cl-tohoku/bert-base-japanese-whole-word-masking')
text = '彼は * として働いている。'  # 彼は[MASK]として働いている。
tokenized_text = bert_tokenizer(text)
masked_idx = 2
tokenized_text[masked_idx] = '[MASK]' # Index of the word we want to predict
indexed_tokens = bert_tokenizer.convert_tokens_to_ids(tokenized_text)
tokens_tensor = torch.tensor([indexed_tokens])
lm_bert.eval()
outputs = lm_bert(tokens_tensor)
pred = outputs[0][0, masked_idx]
def predict_mlm(model, input, masked_idx):
    with torch.no_grad():
        outputs = model(input)
        # 予測結果の上位5件を抽出
        predictions = outputs[0][0, masked_idx].topk(5) 
    for i, idx in enumerate(predictions.indices):
        index = idx.item()
        token = bert_tokenizer.convert_ids_to_tokens([index])[0]
        print(f'順位:{i + 1}\n単語:{token}')  
predict_mlm(lm_bert, tokens_tensor, masked_idx)
```

