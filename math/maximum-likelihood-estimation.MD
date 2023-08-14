https://mml-book.github.io/book/mml-book.pdf

Some likelihood functions
Bernoulli, Binomial, Gaussian, Multinomial

Likelihood function $\mathcal{L}_{n}(\theta)$

------

$\hat{\theta}=\underset{\theta \in \Theta}{\arg \max } \mathcal{L}_{n}(\theta ; \mathbf{y})$

Maximum likelihood estimate $\mathcal{L}_{n}$  

A parameter space $\Theta$

---------------
We often work with this form $\ell(\theta ; \mathbf{y})=\ln \mathcal{L}_{n}(\theta ; \mathbf{y}) .$


$\mathcal{L}(\boldsymbol{\theta}) & =-\sum_{n=1}^N \log p\left(y_n \mid \boldsymbol{x}_n, \boldsymbol{\theta}\right)=-\sum_{n=1}^N \log \mathcal{N}\left(y_n \mid \boldsymbol{x}_n^{\top} \boldsymbol{\theta}, \sigma^2\right) \\ & =-\sum_{n=1}^N \log \frac{1}{\sqrt{2 \pi \sigma^2}} \exp \left(-\frac{\left(y_n-\boldsymbol{x}_n^{\top} \boldsymbol{\theta}\right)^2}{2 \sigma^2}\right) \\ & =-\sum_{n=1}^N \log \exp \left(-\frac{\left(y_n-\boldsymbol{x}_n^{\top} \boldsymbol{\theta}\right)^2}{2 \sigma^2}\right)-\sum_{n=1}^N \log \frac{1}{\sqrt{2 \pi \sigma^2}} \\ & =\frac{1}{2 \sigma^2} \sum_{n=1}^N\left(y_n-\boldsymbol{x}_n^{\top} \boldsymbol{\theta}\right)^2-\sum_{n=1}^N \log \frac{1}{\sqrt{2 \pi \sigma^2}}$
