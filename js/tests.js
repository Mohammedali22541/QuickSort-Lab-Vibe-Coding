(() => {
  const ensureLab = () => {
    window.quickSortLab = window.quickSortLab || {};
    return window.quickSortLab;
  };

  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((value, index) => value === b[index]);

  const runTests = () => {
    const lab = ensureLab();
    const largeRandom = Array.from(
      { length: 2000 },
      () => Math.floor(Math.random() * 2001) - 1000,
    );

    const tests = [
      { name: "Empty array", input: [] },
      { name: "One-element array", input: [7] },
      { name: "Already sorted array", input: [1, 2, 3, 4, 5] },
      { name: "Reversed array", input: [9, 7, 5, 3, 1] },
      { name: "Array with duplicates", input: [4, 1, 4, 2, 1, 3] },
      { name: "Array with negative numbers", input: [-4, -2, -9, -1] },
      { name: "Mixed positives and negatives", input: [-3, 0, 2, -1, 5] },
      { name: "Large random dataset", input: largeRandom },
    ];

    const results = [];

    tests.forEach((test) => {
      const expected = test.input.slice().sort((a, b) => a - b);

      const actualRecursive = lab.recursiveQuickSort(test.input);
      results.push({
        name: `${test.name} (recursive)`,
        passed: arraysEqual(actualRecursive, expected),
        expected,
        actual: actualRecursive,
      });

      const actualIterative = lab.iterativeQuickSort(test.input);
      results.push({
        name: `${test.name} (iterative)`,
        passed: arraysEqual(actualIterative, expected),
        expected,
        actual: actualIterative,
      });
    });

    return results;
  };

  const lab = ensureLab();
  lab.runTests = runTests;
})();
