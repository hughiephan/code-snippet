# Finetune question answering nlirobert with Covid dataset

# Reference
- https://github.com/alexaapo/SBERT-for-Question-Answering-on-COVID-19-Dataset

# Prerequisites
```
!pip install -U sentence-transformers
```

# Code
```python
import pandas as pd
import numpy as np
import pickle
import glob
import json  
from pandas.io.json import json_normalize  
from nltk.tokenize import sent_tokenize
import nltk
!pip install spicy
import scipy.spatial
nltk.download('punkt')
# !wget https://ai2-semanticscholar-cord-19.s3-us-west-2.amazonaws.com/historical_releases/cord-19_2020-03-13.tar.gz
# !wget https://ai2-semanticscholar-cord-19.s3-us-west-2.amazonaws.com/historical_releases/cord-19_2020-03-20.tar.gz
# !wget https://ai2-semanticscholar-cord-19.s3-us-west-2.amazonaws.com/historical_releases/cord-19_2020-05-28.tar.gz
# !tar -xf cord-19_2020-03-13.tar.gz
# !tar -xf cord-19_2020-03-20.tar.gz
# %cd /content/2020-03-13
# %cd /content/2020-03-20
# !tar -xf comm_use_subset.tar.gz
# data = []
# files = glob.glob('comm_use_subset/*', recursive=True)
# for single_file in files:
#   with open(single_file, 'r') as f:
#     d = json.load(f) 
#     df = pd.json_normalize(d)
#     title = df['metadata.title'].item()
#     if df['abstract'].item() == []:
#       abstract = df['abstract'].item()
#     else:
#       abstract_data = pd.json_normalize(data = d, record_path ='abstract') 
#       if (abstract_data['text'].shape[0] > 1):
#         abstract = abstract_data['text'].str.cat(sep='. ')
#       else:
#         abstract = abstract_data['text'].item()
#     text_data = pd.json_normalize(data = d, record_path ='body_text') 
#     if (text_data['text'].shape[0] > 1):
#       body_text = text_data['text'].str.cat(sep='. ')
#     else:
#       body_text = text_data['text'].item()
#     data.append([title,abstract,body_list])
# import os
# cwd = os.getcwd()
# print(cwd)
# with open('listfile.data', 'wb') as filehandle:
#     pickle.dump(data, filehandle)
with open('listfile.data', 'rb') as filehandle:
    articles = pickle.load(filehandle)
for article in range(len(articles)):
  articles[article][0] = sent_tokenize(articles[article][0])
  if articles[article][1] != []:
    articles[article][1] = sent_tokenize(articles[article][1])
  articles[article][2] = sent_tokenize(articles[article][2])
