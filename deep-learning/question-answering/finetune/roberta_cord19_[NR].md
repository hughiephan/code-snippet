# Question Answering: Finetune of Roberta with Covid dataset
## Reference: 
- https://github.com/alexaapo/SBERT-for-Question-Answering-on-COVID-19-Dataset
## Model
- SentenceTransformer('nli-roberta-base')
## Prerequisites
```
!pip install -U sentence-transformers
!pip install spicy
```
## Code
```python
import pandas as pd
import numpy as np
import pickle
import glob
import json
import nltk
import os
import sentence_transformers
import scipy.spatial
import copy
import torch
import time
from sentence_transformers import SentenceTransformer,util
from pandas.io.json import json_normalize  
from nltk.tokenize import sent_tokenize
nltk.download('punkt')
!wget https://ai2-semanticscholar-cord-19.s3-us-west-2.amazonaws.com/historical_releases/cord-19_2020-03-13.tar.gz
!wget https://ai2-semanticscholar-cord-19.s3-us-west-2.amazonaws.com/historical_releases/cord-19_2020-03-20.tar.gz
!wget https://ai2-semanticscholar-cord-19.s3-us-west-2.amazonaws.com/historical_releases/cord-19_2020-05-28.tar.gz
!tar -xf cord-19_2020-03-13.tar.gz
!tar -xf cord-19_2020-03-20.tar.gz
%cd /content/2020-03-13
%cd /content/2020-03-20
!tar -xf comm_use_subset.tar.gz
data = []
files = glob.glob('comm_use_subset/*', recursive=True)
for single_file in files:
  with open(single_file, 'r') as f:
    d = json.load(f) 
    df = pd.json_normalize(d)
    title = df['metadata.title'].item()
    if df['abstract'].item() == []:
      abstract = df['abstract'].item()
    else:
      abstract_data = pd.json_normalize(data = d, record_path ='abstract') 
      if (abstract_data['text'].shape[0] > 1):
        abstract = abstract_data['text'].str.cat(sep='. ')
      else:
        abstract = abstract_data['text'].item()
    text_data = pd.json_normalize(data = d, record_path ='body_text') 
    if (text_data['text'].shape[0] > 1):
      body_text = text_data['text'].str.cat(sep='. ')
    else:
      body_text = text_data['text'].item()
    data.append([title,abstract,body_list])
cwd = os.getcwd()
with open('listfile.data', 'wb') as filehandle:
    pickle.dump(data, filehandle)
with open('listfile.data', 'rb') as filehandle:
    articles = pickle.load(filehandle)
for article in range(len(articles)):
  articles[article][0] = sent_tokenize(articles[article][0])
  if articles[article][1] != []:
    articles[article][1] = sent_tokenize(articles[article][1])
  articles[article][2] = sent_tokenize(articles[article][2])
model_ = SentenceTransformer('nli-roberta-base')
mini_articles = articles[:9000]
embeddings = copy.deepcopy(mini_articles)
device = torch.device('cuda:0' if torch.cuda.is_available()
                      else 'cpu')
model_.to(device)
origin_list_of_articles = []
list_of_articles = []
for article in embeddings:
  article_list = []
  if article[1] != []:
    for abs_text in article[1]:
      article_list.append(abs_text)
  for body_text in article[2]:
    article_list.append(body_text)
  origin_list_of_articles.append(article_list)
  list_of_articles.append(model_.encode(article_list,convert_to_tensor=True))
queries = ['What are the coronoviruses?', 
           'What was discovered in Wuhuan in December 2019?', 
           'What is Coronovirus Disease 2019?', 
           'What is COVID-19?', 'What is caused by SARS-COV2?', 
           'How is COVID-19 spread?', 
           'Where was COVID-19 discovered?', 
           'How does coronavirus spread?',
           "Can the use of masks prevent SARS?",
           "What is the Persistence of virus on surfaces of different materials (e.g. copper, stainless steel, plastic)?",
           "What ages have higher mortality rate in covid-19?",
           "What are the protective measures of covid-19?"]
query_embeddings = model_.encode(queries, convert_to_tensor=True)
for query, query_embedding in zip(queries, query_embeddings):
  body_text_distances = []
  for idx_of_article,article in enumerate(list_of_articles):
    cos_scores = sentence_transformers.util.semantic_search(query_embedding, article, top_k=5)
    for elem in cos_scores[0]:
      body_text_distances.append((idx_of_article,elem['corpus_id'],elem['score']))
  results = sorted(body_text_distances, key=lambda x: x[2], reverse=True)
  print("\n=========================================================\n")
  print("Query:", query)
  print("\nThe most similar sentences in corpus:\n")
  print("1. ",origin_list_of_articles[results[0][0]][results[0][1]], "(Score: %.4f)" % (results[0][2]))  
  print("From title: ", mini_articles[results[0][0]][0])
  print('\n')
  print("2. ",origin_list_of_articles[results[1][0]][results[1][1]], "(Score: %.4f)" % (results[1][2]))  
  print("From title: ", mini_articles[results[1][0]][0])
  print('\n')
  print("3. ",origin_list_of_articles[results[2][0]][results[2][1]], "(Score: %.4f)" % (results[2][2]))  
  print("From title: ", mini_articles[results[2][0]][0])
  print('\n')
  print("4. ",origin_list_of_articles[results[3][0]][results[3][1]], "(Score: %.4f)" % (results[3][2]))  
  print("From title: ", mini_articles[results[3][0]][0])
```
