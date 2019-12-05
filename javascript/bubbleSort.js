function BubbleSort(display, numbers) {
  this.display = display;
  this.numbers = numbers;
}

BubbleSort.prototype.initialize = function(playButtonSelector) {
  this.display.print(this.numbers);
  var _this = this;
  $(playButtonSelector).click(function() {
    _this.sort(_this.numbers);
  });
}

BubbleSort.prototype.sort = function(numbers) {
  this.sortStep(numbers);
}

BubbleSort.prototype.sortStep = async function(numbers) {
  var sortedNumbers = numbers;
  var mutated = false;

  numbers.forEach((current, index, inputArray) => {
    var left = numbers[index];
    var right = numbers[index + 1];

    if (left > right) {
      sortedNumbers[index + 1] = left;
      sortedNumbers[index] = right;
      mutated = true;
      this.display.print(sortedNumbers);
    }
  });

  if (mutated) {
    sleep(1000).then(() => {
      this.sortStep(sortedNumbers);
    });
  }

  return sortedNumbers;
}
