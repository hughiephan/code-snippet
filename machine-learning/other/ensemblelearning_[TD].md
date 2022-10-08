# Reference
https://towardsdatascience.com/ensembling-huggingfacetransformer-models-f21c260dbb09

# Content
- Next sentence prediction

# Code
Core
```
class BertEnsembleForNextSentencePrediction(BertPreTrainedModel):
  def __init__(self, config, *args, **kwargs):
    super().__init__(config)
    self.n_models = kwargs["n_models"]  # Number of models, in this case it's 2 ("bert 1" and "bert 2")
    self.bert_model_1 = BertModel(config)
    self.bert_model_2 = BertModel(config)
    TODO
    ...
```

```
todo
```
