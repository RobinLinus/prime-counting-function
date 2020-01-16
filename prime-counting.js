/*

    A fast prime-counting algorithm
    
    It counts the number of primes up to n.
    
*/

const MAX_PRIME = Primes[Primes.length - 1]; // The largest prime in our database
const MAX_N = MAX_PRIME * MAX_PRIME; // Our database enables us to count up to this number

function countPrimes(n) {
    if (n < 2) return 0;
    if (n===2) return 1;
    if (n===3) return 2;
    if( n > MAX_N ) throw Error('N is too big. Give me a larger database of primes!')
    
    let countPrimes = n;  // We assume all numbers are prime and then we subtract the composites
    let index = 0;            
    let p = Primes[0];

    while (p * p <= n) { // We iterate over all primes up to sqrt(n)
        const m = Math.floor(n / p); // FIXME: this integer division could be done faster
        countPrimes -= countAlmostPrimesCached(m, p, index);

        index++;
        p = Primes[index];
    }
    return countPrimes
}





/* 
    
    Counts the number of "p-almost-primes" up to m and caches the result.
    
    A number is "p-almost-prime", if it has no factors smaller than p 
    
*/

const cache2 = {}
function countAlmostPrimesCached(m, p, index) {
    // We know these results without computation:
    if (p === 2) return m; // All numbers are 2-almost-primes
    if (m === 0) return -1; // FIXME: where are these artifacts coming from??
    if (m < p) return 0; // No number has a factor bigger than itself
    if (m === p || m - 1 === p) return 1; // There is only one number with a factor as big as itself (or one less)
    
    if (p * p > m) { // This means, all "p-almost-primes" up to m are actually primes
        // So let's count only the primes
        
        if (m > MAX_PRIME) return countPrimes(m) - index; // m is still too large. Let's recurse
        
        // Yey, we can calculate countPrimes(m) "by hand"!
        let countPrimes_m = index;
        while (Primes[countPrimes_m] <= m) countPrimes_m++;
        return countPrimes_m - index;
    }


    // Otherwise, there's actually work to do. Let's cache it
    const cacheKey = m + '_' + p;
    if (!cache2[cacheKey])
        cache2[cacheKey] = _countAlmostPrimes(m, p);
    return cache2[cacheKey];
}

function _countAlmostPrimes(m, p) {
    let index = 0;
    let q = Primes[0];

    let almostPrimes = m; // Assume all numbers are p-almost-prime and then substract the rest
    while (q < p) { // We iterate over all primes smaller than p
        const m1 = Math.floor(m / q); // FIXME: this integer division could be done faster
        almostPrimes -= countAlmostPrimesCached(m1, q, index);

        index++;
        q = Primes[index];
    }
    almostPrimes = almostPrimes - index;
    return almostPrimes
}








/*
    
    Benchmarks and Tests

*/
function benchmark(n, actualValue) {
    const start = Date.now();
    const counted = countPrimes(10 ** n)
    if (counted !== actualValue) throw Error('miscounted!!!')
    console.log(`Primes up to 10^${n}: ${counted} time=${Date.now()-start}ms`);
}

console.log('Prime Counting Benchmark started...')
// benchmark(2, 25)
// benchmark(3, 168)
// benchmark(4, 1229)
// benchmark(5, 9592)
// benchmark(6, 78498)
// benchmark(7, 664579)
benchmark(8, 5761455)
// benchmark(9, 50847534)
// benchmark(10, 455052511)
// benchmark(11, 4118054813)




/*
  
  Looks like our algorithm is actually a variant of Meissel Lehmer Algorithm...  
  https://en.wikipedia.org/wiki/Meissel%E2%80%93Lehmer_algorithm
  
*/
