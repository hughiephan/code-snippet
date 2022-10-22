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
    #Extract outputs from the body
    outputs = self.model(input_ids=input_ids, attention_mask=attention_mask)

    #Add custom layers
    sequence_output = self.dropout(outputs[0]) #outputs[0]=last hidden state

    logits = self.classifier(sequence_output[:,0,:].view(-1,768)) # calculate losses
    
    loss = None
    if labels is not None:
      loss_fct = nn.CrossEntropyLoss()
      loss = loss_fct(logits.view(-1, self.num_labels), labels.view(-1))
    
    return TokenClassifierOutput(loss=loss, logits=logits, hidden_states=outputs.hidden_states,attentions=outputs.attentions)
```
