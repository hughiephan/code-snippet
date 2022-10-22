# Create and visualize Bert embeddings [Japanese]
## Reference 
https://zenn.dev/hpp/articles/d347bcb7ed0fc0
## Model
cl-tohoku/bert-base-japanese-whole-word-masking
## Dataset
None
## Content
- Use tSNE to transform Bert embeddings into 2 dimension
- Then we visualize the 2D emebedding
## Code
```python
import torch
import holoviews as hv
from holoviews import opts
from transformers import AutoModel, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("cl-tohoku/bert-base-japanese-whole-word-masking")
model = AutoModel.from_pretrained("cl-tohoku/bert-base-japanese-whole-word-masking")
token_embeddings = model.get_input_embeddings().weight.clone()
vocab = tokenizer.get_vocab()
vectors = {}
for idx in vocab.values():
    vectors[idx] = token_embeddings[idx].detach().numpy().copy()
from sklearn.manifold import TSNE
tsne = TSNE(n_components=2, random_state=0)
reduced_vectors = tsne.fit_transform(list(vectors.values())[:3000])
points = hv.Points(reduced_vectors)
labels = hv.Labels({('x', 'y'): reduced_vectors, 'text': [token for token, _ in zip(vocab, reduced_vectors)]}, ['x', 'y'], 'text')
(points * labels).opts(
    opts.Labels(xoffset=0.05, yoffset=0.05, size=14, padding=0.2, width=1500, height=1000),
    opts.Points(color='black', marker='x', size=3),
)
```
