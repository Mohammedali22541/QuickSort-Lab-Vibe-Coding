(() => {
  const ensureLab = () => {
    window.quickSortLab = window.quickSortLab || {};
    return window.quickSortLab;
  };

  const measureExecutionTime = (callback) => {
    const start = performance.now();
    const result = callback();
    const end = performance.now();

    return {
      result,
      timeMs: Number((end - start).toFixed(3)),
    };
  };

  const runBenchmark = (inputArray, options = {}) => {
    const lab = ensureLab();
    const data = Array.isArray(inputArray) ? inputArray : [];
    const slowThreshold = Number.isFinite(options.slowThreshold)
      ? options.slowThreshold
      : 1500;
    const includeSlow = data.length <= slowThreshold;

    const strategies = [
      {
        name: "Recursive QuickSort",
        sort: (arr) => lab.recursiveQuickSort(arr),
      },
      {
        name: "Iterative QuickSort",
        sort: (arr) => lab.iterativeQuickSort(arr),
      },
      {
        name: "Built-in JavaScript Sort",
        sort: (arr) => arr.slice().sort((a, b) => a - b),
      },
      { name: "Merge Sort", sort: (arr) => lab.mergeSort(arr) },
      { name: "Heap Sort", sort: (arr) => lab.heapSort(arr) },
      {
        name: "Insertion Sort",
        sort: (arr) => lab.insertionSort(arr),
        slow: true,
      },
      {
        name: "Selection Sort",
        sort: (arr) => lab.selectionSort(arr),
        slow: true,
      },
      { name: "Bubble Sort", sort: (arr) => lab.bubbleSort(arr), slow: true },
    ];

    const results = [];
    const skippedAlgorithms = [];

    strategies.forEach((strategy) => {
      if (!includeSlow && strategy.slow) {
        skippedAlgorithms.push(strategy.name);
        return;
      }

      const { timeMs } = measureExecutionTime(() => strategy.sort(data));
      results.push({
        name: strategy.name,
        timeMs,
      });
    });

    return {
      results,
      skippedSlow: skippedAlgorithms.length > 0,
      skippedAlgorithms,
    };
  };

  const lab = ensureLab();
  lab.measureExecutionTime = measureExecutionTime;
  lab.runBenchmark = runBenchmark;
})();
