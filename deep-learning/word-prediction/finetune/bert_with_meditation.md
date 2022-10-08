# Reference
https://towardsdatascience.com/masked-language-modelling-with-bert-7d49793e5d2c

# Content
- Don’t need token_type_ids for MLM
- In this example attention_mask is not so important
- input_ids: tokenized representation of our text
- Create a copy of input_ids for labels
- Process the input_ids and labels tensors through our BERT model and calculate the loss between them both
- 512 tokens -> logits (vector) -> function soft max + argmax -> predicted token_id
- Uncased model (doesn't distinguish english and English)
- Dataset: Download meditation dataset from here https://github.com/jamescalam/transformers/blob/main/data/text/meditations/clean.txt

# Masking technique
```python
from transformers import BertTokenizer, BertForMaskedLM
import torch
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForMaskedLM.from_pretrained('bert-base-uncased')
text = ("After Abraham Lincoln won the November 1860 presidential "
        "election on an anti-slavery platform, an initial seven "
        "slave states declared their secession from the country "
        "to form the Confederacy. War broke out in April 1861 "
        "when secessionist forces attacked Fort Sumter in South "
        "Carolina, just over a month after Lincoln's "
        "inauguration.")
inputs = tokenizer(text, return_tensors='pt')
inputs['labels'] = inputs.input_ids.detach().clone() # Make new labels from inputs id
rand = torch.rand(inputs.input_ids.shape)
mask_arr = (rand < 0.15) * (inputs.input_ids != 101) * (inputs.input_ids != 102) # Tensor with true or false for masking, don't replace CLS, or SEP
selection = torch.flatten((mask_arr[0]).nonzero()).tolist() # Return the index of TRUE in mask_arr
inputs.input_ids[0, selection] = 103 # Add Mask token
outputs = model(**inputs)
outputs.loss
```

# Deep Implemenation for fine-tuning
```python
from transformers import BertTokenizer, BertForMaskedLM
from transformers import AdamW
from transformers import TrainingArguments
from transformers import Trainer
from tqdm import tqdm  # progress bar
import torch
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForMaskedLM.from_pretrained('bert-base-uncased')
with open('clean.txt', 'r') as fp:
    text = fp.read().split('\n')
inputs = tokenizer(text, return_tensors='pt', max_length=512, truncation=True, padding='max_length')
inputs['labels'] = inputs.input_ids.detach().clone()
rand = torch.rand(inputs.input_ids.shape)
mask_arr = (rand < 0.15) * (inputs.input_ids != 101) * \
           (inputs.input_ids != 102) * (inputs.input_ids != 0)
selection = []
for i in range(inputs.input_ids.shape[0]):
    selection.append(
        torch.flatten(mask_arr[i].nonzero()).tolist()
    ) # We deal with array now, not just 1 text
for i in range(inputs.input_ids.shape[0]):
    inputs.input_ids[i, selection[i]] = 103
class MeditationsDataset(torch.utils.data.Dataset):
    def __init__(self, encodings):
        self.encodings = encodings
    def __getitem__(self, idx):
        return {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
    def __len__(self):
        return len(self.encodings.input_ids)
dataset = MeditationsDataset(inputs)
loader = torch.utils.data.DataLoader(dataset, batch_size=16, shuffle=True)
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model.to(device)
model.train()
optim = AdamW(model.parameters(), lr=5e-5)
epochs = 2
for epoch in range(epochs):
    loop = tqdm(loader, leave=True)
    for batch in loop:
        optim.zero_grad()
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)
        outputs = model(input_ids, attention_mask=attention_mask,
                        labels=labels)
        loss = outputs.loss
        loss.backward()
        optim.step()
        loop.set_description(f'Epoch {epoch}')
        loop.set_postfix(loss=loss.item())
```
# Fast implmentation for fine-tuning
```python
import torch
from transformers import BertTokenizer, BertForMaskedLM
from transformers import AdamW
from transformers import TrainingArguments
from transformers import Trainer
from tqdm import tqdm  # progress bar
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForMaskedLM.from_pretrained('bert-base-uncased')
with open('dataset.txt', 'r') as fp:
    text = fp.read().split('\n')
inputs = tokenizer(text, return_tensors='pt', max_length=512, truncation=True, padding='max_length')
inputs['labels'] = inputs.input_ids.detach().clone()
rand = torch.rand(inputs.input_ids.shape)
mask_arr = (rand < 0.15) * (inputs.input_ids != 101) * \
           (inputs.input_ids != 102) * (inputs.input_ids != 0)
selection = []
for i in range(inputs.input_ids.shape[0]):
    selection.append(
        torch.flatten(mask_arr[i].nonzero()).tolist()
    ) # We deal with array now, not just 1 text
for i in range(inputs.input_ids.shape[0]):
    inputs.input_ids[i, selection[i]] = 103
class MeditationsDataset(torch.utils.data.Dataset):
    def __init__(self, encodings):
        self.encodings = encodings
    def __getitem__(self, idx):
        return {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
    def __len__(self):
        return len(self.encodings.input_ids)
dataset = MeditationsDataset(inputs)
args = TrainingArguments(
    output_dir='out',
    per_device_train_batch_size=16,
    num_train_epochs=2
)
trainer = Trainer(
    model=model,
    args=args,
    train_dataset=dataset
)
trainer.train()
```
