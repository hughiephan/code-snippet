# Graph Attention Networks

# Reference
- https://www.freecodecamp.org/news/graph-neural-networks-explained-with-examples/
- https://github.com/PetarV-/GAT

# Content
- Transformer input features into new better features 
- By calculating coefficents all of nodes that are close together

# Illustration

# Code
```python
...
class Net(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = GCNConv(dataset.num_features, 16, cached=True,
                             normalize=True)
        self.conv2 = GCNConv(16, dataset.num_classes, cached=True,
                             normalize=True)
    def forward(self):
        x, edge_index, edge_weight = data.x, data.edge_index, data.edge_attr
        x = F.relu(self.conv1(x, edge_index, edge_weight))
        x = F.dropout(x, training=self.training)
        x = self.conv2(x, edge_index, edge_weight)
        return F.log_softmax(x, dim=1)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model, data = Net().to(device), data.to(device)
optimizer = torch.optim.Adam([
    dict(params=model.conv1.parameters(), weight_decay=5e-4),
    dict(params=model.conv2.parameters(), weight_decay=0)
], lr=0.01)
...
```
