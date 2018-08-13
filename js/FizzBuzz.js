window.onload = function() {
  var countTo;

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
    document.getElementById("log").innerHTML += "<br>" + current;
  }
};
