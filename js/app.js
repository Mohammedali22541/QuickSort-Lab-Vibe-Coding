(() => {
  const lab = window.quickSortLab;

  const form = document.querySelector("#sort-form");
  const input = document.querySelector("#numbers-input");
  const algorithmSelect = document.querySelector("#algorithm-select");
  const statusEl = document.querySelector("#input-status");
  const runTestsButton = document.querySelector("#run-tests");
  const generateButton = document.querySelector("#generate-random");

  const resultOriginal = document.querySelector("#result-original");
  const resultSorted = document.querySelector("#result-sorted");
  const resultAlgorithm = document.querySelector("#result-algorithm");
  const resultTime = document.querySelector("#result-time");
  const benchmarkResults = document.querySelector("#benchmark-results");
  const testResults = document.querySelector("#test-results");

  const setStatus = (message, type) => {
    statusEl.textContent = message;
    statusEl.className = "status";
    if (type) {
      statusEl.classList.add(`status--${type}`);
    }
  };

  const formatArray = (values) =>
    values.length ? `[${values.join(", ")}]` : "[]";

  const parseInput = (rawValue) => {
    const trimmed = rawValue.trim();
    if (!trimmed) {
      return { error: "Please enter at least one number." };
    }

    const parts = trimmed.split(",").map((part) => part.trim());
    const numbers = [];

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      if (!part) {
        return { error: "Empty values are not allowed. Check the commas." };
      }

      const value = Number(part);
      if (!Number.isFinite(value)) {
        return { error: `"${part}" is not a valid number.` };
      }

      numbers.push(value);
    }

    return { numbers };
  };

  const renderBenchmark = (results) => {
    benchmarkResults.innerHTML = "";
    results.forEach((item) => {
      const row = document.createElement("div");
      row.className = "table__row";

      const name = document.createElement("span");
      name.textContent = item.name;

      const time = document.createElement("span");
      time.textContent = item.timeMs.toFixed(3);

      row.append(name, time);
      benchmarkResults.append(row);
    });
  };

  const renderTests = (results) => {
    testResults.innerHTML = "";
    results.forEach((result) => {
      const item = document.createElement("div");
      item.className = `test-item ${result.passed ? "pass" : "fail"}`;

      const name = document.createElement("div");
      name.textContent = result.name;

      const status = document.createElement("span");
      status.textContent = result.passed ? "Passed" : "Failed";

      item.append(name, status);
      testResults.append(item);
    });
  };

  const runSort = () => {
    const { numbers, error } = parseInput(input.value);
    if (error) {
      setStatus(error, "error");
      return;
    }

    const algorithm = algorithmSelect.value;
    const start = performance.now();

    let sorted = [];
    let algorithmName = "";

    if (algorithm === "recursive") {
      sorted = lab.recursiveQuickSort(numbers);
      algorithmName = "Recursive QuickSort";
    } else if (algorithm === "iterative") {
      sorted = lab.iterativeQuickSort(numbers);
      algorithmName = "Iterative QuickSort";
    } else {
      sorted = numbers.slice().sort((a, b) => a - b);
      algorithmName = "Built-in JavaScript Sort";
    }

    const end = performance.now();

    resultOriginal.textContent = formatArray(numbers);
    resultSorted.textContent = formatArray(sorted);
    resultAlgorithm.textContent = algorithmName;
    resultTime.textContent = `${(end - start).toFixed(3)} ms`;

    renderBenchmark(lab.runBenchmark(numbers));
    setStatus(`Sorted ${numbers.length} values successfully.`, "success");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    runSort();
  });

  runTestsButton.addEventListener("click", () => {
    const results = lab.runTests();
    renderTests(results);
    setStatus("Test suite completed.", "success");
  });

  generateButton.addEventListener("click", () => {
    const randomArray = Array.from(
      { length: 12 },
      () => Math.floor(Math.random() * 151) - 50,
    );
    input.value = randomArray.join(", ");
    setStatus("Random array generated. You can sort it now.", "success");
  });
})();
