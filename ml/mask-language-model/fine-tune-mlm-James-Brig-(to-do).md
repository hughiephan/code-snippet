# Reference
https://towardsdatascience.com/masked-language-modelling-with-bert-7d49793e5d2c

# Content
- Don’t need token_type_ids for MLM
- In this example attention_mask is not so important
- input_ids: tokenized representation of our text
- Create a copy of input_ids for labels
- Process the input_ids and labels tensors through our BERT model and calculate the loss between them both
- 512 tokens -> logits (vector) -> function soft max + argmax -> predicted token_id

# Code
```
from transformers import BertTokenizer, BertForMaskedLM
import torch
.... TODO ....
```
