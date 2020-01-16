# Prime Counting Function
A fast algorithm to count the number of primes up to N. Implemented in JavaScript.

[Please find the demo here](https://robinlinus.github.io/prime-counting-function/index.html)


## Comparison 
The [C++ Primesieve](https://github.com/kimwalisch/primesieve) implementation claims *"It counts the primes below 10^10 in just **0.4 seconds** on an Intel Core i7-6700 CPU (4 x 3.4 GHz)."*
In comparison, our single-threaded, unoptimized JavaScript implementation counts the primes below 10^10 in **0.5 seconds** on an Intel Core i7 (4 x 2.9 GHz).


In the code there are benchmarks you can run on your machine. For example, the command
```
benchmark(10, 455052511)
```
counts the primes up to 10^10 and asserts correctness.
