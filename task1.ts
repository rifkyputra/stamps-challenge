/*
 * Task 1: Print numbers 1-100 in reverse order with rules:
 * - Skip prime numbers
 * - Divisible by 3 → "Foo"
 * - Divisible by 5 → "Bar"
 * - Divisible by both 3 and 5 → "FooBar"
 */


// Uses Sieve of Eratosthenes for O(n log log n) prime generation 
// more efficient than brute force prime detection.
function sieveOfEratosthenes(limit: number): Set<number> {
  const isPrime = new Uint8Array(limit + 1).fill(1);
  isPrime[0] = isPrime[1] = 0;

  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = 0;
      }
    }
  }

  const primes = new Set<number>();
  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) primes.add(i);
  }
  return primes;
}

function transform(n: number, primes: Set<number>): string | null {
  if (primes.has(n)) return null;

  const divisibleBy3 = n % 3 === 0;
  const divisibleBy5 = n % 5 === 0;

  if (divisibleBy3 && divisibleBy5) return "FooBar";
  if (divisibleBy3) return "Foo";
  if (divisibleBy5) return "Bar";
  return String(n);
}

function main(): void {
  const primes = sieveOfEratosthenes(100);

  const results: string[] = [];
  for (let n = 100; n >= 1; n--) {
    const token = transform(n, primes);
    if (token !== null) results.push(token);
  }

  console.log(results.join(" "));
}

main();
