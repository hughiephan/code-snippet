https://mml-book.github.io/book/mml-book.pdf

Likelihood function is often expressed as $\mathcal{L}_{n}(\theta)$

Here are some likelihood functions: Bernoulli, Binomial, Gaussian, Multinomial

Gaussian Likelihood Function:

$$\mathcal{L}(\boldsymbol{\theta}) =-\sum_{n=1}^N \log p\left(y_n \mid \boldsymbol{x}_n, \boldsymbol{\theta}\right)$$





------

$\hat{\theta}=\underset{\theta \in \Theta}{\arg \max } \mathcal{L}_{n}(\theta ; \mathbf{y})$

Maximum likelihood estimate $\mathcal{L}_{n}$  

A parameter space $\Theta$

---------------
We often work with this form $\ell(\theta ; \mathbf{y})=\ln \mathcal{L}_{n}(\theta ; \mathbf{y}) .$

--------------
In Bayesian inference, likelihood is $p(x | \theta)$ 

