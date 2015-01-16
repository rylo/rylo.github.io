function QuoteGenerator() {}

QuoteGenerator.prototype.random = function() {
  var quotes = [
    ['We are one species. We are starstuff.', 'Carl Sagan'],
    ['For small creatures such as we the vastness is bearable only through love', 'Carl Sagan'],
    ['We make our world significant by the courage of our questions and the depth of our answers', 'Carl Sagan']
  ];

  randomIndex = Math.floor(Math.random() * quotes.length);

  return quotes[randomIndex];
}
