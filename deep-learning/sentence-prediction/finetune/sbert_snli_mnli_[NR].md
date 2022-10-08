# Sentence Prediction: Finetune Sentence Transformer with SNLI and MNLI datasets

# Description
- Reference: https://www.pinecone.io/learn/fine-tune-sentence-transformers-mnr/
- Model
  - bert-base-uncased
  - Multiple Negatives Ranking Loss

# Deep Implementation for fine-tuning
```python
import datasets
import torch
from tqdm.auto import tqdm
from transformers import BertTokenizer, BertModel
from transformers.optimization import get_linear_schedule_with_warmup
snli = datasets.load_dataset('snli', split='train')
mnli = datasets.load_dataset('glue', 'mnli', split='train')
snli = snli.cast(mnli.features) # Get similar features
dataset = datasets.concatenate_datasets([snli, mnli])
del snli, mnli
dataset = dataset.filter(
    lambda x: True if x['label'] == 0 else False
) # Get only anchor-positive pairs
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
dataset = dataset.map(
    lambda x: tokenizer(
            x['premise'], max_length=128, padding='max_length',
            truncation=True
        ), batched=True
)
dataset = dataset.rename_column('input_ids', 'anchor_ids')
dataset = dataset.rename_column('attention_mask', 'anchor_mask')
dataset = dataset.map(
    lambda x: tokenizer(
            x['hypothesis'], max_length=128, padding='max_length',
            truncation=True
    ), batched=True
)
dataset = dataset.rename_column('input_ids', 'positive_ids')
dataset = dataset.rename_column('attention_mask', 'positive_mask')
dataset = dataset.remove_columns(['premise', 'hypothesis', 'label', 'token_type_ids'])
dataset.set_format(type='torch', output_all_columns=True)
batch_size = 32
loader = torch.utils.data.DataLoader(dataset, batch_size=batch_size)
model = BertModel.from_pretrained('bert-base-uncased')
def mean_pool(token_embeds, attention_mask):
    in_mask = attention_mask.unsqueeze(-1).expand(
        token_embeds.size()
    ).float()
    pool = torch.sum(token_embeds * in_mask, 1) / torch.clamp(
        in_mask.sum(1), min=1e-9
    )
    return pool
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model.to(device)
cos_sim = torch.nn.CosineSimilarity()
loss_func = torch.nn.CrossEntropyLoss()
scale = 20.0
cos_sim.to(device)
loss_func.to(device)
optim = torch.optim.Adam(model.parameters(), lr=2e-5)
total_steps = int(len(anchors) / batch_size)
warmup_steps = int(0.1 * total_steps)
scheduler = get_linear_schedule_with_warmup(
    optim, num_warmup_steps=warmup_steps,
    num_training_steps=total_steps-warmup_steps
)
for epoch in range(epochs):
    model.train() 
    loop = tqdm(loader, leave=True)
    for batch in loop:
        optim.zero_grad()
        anchor_ids = batch['anchor']['input_ids'].to(device)
        anchor_mask = batch['anchor']['attention_mask'].to(device)
        pos_ids = batch['positive']['input_ids'].to(device)
        pos_mask = batch['positive']['attention_mask'].to(device)
        a = model(
            anchor_ids, attention_mask=anchor_mask
        )[0]  # all token embeddings
        p = model(
            pos_ids, attention_mask=pos_mask
        )[0] # all token embeddings
        a = mean_pool(a, anchor_mask)
        p = mean_pool(p, pos_mask)
        scores = torch.stack([
            cos_sim(
                a_i.reshape(1, a_i.shape[0]), p
            ) for a_i in a])
        labels = torch.tensor(range(len(scores)), dtype=torch.long, device=scores.device)
        loss = loss_func(scores*scale, labels)
        loss.backward()
        optim.step()
        scheduler.step()
        loop.set_description(f'Epoch {epoch}')
        loop.set_postfix(loss=loss.item())
```
# Fast Implementation for fine-tuning
```python
import datasets
from sentence_transformers import InputExample, models, SentenceTransformer, losses
from sentence_transformers import datasets # Might conflict with default datasets library
from tqdm.auto import tqdm
snli = datasets.load_dataset('snli', split='train')
mnli = datasets.load_dataset('glue', 'mnli', split='train')
snli = snli.cast(mnli.features)
dataset = datasets.concatenate_datasets([snli, mnli])
del snli, mnli
dataset = dataset.filter(
    lambda x: True if x['label'] == 0 else False
)
train_samples = []
for row in tqdm(nli):
    train_samples.append(InputExample(
        texts=[row['premise'], row['hypothesis']]
    ))
batch_size = 32
loader = datasets.NoDuplicatesDataLoader(
    train_samples, batch_size=batch_size)
bert = models.Transformer('bert-base-uncased')
pooler = models.Pooling(
    bert.get_word_embedding_dimension(),
    pooling_mode_mean_tokens=True
)
model = SentenceTransformer(modules=[bert, pooler])
loss = losses.MultipleNegativesRankingLoss(model)
epochs = 1
warmup_steps = int(len(loader) * epochs * 0.1)
model.fit(
    train_objectives=[(loader, loss)],
    epochs=epochs,
    warmup_steps=warmup_steps,
    output_path='./sbert_test_mnr2',
    show_progress_bar=False
)
```
