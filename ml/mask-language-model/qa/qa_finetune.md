# Finetune QA

# Reference
https://towardsdatascience.com/how-to-fine-tune-a-q-a-transformer-86f91ec92997

# Code
```python
import os
import requests
import json
from transformers import DistilBertTokenizerFast
if not os.path.exists('squad'):
    os.mkdir('squad')
url = 'https://rajpurkar.github.io/SQuAD-explorer/dataset/'
res = requests.get(f'{url}train-v2.0.json')
for file in ['train-v2.0.json', 'dev-v2.0.json']:
    res = requests.get(f'{url}{file}')
    with open(f'../data/benchmarks/squad/{file}', 'wb') as f:
        for chunk in res.iter_content(chunk_size=4):
            f.write(chunk)
def read_squad(path):
    with open(path, 'rb') as f:
        squad_dict = json.load(f)
    contexts = []
    questions = []
    answers = []
    for group in squad_dict['data']:
        for passage in group['paragraphs']:
            context = passage['context']
            for qa in passage['qas']:
                question = qa['question']
                if 'plausible_answers' in qa.keys():
                    access = 'plausible_answers'
                else:
                    access = 'answers'
                for answer in qa[access]:
                    contexts.append(context)
                    questions.append(question)
                    answers.append(answer)
    return contexts, questions, answers
train_contexts, train_questions, train_answers = read_squad('squad/train-v2.0.json')
val_contexts, val_questions, val_answers = read_squad('squad/dev-v2.0.json')
def add_end_idx(answers, contexts):
    for answer, context in zip(answers, contexts):
        gold_text = answer['text']
        start_idx = answer['answer_start']
        end_idx = start_idx + len(gold_text)
        if context[start_idx:end_idx] == gold_text:
            answer['answer_end'] = end_idx
        else:
            for n in [1, 2]:
                if context[start_idx-n:end_idx-n] == gold_text:
                    answer['answer_start'] = start_idx - n
                    answer['answer_end'] = end_idx - n
add_end_idx(train_answers, train_contexts)
add_end_idx(val_answers, val_contexts)

```
