(() => {
  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const partition = (arr, low, high) => {
    // Use the middle element as pivot for better balance on sorted data.
    const mid = Math.floor((low + high) / 2);
    const pivotValue = arr[mid];
    swap(arr, mid, high);

    let storeIndex = low;
    for (let i = low; i < high; i += 1) {
      if (arr[i] <= pivotValue) {
        swap(arr, i, storeIndex);
        storeIndex += 1;
      }
    }

    swap(arr, storeIndex, high);
    return storeIndex;
  };

  const quickSortRecursive = (arr, low, high) => {
    if (low >= high) {
      return arr;
    }

    const pivotIndex = partition(arr, low, high);
    quickSortRecursive(arr, low, pivotIndex - 1);
    quickSortRecursive(arr, pivotIndex + 1, high);
    return arr;
  };

  const recursiveQuickSort = (array) => {
    const arr = array.slice();
    if (arr.length < 2) {
      return arr;
    }

    return quickSortRecursive(arr, 0, arr.length - 1);
  };

  const iterativeQuickSort = (array) => {
    const arr = array.slice();
    if (arr.length < 2) {
      return arr;
    }

    const stack = [[0, arr.length - 1]];
    while (stack.length) {
      const [low, high] = stack.pop();
      if (low >= high) {
        continue;
      }

      const pivotIndex = partition(arr, low, high);
      if (pivotIndex - 1 > low) {
        stack.push([low, pivotIndex - 1]);
      }
      if (pivotIndex + 1 < high) {
        stack.push([pivotIndex + 1, high]);
      }
    }

    return arr;
  };

  window.quickSortLab = window.quickSortLab || {};
  window.quickSortLab.recursiveQuickSort = recursiveQuickSort;
  window.quickSortLab.iterativeQuickSort = iterativeQuickSort;
  window.quickSortLab.pivotStrategy = "Middle element";
})();
