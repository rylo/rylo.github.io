function SortDisplay(displaySelector) {
  this.displayElement = $(displaySelector);
}

SortDisplay.prototype.print = function(numbers) {
  this.displayElement.html('');

  numbers.forEach((number, index, inputArray) => {
    var height = number;
    this.displayElement.append('<div class="sort-column" data-id="' + number + '" style="height: ' + height + '%;"></div>');
  });
}
