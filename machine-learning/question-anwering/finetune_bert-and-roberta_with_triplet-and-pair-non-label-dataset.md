# Train Sentence Transformer

# Reference
- Article https://towardsdatascience.com/how-to-fine-tune-a-q-a-transfor
- Triplet non-label Dataset: https://huggingface.co/datasets/embedding-data/QQP_triplets
- Pair non-label Dataset: https://huggingface.co/datasets/embedding-data/sentence-compression
# Prerequisites
```
!pip install sentence-transformers
!pip install datasets
```

# Code (Triplet)
```python
from sentence_transformers import SentenceTransformer, models
from sentence_transformers import SentenceTransformer, InputExample, losses
from datasets import load_dataset
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
num_epochs = 10
warmup_steps = int(len(train_dataloader) * num_epochs * 0.1)
model.fit(train_objectives=[(train_dataloader, train_loss)],
          epochs=num_epochs,
          warmup_steps=warmup_steps)
```

Or use custom model like this
```python
...
word_embedding_model = models.Transformer('distilroberta-base')
pooling_model = models.Pooling(word_embedding_model.get_word_embedding_dimension())
model = SentenceTransformer(modules=[word_embedding_model, pooling_model])
...
```

# Code (Pair)
```python
modelB = SentenceTransformer('embedding-data/distilroberta-base-sentence-transformer')
dataset_id = "embedding-data/sentence-compression"
datasetB = load_dataset(dataset_id)
train_examplesB = []
train_dataB = dataset['train']['set']
n_examples = dataset['train'].num_rows
for i in range(n_examples):
  example = train_dataB[i]
  train_examplesB.append(InputExample(texts=[example[0], example[1]]))
train_dataloaderB = DataLoader(train_examplesB, shuffle=True, batch_size=64)
train_lossB = losses.MultipleNegativesRankingLoss(model=modelB)
num_epochsB = 10
warmup_stepsB = int(len(train_dataloaderB) * num_epochsB * 0.1)
modelB.fit(train_objectives=[(train_dataloaderB, train_lossB)],
          epochs=num_epochsB,
          warmup_steps=warmup_stepsB)
```
