# Train Sentence Transformer

# Reference
- Article https://towardsdatascience.com/how-to-fine-tune-a-q-a-transfor
- Triplet Dataset: https://huggingface.co/datasets/embedding-data/QQP_triplets

# Prerequisites
```
!pip install sentence-transformers
!pip install datasets
```

# Code
```python
from sentence_transformers import SentenceTransformer, models
word_embedding_model = models.Transformer('distilroberta-base')
pooling_model = models.Pooling(word_embedding_model.get_word_embedding_dimension())
model = SentenceTransformer(modules=[word_embedding_model, pooling_model])
from sentence_transformers import SentenceTransformer
from datasets import load_dataset
from sentence_transformers import InputExample
from sentence_transformers import losses
from torch.utils.data import DataLoader
model_id = "sentence-transformers/all-MiniLM-L6-v2"
model = SentenceTransformer(model_id)
dataset_id = "embedding-data/QQP_triplets"
dataset = load_dataset(dataset_id)
train_examples = []
train_data = dataset['train']['set']
n_examples = dataset['train'].num_rows // 2
for i in range(n_examples):
  example = train_data[i]
  train_examples.append(InputExample(texts=[example['query'], example['pos'][0], example['neg'][0]]))
train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=16)
train_loss = losses.TripletLoss(model=model)
model.fit(train_objectives=[(train_dataloader, train_loss)], epochs=10) 
```
