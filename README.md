# Prime Counting Function
A fast algorithm to count the number of primes up to N. Implemented in JavaScript.

[Please find the demo here](https://robinlinus.github.io/prime-counting-function/index.html)


## Comparison 
The [C++ Primesieve](https://github.com/kimwalisch/primesieve) implementation claims *"It counts the primes below 10^10 in just **0.4 seconds** on an Intel Core i7-6700 CPU (4 x 3.4 GHz)."*
In comparison, our single-threaded, unoptimized JavaScript implementation counts the primes below 10^10 in **0.5 seconds** on an Intel Core i7 (4 x 2.9 GHz). 

A C / C++ / Rust / implementation with fast integer division probably beats the "Priemsieve" implementation. Additionally, our algorithm is highly parallelizable. Probably, even simple multi-threading leads to further significant performance improvements.


You can run the benchmarks on your machine. Open the console. For example, the commands 
```
benchmark(8, 5761455)
benchmark(9, 50847534)
benchmark(10, 455052511)
```
count the primes up to 10^**8**, 10^**9**, 10^**10** and assert correctness.
