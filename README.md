# QuickSort Algorithm Lab

## Live Demo

- https://<your-username>.github.io/QuickSort-Lab/

## GitHub Repository

- https://github.com/<your-username>/QuickSort-Lab

## Objective

Build a professional frontend-only lab that implements QuickSort (recursive and iterative), compares multiple sorting algorithms, validates correctness, benchmarks performance, and documents the workflow.

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
    ├── sortingAlgorithms.js
    ├── benchmark.js
    ├── tests.js
    └── app.js
```

## How to Run

1. Open `index.html` in a modern browser.
2. Enter comma-separated numbers in the input area.
3. Select an algorithm and click "Sort Numbers".
4. Use "Compare Current Input" to compare QuickSort results with built-in sort.
5. Use "Run Tests" to execute the predefined test suite.

## Features

- Recursive and iterative QuickSort implementations
- Additional sorting algorithms for comparison
- Input validation with friendly errors
- Benchmarking with `performance.now()`
- Fastest algorithm detection
- Frontend test runner with summary and detailed results
- Current input algorithm comparison report
- Array visualization for original vs sorted values
- Responsive, professional light/dark UI

## Sorting Algorithms Implemented

- Recursive QuickSort
- Iterative QuickSort
- Built-in JavaScript numeric sort
- Merge Sort
- Heap Sort
- Insertion Sort
- Selection Sort
- Bubble Sort

## Compare Current Input Feature

- Compares recursive and iterative QuickSort results with built-in numeric sort.
- Displays a pass/fail message plus the input and outputs.
- Uses the current textarea values only.
- Updates automatically after sorting or generating a random array.

Compare Current Input validates the user's current array by comparing Recursive QuickSort, Iterative QuickSort, and JavaScript built-in numeric sort. It updates automatically after sorting or generating a random array.

## Predefined Test Suite

- "Run Tests" uses fixed test cases and is independent from the current input field.
- Covers empty arrays, single elements, sorted/reversed arrays, duplicates, negatives, and large random inputs.

Run Tests uses predefined test cases and is independent from the current input.

## Test Summary

- Displays a summary such as "64 / 64 tests passed" at the top of the results section.

## Benchmarking Strategy

- Runs all applicable algorithms on the same input array.
- Slow algorithms (bubble, selection, insertion) may be skipped for large arrays to avoid browser freezing.
- Small inputs may show 0.000 ms because operations are extremely fast in the browser.
- Benchmark results may vary depending on browser, device, input size, and current system load.

## Fastest Algorithm Detection

- Highlights the fastest benchmark result in the UI and shows a dedicated label.

## Visualization

- Displays bars for original and sorted arrays.
- Large arrays use a limited visualization for readability.
- Bars are normalized by absolute value and negative values extend below a zero baseline.

## Input Validation

- Accepts numbers separated by commas.
- Trims whitespace and rejects empty or non-numeric entries.
- Shows clear error messages when validation fails.

## Debugging and Refinement

- Ensured non-mutating sorting functions for consistent benchmarking.
- Validated outputs against built-in numeric sort.
- Added guardrails for large inputs and slow algorithms.

## GitHub Copilot Assistance

- Accelerated QuickSort implementation and iterative variant.
- Helped structure benchmarking and testing logic.
- Suggested UI improvements and documentation sections.

## Deployment Using GitHub Pages

1. Push the project to GitHub.
2. Go to Settings -> Pages.
3. Select the `main` branch and the root folder.
4. Save to publish at the GitHub Pages URL.

## Key Learnings

- Pivot selection impacts QuickSort performance significantly.
- Iterative QuickSort avoids recursion depth limits.
- Benchmarking should minimize unrelated overhead.
- Clean UI and readable results improve algorithm understanding.
- Built-in sorts are optimized but not always transparent.
