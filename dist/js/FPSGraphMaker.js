var firsttimerun = true;
var CGraphMaker;
var GraphMakerWidth;
var GraphMakerHeight;

function FPSGraphMakerFun(Intervalcounter, FPS) {
  var FPSGraphMaker = $("#FPSGraphMaker");
  CGraphMaker = FPSGraphMaker.get(0).getContext("2d");
  GraphMakerWidth = FPSGraphMaker.width();
  GraphMakerHeight = FPSGraphMaker.height();

  CGraphMaker.strokeStyle = "#FFFFFF";
  CGraphMaker.fillStyle = "#FFFFFF";
  CGraphMaker.font = "9px Arial";

  if (firsttimerun) {
    setup(CGraphMaker, GraphMakerWidth, GraphMakerHeight);
  }
  var secondsplacement = Intervalcounter * 12.1;
  var FPSplacement = GraphMakerHeight - FPS * 9.125;

  CGraphMaker.lineTo(secondsplacement + 20, FPSplacement - 5);
  CGraphMaker.stroke();

  CGraphMaker.fillText(FPS, secondsplacement + 20, FPSplacement - 10);
}
function setup(CGraphMaker, GraphMakerWidth, GraphMakerHeight) {
  CGraphMaker.beginPath();
  CGraphMaker.moveTo(11, 11);
  CGraphMaker.lineTo(11, GraphMakerHeight - 11);
  CGraphMaker.lineTo(GraphMakerWidth - 11, GraphMakerHeight - 11);
  CGraphMaker.lineTo(11, GraphMakerHeight - 11);
  CGraphMaker.stroke();

  var xplace = 7;
  var yplace = 7;
  CGraphMaker.fillText("FPS", 15, 15);
  for (var i = 0; i < 80; i++) {
    var fpscount = i + 1;
    yplace = yplace + 9.125;
    CGraphMaker.fillText(fpscount, 1, GraphMakerHeight - yplace);
  }
  CGraphMaker.fillText("Seconds", GraphMakerWidth - 50, GraphMakerHeight - 15);
  for (var i = 0; i < 60; i++) {
    var seconds = i + 1;
    xplace = xplace + 12.1;
    CGraphMaker.fillText(seconds, xplace, GraphMakerHeight - 2);
  }
  firsttimerun = false;
}
function cleancanvas() {
  CGraphMaker.clearRect(0, 0, GraphMakerWidth, GraphMakerHeight);
  firsttimerun = true;
  CGraphMaker.closePath();
  $.post("php/CleantxtFiles.php");
}
