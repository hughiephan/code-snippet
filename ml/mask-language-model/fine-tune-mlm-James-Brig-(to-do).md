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

# Code 
## Base
```
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
## Fine-tune with pytorch
```

```
