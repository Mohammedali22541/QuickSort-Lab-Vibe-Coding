(() => {
  const lab = window.quickSortLab;

  const form = document.querySelector("#sort-form");
  const input = document.querySelector("#numbers-input");
  const algorithmSelect = document.querySelector("#algorithm-select");
  const arraySizeSelect = document.querySelector("#array-size");
  const statusEl = document.querySelector("#input-status");
  const themeToggle = document.querySelector("#theme-toggle");
  const validateButton = document.querySelector("#validate-input");
  const runTestsButton = document.querySelector("#run-tests");
  const generateButton = document.querySelector("#generate-random");
  const copyButton = document.querySelector("#copy-sorted");
  const clearButton = document.querySelector("#clear-workspace");

  const resultOriginal = document.querySelector("#result-original");
  const resultSorted = document.querySelector("#result-sorted");
  const resultAlgorithm = document.querySelector("#result-algorithm");
  const resultTime = document.querySelector("#result-time");
  const resultSize = document.querySelector("#result-size");
  const benchmarkResults = document.querySelector("#benchmark-results");
  const fastestAlgorithm = document.querySelector("#fastest-algorithm");
  const benchmarkWarning = document.querySelector("#benchmark-warning");
  const testResults = document.querySelector("#test-results");
  const testSummary = document.querySelector("#test-summary");
  const validationPanel = document.querySelector("#input-validation");
  const visualOriginal = document.querySelector("#visual-original");
  const visualSorted = document.querySelector("#visual-sorted");
  const visualNote = document.querySelector("#visual-note");
  const pivotStrategyEl = document.querySelector("#pivot-strategy");
  const algorithmInfo = document.querySelector("#algorithm-info");

  const DEFAULT_BENCHMARK_HTML =
    '<div class="table__row"><span class="muted">Run a sort to see benchmark data.</span><span class="muted">-</span></div>';
  const DEFAULT_TEST_HTML =
    '<div class="test-item muted">Run tests to see detailed results.</div>';
  const SLOW_BENCHMARK_THRESHOLD = 1000;
  const VISUAL_PREVIEW_LIMIT = 100;
  const VISUAL_HARD_LIMIT = 1000;
  const THEME_KEY = "quicksort-theme";
  const INPUT_CHANGED_MESSAGE =
    "Input changed. Click Sort Numbers to analyze the updated array.";

  let lastSorted = null;
  let lastOriginal = [];

  const algorithmLookup = {
    recursive: {
      name: "Recursive QuickSort",
      sort: (arr) => lab.recursiveQuickSort(arr),
    },
    iterative: {
      name: "Iterative QuickSort",
      sort: (arr) => lab.iterativeQuickSort(arr),
    },
    builtin: {
      name: "Built-in JavaScript Sort",
      sort: (arr) => arr.slice().sort((a, b) => a - b),
    },
    merge: { name: "Merge Sort", sort: (arr) => lab.mergeSort(arr) },
    heap: { name: "Heap Sort", sort: (arr) => lab.heapSort(arr) },
    insertion: {
      name: "Insertion Sort",
      sort: (arr) => lab.insertionSort(arr),
    },
    selection: {
      name: "Selection Sort",
      sort: (arr) => lab.selectionSort(arr),
    },
    bubble: { name: "Bubble Sort", sort: (arr) => lab.bubbleSort(arr) },
  };

  const algorithmInfoMap = {
    recursive: {
      name: "QuickSort (Recursive)",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n^2)",
      space: "O(log n)",
      notes: "Fast in practice, pivot choice matters.",
    },
    iterative: {
      name: "QuickSort (Iterative)",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n^2)",
      space: "O(log n)",
      notes: "Uses an explicit stack to avoid recursion depth limits.",
    },
    builtin: {
      name: "Built-in JavaScript Sort",
      best: "Engine-dependent",
      average: "Engine-dependent",
      worst: "Engine-dependent",
      space: "Engine-dependent",
      notes: "Highly optimized by the JavaScript engine.",
    },
    merge: {
      name: "Merge Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)",
      notes: "Stable and predictable, but uses extra memory.",
    },
    heap: {
      name: "Heap Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)",
      notes: "In-place, not stable, consistent performance.",
    },
    insertion: {
      name: "Insertion Sort",
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)",
      notes: "Efficient for small or nearly sorted inputs.",
    },
    selection: {
      name: "Selection Sort",
      best: "O(n^2)",
      average: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)",
      notes: "Simple but slow on large arrays.",
    },
    bubble: {
      name: "Bubble Sort",
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)",
      notes: "Only practical for very small datasets.",
    },
  };

  const arraySizeMap = {
    small: 10,
    medium: 100,
    large: 1000,
    xlarge: 5000,
  };

  const setStatus = (message, type) => {
    statusEl.textContent = message;
    statusEl.className = "status";
    if (type) {
      statusEl.classList.add(`status--${type}`);
    }
  };

  const applyTheme = (mode) => {
    const isDark = mode === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  };

  const setCopyEnabled = (enabled) => {
    copyButton.disabled = !enabled;
  };

  const formatArray = (values) =>
    values.length ? `[${values.join(", ")}]` : "[]";

  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((value, index) => value === b[index]);

  const renderAlgorithmInfo = (algorithmKey) => {
    if (!algorithmInfo) {
      return;
    }
    const info = algorithmInfoMap[algorithmKey] || algorithmInfoMap.recursive;
    algorithmInfo.innerHTML = `
      <div class="algorithm-info__header">
        <h3>Selected Algorithm Info</h3>
        <span class="pill small">${info.name}</span>
      </div>
      <div class="algorithm-info__grid">
        <div class="algorithm-info__item">
          <span class="algorithm-info__label">Best</span>
          <span class="algorithm-info__value">${info.best}</span>
        </div>
        <div class="algorithm-info__item">
          <span class="algorithm-info__label">Average</span>
          <span class="algorithm-info__value">${info.average}</span>
        </div>
        <div class="algorithm-info__item">
          <span class="algorithm-info__label">Worst</span>
          <span class="algorithm-info__value">${info.worst}</span>
        </div>
        <div class="algorithm-info__item">
          <span class="algorithm-info__label">Space</span>
          <span class="algorithm-info__value">${info.space}</span>
        </div>
      </div>
      <p class="note">${info.notes}</p>
    `;
  };

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
        return {
          error: `Invalid value: '${part}'. Please enter numbers separated by commas.`,
        };
      }

      numbers.push(value);
    }

    return { numbers };
  };

  const updateArraySize = (size) => {
    resultSize.textContent = `${size} values`;
  };

  const renderBenchmark = (results, fastestName) => {
    benchmarkResults.innerHTML = "";
    results.forEach((item) => {
      const row = document.createElement("div");
      row.className = "table__row";
      if (item.name === fastestName) {
        row.classList.add("fastest");
      }

      const label = document.createElement("div");
      label.className = "table__label";
      const labelText = document.createElement("span");
      labelText.textContent = item.name;
      label.appendChild(labelText);

      if (item.name === fastestName) {
        const badge = document.createElement("span");
        badge.className = "mini-tag";
        badge.textContent = "Fastest";
        label.appendChild(badge);
      }

      const time = document.createElement("span");
      time.textContent = item.timeMs.toFixed(3);

      row.append(label, time);
      benchmarkResults.append(row);
    });
  };

  const updateBenchmarkMeta = (results, skippedAlgorithms) => {
    if (!results.length) {
      fastestAlgorithm.textContent = "Fastest Algorithm: -";
      benchmarkWarning.textContent = "";
      return;
    }

    const fastest = results.reduce((best, current) =>
      current.timeMs < best.timeMs ? current : best,
    );
    fastestAlgorithm.textContent = `Fastest Algorithm: ${fastest.name}`;

    if (skippedAlgorithms.length) {
      benchmarkWarning.textContent =
        "Slow O(n^2) algorithms were skipped for large inputs.";
    } else {
      benchmarkWarning.textContent = "";
    }
  };

  const renderTests = (results) => {
    testResults.innerHTML = "";
    const passedCount = results.filter((result) => result.passed).length;
    const totalCount = results.length;
    testSummary.textContent = `${passedCount} / ${totalCount} tests passed`;
    testSummary.className = "test-summary";
    testSummary.classList.add(passedCount === totalCount ? "pass" : "fail");

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

  const renderValidationPlaceholder = (message) => {
    validationPanel.className = "validation-panel";
    validationPanel.innerHTML = `
      <div class="validation-title">Current Input Algorithm Comparison</div>
      <p class="muted">
        This compares Recursive QuickSort and Iterative QuickSort against
        JavaScript built-in numeric sort using the current input.
      </p>
      ${message ? `<p class="note">${message}</p>` : ""}
    `;
  };

  const createValidationBlock = (labelText, valueText) => {
    const block = document.createElement("div");
    block.className = "validation-block";

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = labelText;

    const value = document.createElement("div");
    value.className = "code-block";
    value.textContent = valueText;

    block.append(label, value);
    return block;
  };

  const renderValidationResult = ({ passed, message, inputArray, outputs }) => {
    validationPanel.className = `validation-panel ${passed ? "pass" : "fail"}`;
    validationPanel.innerHTML = "";

    const header = document.createElement("div");
    header.className = "validation-header";

    const title = document.createElement("div");
    title.className = "validation-title";
    title.textContent = "Current Input Algorithm Comparison";

    const status = document.createElement("span");
    status.className = `status-badge ${passed ? "pass" : "fail"}`;
    status.textContent = passed ? "Passed" : "Failed";

    header.append(title, status);

    const messageEl = document.createElement("p");
    messageEl.className = "validation-message";
    messageEl.textContent = message;

    validationPanel.append(header, messageEl);

    if (inputArray) {
      validationPanel.append(
        createValidationBlock("Input", formatArray(inputArray)),
      );
    }

    if (outputs) {
      validationPanel.append(
        createValidationBlock(
          "Recursive QuickSort",
          formatArray(outputs.recursive),
        ),
      );
      validationPanel.append(
        createValidationBlock(
          "Iterative QuickSort",
          formatArray(outputs.iterative),
        ),
      );
      validationPanel.append(
        createValidationBlock(
          "Built-in JavaScript Sort",
          formatArray(outputs.builtin),
        ),
      );
    }
  };

  const buildComparison = (numbers) => {
    const recursive = lab.recursiveQuickSort(numbers);
    const iterative = lab.iterativeQuickSort(numbers);
    const builtin = numbers.slice().sort((a, b) => a - b);
    const passed =
      arraysEqual(recursive, builtin) && arraysEqual(iterative, builtin);
    const message = passed
      ? "Recursive QuickSort and Iterative QuickSort match the JavaScript built-in numeric sort."
      : "Mismatch detected between QuickSort results and the JavaScript built-in numeric sort.";

    return {
      passed,
      message,
      inputArray: numbers,
      outputs: { recursive, iterative, builtin },
    };
  };

  const runComparison = (numbers, options = {}) => {
    const comparison = buildComparison(numbers);
    renderValidationResult(comparison);
    if (options.statusMessage) {
      setStatus(options.statusMessage, comparison.passed ? "success" : "error");
    }
    return comparison;
  };

  const renderBars = (container, values) => {
    container.innerHTML = "";
    if (!values.length) {
      return;
    }

    const maxValue = Math.max(...values.map((value) => Math.abs(value)), 1);
    values.forEach((value) => {
      const slot = document.createElement("div");
      slot.className = "bar-slot";

      const bar = document.createElement("div");
      bar.className = `bar-value ${value < 0 ? "negative" : "positive"}`;
      const height = Math.max(2, Math.round((Math.abs(value) / maxValue) * 50));
      bar.style.height = `${height}%`;
      bar.title = String(value);

      slot.append(bar);
      container.append(slot);
    });
  };

  const renderVisualization = (original, sorted) => {
    if (!original.length) {
      visualOriginal.innerHTML = "";
      visualSorted.innerHTML = "";
      visualNote.textContent = "";
      return;
    }

    const isVeryLarge = original.length > VISUAL_HARD_LIMIT;
    const isPreview = original.length > VISUAL_PREVIEW_LIMIT;
    const sliceLimit = isPreview ? VISUAL_PREVIEW_LIMIT : original.length;
    const originalSlice = original.slice(0, sliceLimit);
    const sortedSlice = sorted.slice(0, sliceLimit);

    renderBars(visualOriginal, originalSlice);
    renderBars(visualSorted, sortedSlice);
    if (isVeryLarge) {
      visualNote.textContent =
        "Visualization is limited for very large arrays to keep the UI responsive.";
    } else if (isPreview) {
      visualNote.textContent =
        "Visualization preview: showing first 100 values only.";
    } else {
      visualNote.textContent = "";
    }
  };

  const clearAnalysis = (options = {}) => {
    resultOriginal.textContent = "-";
    resultSorted.textContent = "-";
    resultAlgorithm.textContent = "-";
    resultTime.textContent = "-";
    updateArraySize(0);
    benchmarkResults.innerHTML = DEFAULT_BENCHMARK_HTML;
    fastestAlgorithm.textContent = "Fastest Algorithm: -";
    benchmarkWarning.textContent = "";
    renderVisualization([], []);
    lastSorted = null;
    lastOriginal = [];
    setCopyEnabled(false);

    if (options.resetValidation !== false) {
      renderValidationPlaceholder(options.validationMessage);
    }
  };

  const resetWorkspace = () => {
    input.value = "";
    clearAnalysis();
    testResults.innerHTML = DEFAULT_TEST_HTML;
    testSummary.textContent = "0 / 0 tests passed";
    testSummary.className = "test-summary";
    setStatus("", "");
  };

  const writeToClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temp = document.createElement("textarea");
    temp.value = text;
    temp.setAttribute("readonly", "");
    temp.style.position = "absolute";
    temp.style.left = "-9999px";
    document.body.append(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  };

  const runSort = (options = {}) => {
    const { numbers, error } = parseInput(input.value);
    if (error) {
      clearAnalysis({ resetValidation: false });
      renderValidationResult({ passed: false, message: error });
      setStatus(error, "error");
      return;
    }

    const algorithmKey = algorithmSelect.value;
    const selected = algorithmLookup[algorithmKey] || algorithmLookup.recursive;

    const start = performance.now();
    const sorted = selected.sort(numbers);
    const end = performance.now();

    lastOriginal = numbers;
    lastSorted = sorted;

    resultOriginal.textContent = formatArray(numbers);
    resultSorted.textContent = formatArray(sorted);
    resultAlgorithm.textContent = selected.name;
    resultTime.textContent = `${(end - start).toFixed(3)} ms`;
    updateArraySize(numbers.length);

    const benchmark = lab.runBenchmark(numbers, {
      slowThreshold: SLOW_BENCHMARK_THRESHOLD,
    });
    const fastestName = benchmark.results.length
      ? benchmark.results.reduce((best, current) =>
          current.timeMs < best.timeMs ? current : best,
        ).name
      : "";

    renderBenchmark(benchmark.results, fastestName);
    updateBenchmarkMeta(benchmark.results, benchmark.skippedAlgorithms);
    renderVisualization(numbers, sorted);
    runComparison(numbers);
    setStatus(
      options.successMessage ||
        `Sorted and analyzed ${numbers.length} values successfully.`,
      "success",
    );
    setCopyEnabled(true);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    runSort();
  });

  input.addEventListener("input", () => {
    clearAnalysis({ validationMessage: INPUT_CHANGED_MESSAGE });
    setStatus(INPUT_CHANGED_MESSAGE);
  });

  algorithmSelect.addEventListener("change", () => {
    renderAlgorithmInfo(algorithmSelect.value);
  });

  validateButton.addEventListener("click", () => {
    const { numbers, error } = parseInput(input.value);
    if (error) {
      clearAnalysis({ resetValidation: false });
      renderValidationResult({ passed: false, message: error });
      setStatus(error, "error");
      return;
    }

    const comparison = runComparison(numbers);
    setStatus(
      comparison.passed
        ? "Current input comparison completed successfully."
        : "Current input comparison detected mismatches.",
      comparison.passed ? "success" : "error",
    );
  });

  runTestsButton.addEventListener("click", () => {
    const results = lab.runTests();
    renderTests(results);
    setStatus("Test suite completed.", "success");
  });

  generateButton.addEventListener("click", () => {
    const size = arraySizeMap[arraySizeSelect.value] || 100;
    const randomArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 1001) - 500,
    );
    input.value = randomArray.join(", ");
    runSort({
      successMessage: `Generated, sorted, and analyzed ${size} values successfully.`,
    });
  });

  copyButton.addEventListener("click", async () => {
    if (!lastSorted) {
      setStatus("No sorted result to copy.", "error");
      return;
    }

    try {
      await writeToClipboard(formatArray(lastSorted));
      setStatus("Sorted result copied to clipboard.", "success");
    } catch (error) {
      setStatus("Unable to copy the sorted result.", "error");
    }
  });

  clearButton.addEventListener("click", () => {
    resetWorkspace();
  });

  themeToggle.addEventListener("click", () => {
    const next = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    applyTheme(next);
  });

  pivotStrategyEl.textContent = lab.pivotStrategy || "Middle element";
  renderAlgorithmInfo(algorithmSelect.value);
  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  resetWorkspace();
})();
