// Method A: Iterative Loop
// Time Complexity: O(n) - Iterates from 1 to n.
// Space Complexity: O(1) - Only uses a constant amount of extra memory for the sum accumulator.
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Method B: Mathematical Formula (Arithmetic Progression)
// Time Complexity: O(1) - Computes the sum directly using multiplication and division.
// Space Complexity: O(1) - Constant space complexity.
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

// Method C: Recursion
// Time Complexity: O(n) - Calls itself n times recursively.
// Space Complexity: O(n) - The recursion stack calls scale linearly with n.
// Note: May throw a stack overflow error (Maximum call stack size exceeded) for very large values of n.
function sum_to_n_c(n: number): number {
  if (n <= 1) return Math.max(0, n);
  return n + sum_to_n_c(n - 1);
}
