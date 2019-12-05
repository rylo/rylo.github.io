function QuickSort(display, numbers) {
  this.display = display;
  this.numbers = numbers;
}

QuickSort.prototype.initialize = function(playButtonSelector) {
  this.display.print(this.numbers);
  var _this = this;
  $(playButtonSelector).click(function() {
    var result = _this.sort(_this.numbers, 0, _this.numbers.length - 1);
    console.log(result);
  });
}

QuickSort.prototype.sort = function(numbers, low, high) {
  var pivot = this.partition(numbers, low, high);

  this.sort(numbers, low, pivot - 1);
  this.sort(numbers, pivot + 1, high);

  return numbers;
}

QuickSort.prototype.swap = function(array, index1, index2) {
  if (index1 == index2) {
    return;
  }
  console.log('swap indexes:', index1, index2, array[index1], array[index2])
  var originalValue = array[index1];
  console.log('before swap:', array);
  array[index1] = array[index2];
  array[index2] = originalValue;
  console.log('after swap:', array);
}

QuickSort.prototype.partition = function(array, startingIndex, endingIndex) {
  var pivot = array[endingIndex];
  var i = startingIndex;
  var j = endingIndex;

  console.log("indexes:", endingIndex, startingIndex);
  console.log('pivot:', pivot)

  while (i < j) {
    console.log("iterators", i, j);

    var currentHigh = array[j];
    var currentLow = array[i];

    if (currentHigh < pivot) {
      console.log('lower than pivot:', currentHigh + ' > ' + pivot)
      // higher than pivot: 9 > 9
      // not equal 9 48
      // swap indexes: 0 1 48 9
      // [48, 9, 60, 100, 70, 90, 30, 30]

//       not equal 48 9
// quickSort.js:28 swap indexes: 0 1 9 48
// quickSort.js:30 before swap: (8) [9, 48, 60, 100, 70, 90, 30, 30]
      if (currentHigh == currentLow) {
        console.log('equal', currentHigh, currentLow)
        this.swap(array, i, endingIndex);
        j--;
      } else {
        console.log('not equal', currentHigh, currentLow)
        this.swap(array, i, j);
        i++;
      }
    } else {
      console.log('greater than or equal to pivot', currentHigh)
      j--;
    }
  }

  return i + 1;
}
