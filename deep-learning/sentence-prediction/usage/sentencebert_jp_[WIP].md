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
import scipy.spatial
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
    @torch.no_grad()
    def encode(self, sentences, batch_size=8):
        all_embeddings = []
        iterator = range(0, len(sentences), batch_size)
        for batch_idx in iterator:
            batch = sentences[batch_idx:batch_idx + batch_size]
            encoded_input = self.tokenizer.batch_encode_plus(batch, padding="longest", 
                                           truncation=True, return_tensors="pt").to(self.device)
            model_output = self.model(**encoded_input)
            sentence_embeddings = self._mean_pooling(model_output, encoded_input["attention_mask"]).to('cpu')
            all_embeddings.extend(sentence_embeddings)
        return torch.stack(all_embeddings)
sentences = ["お辞儀をしている男性会社員", "笑い袋", "テクニカルエバンジェリスト（女性）", "戦うAI", "笑う男性（5段階）", 
sentence_vectors = model.encode(sentences)
queries = ['暴走したAI', '暴走した人工知能', 'いらすとやさんに感謝', 'つづく']
query_embeddings = model.encode(queries).numpy()
closest_n = 5
for query, query_embedding in zip(queries, query_embeddings):
    distances = scipy.spatial.distance.cdist([query_embedding], sentence_vectors, metric="cosine")[0]
    results = zip(range(len(distances)), distances)
    results = sorted(results, key=lambda x: x[1])
    print("\n\n======================\n\n")
    print("Query:", query)
    print("\nTop 5 most similar sentences in corpus:")
    for idx, distance in results[0:closest_n]:
        print(sentences[idx].strip(), "(Score: %.4f)" % (distance / 2))
```
Output
```
======================
Query: 暴走したAI

Top 5 most similar sentences in corpus:
戦うAI (Score: 0.1521)
心を持ったAI (Score: 0.1666)
武器を持つAI (Score: 0.1994)
人工知能・AI (Score: 0.2130)
画像認識をするAI (Score: 0.2306)
```
