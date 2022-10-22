# Roberta: Add custom layer on top
## Reference
- Article: https://towardsdatascience.com/adding-custom-layers-on-top-of-a-hugging-face-model-f1ccdfc257bd
- Source: https://jovian.ai/rajbsangani/emotion-tuned-sarcasm/v/1
## Model
cardiffnlp/twitter-roberta-base-emotion
## Dataset
https://www.kaggle.com/datasets/rmisra/news-headlines-dataset-for-sarcasm-detection
## Prerequisites
```
pip install datasets transformers[sentencepiece]
```
## Code
```python
import torch
import torch.nn as nn
import pandas as pd
from datasets import load_dataset,Dataset,DatasetDict
from transformers import DataCollatorWithPadding,AutoModelForSequenceClassification, Trainer, TrainingArguments,AutoTokenizer,AutoModel,AutoConfig
from transformers.modeling_outputs import TokenClassifierOutput
from torch.utils.data import DataLoader
from transformers import AdamW,get_scheduler
from datasets import load_metric
from tqdm.auto import tqdm
data=load_dataset("json",data_files="news-headlines-dataset-for-sarcasm-detection.zip")
data=data.rename_column("is_sarcastic","label")
data=data.remove_columns(['article_link'])
data.set_format('pandas')
data=data['train'][:]
data.drop_duplicates(subset=['headline'],inplace=True)
data=data.reset_index()[['headline','label']]
data=Dataset.from_pandas(data)
train_testvalid = data.train_test_split(test_size=0.2,seed=15)
test_valid = train_testvalid['test'].train_test_split(test_size=0.5,seed=15)
data = DatasetDict({
    'train': train_testvalid['train'],
    'test': test_valid['test'],
    'valid': test_valid['train']})
checkpoint = "cardiffnlp/twitter-roberta-base-emotion"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
tokenizer.model_max_len=512
def tokenize(batch):
  return tokenizer(batch["headline"], truncation=True,max_length=512)
tokenized_dataset = data.map(tokenize, batched=True)
tokenized_dataset.set_format("torch",columns=["input_ids", "attention_mask", "label"])
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)
class CustomModel(nn.Module):
  def __init__(self,checkpoint,num_labels): 
    super(CustomModel,self).__init__() 
    self.num_labels = num_labels 
    self.model = model = AutoModel.from_pretrained(checkpoint,config=AutoConfig.from_pretrained(checkpoint, output_attentions=True,output_hidden_states=True))
    self.dropout = nn.Dropout(0.1) 
    self.classifier = nn.Linear(768,num_labels) # load and initialize weights
  def forward(self, input_ids=None, attention_mask=None,labels=None):
    outputs = self.model(input_ids=input_ids, attention_mask=attention_mask)
    sequence_output = self.dropout(outputs[0]) #outputs[0]=last hidden state
    logits = self.classifier(sequence_output[:,0,:].view(-1,768)) # calculate losses
    loss = None
    if labels is not None:
      loss_fct = nn.CrossEntropyLoss()
      loss = loss_fct(logits.view(-1, self.num_labels), labels.view(-1))
    return TokenClassifierOutput(loss=loss, logits=logits, hidden_states=outputs.hidden_states,attentions=outputs.attentions)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model=CustomModel(checkpoint=checkpoint,num_labels=2).to(device)
train_dataloader = DataLoader(
    tokenized_dataset["train"], shuffle=True, batch_size=32, collate_fn=data_collator
)
eval_dataloader = DataLoader(
    tokenized_dataset["valid"], batch_size=32, collate_fn=data_collator
)
optimizer = AdamW(model.parameters(), lr=5e-5)
num_epochs = 3
num_training_steps = num_epochs * len(train_dataloader)
lr_scheduler = get_scheduler(
    "linear",
    optimizer=optimizer,
    num_warmup_steps=0,
    num_training_steps=num_training_steps,
)
metric = load_metric("f1")
progress_bar_train = tqdm(range(num_training_steps))
progress_bar_eval = tqdm(range(num_epochs * len(eval_dataloader)))
for epoch in range(num_epochs):
  model.train()
  for batch in train_dataloader:
      batch = {k: v.to(device) for k, v in batch.items()}
      outputs = model(**batch)
      loss = outputs.loss
      loss.backward()
      optimizer.step()
      lr_scheduler.step()
      optimizer.zero_grad()
      progress_bar_train.update(1)
  model.eval()
  for batch in eval_dataloader:
    batch = {k: v.to(device) for k, v in batch.items()}
    with torch.no_grad():
        outputs = model(**batch)
    logits = outputs.logits
    predictions = torch.argmax(logits, dim=-1)
    metric.add_batch(predictions=predictions, references=batch["labels"])
    progress_bar_eval.update(1)
  print(metric.compute())
```
Test
```
model.eval()
test_dataloader = DataLoader(
    tokenized_dataset["test"], batch_size=32, collate_fn=data_collator
)
for batch in test_dataloader:
    batch = {k: v.to(device) for k, v in batch.items()}
    with torch.no_grad():
        outputs = model(**batch)
    logits = outputs.logits
    predictions = torch.argmax(logits, dim=-1)
    metric.add_batch(predictions=predictions, references=batch["labels"])
metric.compute()
```
