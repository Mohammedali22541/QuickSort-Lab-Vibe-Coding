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

  const runBenchmark = (inputArray) => {
    const lab = ensureLab();
    const data = Array.isArray(inputArray) ? inputArray : [];

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
    ];

    return strategies.map((strategy) => {
      const { timeMs } = measureExecutionTime(() => strategy.sort(data));
      return {
        name: strategy.name,
        timeMs,
      };
    });
  };

  const lab = ensureLab();
  lab.measureExecutionTime = measureExecutionTime;
  lab.runBenchmark = runBenchmark;
})();
