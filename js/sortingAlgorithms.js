(() => {
  const ensureLab = () => {
    window.quickSortLab = window.quickSortLab || {};
    return window.quickSortLab;
  };

  const bubbleSort = (array) => {
    const arr = array.slice();
    for (let i = 0; i < arr.length - 1; i += 1) {
      for (let j = 0; j < arr.length - 1 - i; j += 1) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };

  const selectionSort = (array) => {
    const arr = array.slice();
    for (let i = 0; i < arr.length - 1; i += 1) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j += 1) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
    return arr;
  };

  const insertionSort = (array) => {
    const arr = array.slice();
    for (let i = 1; i < arr.length; i += 1) {
      const current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j -= 1;
      }
      arr[j + 1] = current;
    }
    return arr;
  };

  const mergeArrays = (left, right) => {
    const merged = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] <= right[rightIndex]) {
        merged.push(left[leftIndex]);
        leftIndex += 1;
      } else {
        merged.push(right[rightIndex]);
        rightIndex += 1;
      }
    }

    return merged.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const mergeSort = (array) => {
    if (array.length < 2) {
      return array.slice();
    }

    const mid = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, mid));
    const right = mergeSort(array.slice(mid));
    return mergeArrays(left, right);
  };

  const heapify = (arr, size, index) => {
    let largest = index;
    const left = index * 2 + 1;
    const right = index * 2 + 2;

    if (left < size && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < size && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== index) {
      const temp = arr[index];
      arr[index] = arr[largest];
      arr[largest] = temp;
      heapify(arr, size, largest);
    }
  };

  const heapSort = (array) => {
    const arr = array.slice();
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i -= 1) {
      heapify(arr, arr.length, i);
    }

    for (let i = arr.length - 1; i > 0; i -= 1) {
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      heapify(arr, i, 0);
    }

    return arr;
  };

  const lab = ensureLab();
  lab.bubbleSort = bubbleSort;
  lab.selectionSort = selectionSort;
  lab.insertionSort = insertionSort;
  lab.mergeSort = mergeSort;
  lab.heapSort = heapSort;
})();
