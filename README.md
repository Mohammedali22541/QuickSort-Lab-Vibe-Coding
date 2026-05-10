# QuickSort Algorithm Lab

## Objective

Build a professional frontend-only lab that implements QuickSort (recursive and iterative), compares it with the built-in JavaScript sort, validates correctness with tests, benchmarks performance, and documents the workflow.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

## Project Structure

```
QuickSort-Lab/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
└── js/
    ├── quicksort.js
    ├── benchmark.js
    ├── tests.js
    └── app.js
```

## How to Run

1. Open `index.html` in a modern browser.
2. Enter comma-separated numbers in the input area.
3. Select an algorithm and click "Sort Numbers".
4. Use "Run Tests" to validate correctness.

## Features

- Recursive and iterative QuickSort implementations
- Built-in JavaScript sort comparison
- Input validation with friendly errors
- Benchmarking using `performance.now()`
- Frontend test runner with pass/fail results
- Responsive, professional UI

## QuickSort Explanation

QuickSort is a divide-and-conquer algorithm that selects a pivot, partitions the array into elements less than and greater than the pivot, then recursively sorts the partitions. The iterative version uses an explicit stack to avoid deep recursion.

## Time and Space Complexity

- Best case: O(n log n)
- Average case: O(n log n)
- Worst case: O(n^2)
- Space complexity: O(log n) for recursive call stack

## Comparison: QuickSort vs MergeSort vs HeapSort vs Built-in Sort

| Algorithm        | Key Notes                                        |
| ---------------- | ------------------------------------------------ |
| QuickSort        | Fast in practice, in-place, pivot choice matters |
| MergeSort        | Stable, always O(n log n), needs extra memory    |
| HeapSort         | O(n log n), in-place, not stable                 |
| Built-in JS Sort | Highly optimized, engine-dependent strategy      |

## Testing Strategy

- Compare custom QuickSort outputs with built-in numeric sort.
- Cover empty input, single element, sorted, reversed, duplicates, negatives, mixed values, and large random datasets.
- Report test name, expected output, actual output, and pass/fail.

## Benchmarking Strategy

- Use the same input array for all algorithms.
- Measure each algorithm with `performance.now()`.
- Display timing in milliseconds for easy comparison.

## GitHub Copilot Assistance

- Accelerated initial QuickSort implementation and iterative variant.
- Helped structure the benchmark and test runner logic.
- Assisted in refining input validation and UI update flows.
- Suggested clear documentation sections for the lab report.

## Key Learnings

- Pivot selection impacts QuickSort performance significantly.
- Iterative QuickSort avoids recursion depth limits.
- Benchmarking should minimize unrelated overhead.
- Clean UI and readable results improve algorithm understanding.
- Built-in sorts are optimized but not always transparent.
