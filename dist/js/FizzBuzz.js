window.onload = function() {
  var countTo;
  var data = [];
  var displayData;

  for (i = 0; i < countTo; i++) {
    var current = "";
    if (i % 3 === 0) {
      current += "Fizz";
    }
    if (i % 5 === 0) {
      current += "Buzz";
    }
    if (i % 3 !== 0 && i % 5 !== 0) {
      current = i;
    }
    data.push(current);
  }

  for (i = 0; i < data.length; i++) {
    displayData += data[i];
  }
  document.getElementById("fizzbuzz").innerHTML = "Hello World";
};
