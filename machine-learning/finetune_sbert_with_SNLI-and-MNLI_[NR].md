# Finetune sentence transformer

# Reference
- https://www.pinecone.io/learn/fine-tune-sentence-transformers-mnr/

# Content
- Entailment: Premise (Anchor) -> Hypothesis
- Neutral: Premises, Hypothesis can be true, but doesn't mean related
- Contradiction: Premise and Hypothesis contradict each other.
- Multiple Negatives Ranking doesn't use label
- Positive = 0
- Produce similar embeddings between pairs, and maintain different embeddings for non-pairs

# Code
```python
import datasets
from transformers import BertTokenizer
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
```
