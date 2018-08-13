window.onload = function() {
  var countTo = 100;

  for (i = 0; i <= countTo; i++) {
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
    document.getElementById("fizzbuzz").innerHTML += "<br>" + current;
  }
};
