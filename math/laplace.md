# Laplace

# References
https://faculty.atu.edu/mfinan/4243/Laplace.pdf

# Content
Find the Laplace transform, if it exists, of each of $f(t)=e^{a t}$

Using the definition of Laplace transform we see that

$$
\mathcal{L}\left[e^{a t}\right]=\int_0^{\infty} e^{-(s-a) t} d t=\lim _{T \rightarrow \infty} \int_0^T e^{-(s-a) t} d t
$$

But

$$
\int_0^T e^{-(s-a) t} d t =
$$

$$
\int_0^T e^{-(s-a) t} d t=\left\{\begin{array}{cl}
T & \text { if } s=a \\
\frac{1-e^{-(s-a) T}}{s-a} & \text { if } s \neq a
\end{array}\right.
$$

For the improper integral to converge we need $s>a$. In this case,

$$
\mathcal{L}\left[e^{a t}\right]=F(s)=\frac{1}{s-a}, \quad s>a
$$
