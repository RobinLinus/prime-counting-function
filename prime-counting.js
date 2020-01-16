/*

    A fast prime-counting algorithm
    
    It counts the number of primes up to n.
    
*/

const MAX_PRIME = Primes[Primes.length - 1];


function countPrimes(n) {
    if (n < 2) return 0;
    if (n===2) return 1;
    if (n===3) return 2;
    
    let i = 0;
    let p = Primes[0];

    let countPrimes = n;

    while (p * p <= n) {
        const m = Math.floor(n / p); // FIXME: we're doing integer division here. Could be done faster
        countPrimes -= countAlmostPrimesCached(m, p, i);

        i++;
        p = Primes[i];
    }
    return countPrimes
}



const cache2 = {}

/* a number is "p almost prime", if it has no factors smaller than p */

function countAlmostPrimesCached(m, p, i) {
    // Here are all results we already know upfront:
    if (p === 2) return m;
    if (m === 0) return -1;
    if (m < p) return 0;
    if (m === p || m - 1 === p) return 1;

    // if (p * p > m) return countPrimes(m) - i; 
    
    if (p * p > m) { // all almost primes are actually primes
        if (m > MAX_PRIME) return countPrimes(m) - i;
        
        // calculate countPrimes(m) "by hand"
        let j = i;
        while (Primes[j] <= m) j++;
        return j - i;
    }


    // Otherwise, there's actually work to do. Let's cache it
    const cacheKey = m + '_' + p;
    if (!cache2[cacheKey])
        cache2[cacheKey] = _countAlmostPrimes(m, p);
    return cache2[cacheKey];
}

function _countAlmostPrimes(m, p) {
    let i = 0;
    let q = Primes[0];

    let almostPrimes = m;
    while (q < p) {
        const m1 = Math.floor(m / q); // FIXME: we're doing integer division here. Could be done faster
        almostPrimes -= countAlmostPrimesCached(m1, q, i);

        i++;
        q = Primes[i];
    }
    almostPrimes = almostPrimes - i;
    return almostPrimes
}








/*
    
    Benchmarks and Tests

*/
function benchmark(n, actualValue) {
    if(10**n > MAX_PRIME * MAX_PRIME) throw Error('maximum exceeded. need more primes')
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
