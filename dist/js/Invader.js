window.onload = function() {
  //----------Variables----------
  var canvas = $("#Canvas");
  var c = canvas.get(0).getContext("2d");

  var canvasWidth = canvas.width();
  var canvasHeight = canvas.height();
  var previousTimeFrame = 0;
  var time = 0;

  var numStars;
  var starArray;

  var numinvaders;
  var invaderArray1;
  var invaderArray2;
  var invaderimg;

  var shipimg;
  var cscore = 0;
  var ranmath = 0;

  var bulletArray1;
  var bulletArray2;
  var bulletcheck1;
  var bulletcheck2;

  var bulletArray3;
  var bulletcheck3;
  var fire;
  var numbullet;
  var bulletnum = 0;
  var gun = 19;

  var Intervalcounter = 0;
  var FPS;
  var game;
  var shiphp;
  var endgame = $("#gameover");
  var reset = $("#reset");
  var set = $("#set");
  var godmode = $("#godmode");

  //----------Objects----------

  var Stars = function(x, y, width, height, vX, vY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vX = vX;
    this.vY = vY;
  };

  var playership = function(x, y, width, height, vX, vY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vX = vX;
    this.vY = vY;
  };

  var invader = function(x, y, width, height, vX, vY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vX = vX;
    this.vY = vY;
  };

  var bullet = function(x, y, width, height, vX, vY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vX = vX;
    this.vY = vY;
  };

  //----------Controlls----------

  $(document).keydown(function(e) {
    switch (e.keyCode) {
      case 37: // Left arrow was pressed -----
        whiteship.vX = -5;
        break;
      case 39: // Right arrow was pressed -----
        whiteship.vX = 5;
        break;
    }
  });
  $(document).keyup(function(e) {
    switch (e.keyCode) {
      case 37: // Left arrow was pressed -----
        whiteship.vX = 0; // Stop if nothing is being pressed -----
        break;
      case 39: // Right arrow was pressed -----
        whiteship.vX = 0; // Stop if nothing is being pressed -----
        break;
      case 32: // Space bar was pressed -----
        fire = true;
        break;
    }
  });

  reset.click(function() {
    //restart the game
    cleancanvas();
    startGame();
  });
  set.click(function() {
    //restart the game
    set = false;
  });
  godmode.click(function() {
    set = false;
  });

  //----------Initiate----------

  function init() {
    set = false;
    game = false;
    startGame();
  }

  //----------Start Game----------

  function startGame() {
    numStars = 50;
    starArray = new Array();

    numinvaders = $("#quantity").val();
    invaderArray1 = new Array();
    invaderArray2 = new Array();
    invaderimg = new Image();
    invaderimg.src = "/img/Invader_1.png"; //sets the invaders image

    bulletArray1 = new Array();
    bulletArray2 = new Array();
    bulletcheck1 = new Array();
    bulletcheck2 = new Array();

    numbullets = 100;
    bulletArray3 = new Array();

    shipimg = new Image();
    shipimg.src = "/img/Ship.png"; //sets the ship iamge
    shiphp = 1;
    cscore = 0;

    Intervalcounter = 0;
    set = true;
    game = true;
    endgame.hide();
    reset.hide();

    whiteship = new playership(358, 734, 22, 16, 0, 0); //create object ship -----

    //Setting Stars -----
    for (var i = 0; i < numStars; i++) {
      var x = Math.random() * canvasWidth;
      var y = Math.random() * canvasHeight;
      var width = 1;
      var height = 1;
      var vX = 0;
      var vY = -7;
      starArray.push(new Stars(x, y, width, height, vX, vY)); //create object Stars -----
    }
    //Setting invaders -----
    for (var i = 0; i < numinvaders; i++) {
      var x = canvasWidth + Math.random() * canvasWidth;
      var y = Math.random() * 325 + 50;
      var width = 20;
      var height = 15;
      var vX = -3;
      var vY = 0;
      invaderArray1.push(new invader(x, y, width, height, vX, vY)); //create object invaders -----
    }
    for (var i = 0; i < numinvaders; i++) {
      var x = -canvasWidth + Math.random() * canvasWidth;
      var y = Math.random() * 325 + 50;
      var width = 20;
      var height = 15;
      var vX = -3;
      var vY = 0;
      invaderArray2.push(new invader(x, y, width, height, vX, vY)); //create object invaders -----
    }
    //Setting bullets -----
    for (var i = 0; i < numinvaders; i++) {
      var x = -10;
      var y = 0;
      var width = 5;
      var height = 5;
      var vX = 0;
      var vY = -3;
      bulletArray1.push(new bullet(x, y, width, height, vX, vY)); //create object bullets1 -----
      bulletArray2.push(new bullet(x, y, width, height, vX, vY)); //create object bullets2 -----
    }
    for (var i = 0; i < numbullets; i++) {
      var x = -750;
      var y = 750;
      var width = 2;
      var height = 3;
      var vX = 0;
      var vY = 3;
      bulletArray3.push(new bullet(x, y, width, height, vX, vY)); //create object invaders -----
    }
    animate();
  }

  //----------Animate----------

  function animate(time) {
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    //-----FPS and score display-----
    var frameStart = Date.now();
    FPS = Math.floor(1000 / (time - previousTimeFrame));
    previousTimeFrame = time;
    c.font = "15px arial";
    c.fillText("FPS: " + FPS, 625, 25);
    c.fillText("Score: " + cscore, 10, 25);

    //-----difficulty-----
    if (cscore < 100) {
      // depending on the score, sets the difficulty of the game
      ranmath = 1000;
    } else if (cscore < 250) {
      ranmath = 750;
    } else if (cscore < 500) {
      ranmath = 500;
    } else if (cscore < 750) {
      ranmath = 250;
    }
    //-----star spawning for loop-----
    StarsLength = starArray.length;
    for (
      var i = 0;
      i < StarsLength;
      i++ //star spawn -----
    ) {
      tmpStars = starArray[i];

      c.fillStyle = "rgb(255,255,255)";
      c.fillRect(tmpStars.x, tmpStars.y, tmpStars.width, tmpStars.height); //draw the stars on screen -----

      tmpStars.y -= tmpStars.vY;

      if (tmpStars.y + tmpStars.height > 750) {
        tmpStars.x = Math.random() * canvasWidth;
        tmpStars.y = -150;
        tmpStars.vY = -7;
      }
    }
    //-----ship spawning and movement-----
    whiteship.x += whiteship.vX;
    c.drawImage(
      shipimg,
      whiteship.x,
      whiteship.y,
      whiteship.width,
      whiteship.height
    ); //draw the ship on screen -----
    //-----ship fire-----
    if (fire) {
      if (gun == 19) {
        // swap which gun the bullets shoot from
        gun = 3;
      } else {
        gun = 19;
      }
      tmpbullet3 = bulletArray3[bulletnum];
      tmpbullet3.x = whiteship.x + gun;
      tmpbullet3.y = whiteship.y;
      bulletnum++;
      if (bulletnum == 100) {
        bulletnum = 0;
      }
      fire = false;
    }
    //-----invader spawning for loops-----
    invadersLength = invaderArray1.length;
    for (
      var i = 0;
      i < invadersLength;
      i++ //invader spawn -----
    ) {
      tmpinvader = invaderArray1[i];
      c.drawImage(
        invaderimg,
        tmpinvader.x,
        tmpinvader.y,
        tmpinvader.width,
        tmpinvader.height
      ); //draw the invaders on screen -----
      tmpinvader.x -= tmpinvader.vX;
      if (tmpinvader.x + tmpinvader.width > 750) {
        //changes direction when invader hits the side of the screen -----
        tmpinvader.vX = 3;
      }
      if (tmpinvader.x < 0) {
        tmpinvader.vX = -3;
      }
      var rannum = Math.random() * ranmath;
      if (rannum < 1 && bulletcheck1[i] == true) {
        tmpbullet1 = bulletArray1[i];
        tmpbullet1.x = tmpinvader.x;
        tmpbullet1.y = tmpinvader.y;
        bulletcheck1[i] = false;
      }
    }
    for (
      var i = 0;
      i < invadersLength;
      i++ //invader spawn -----
    ) {
      tmpinvader = invaderArray2[i];
      c.drawImage(
        invaderimg,
        tmpinvader.x,
        tmpinvader.y,
        tmpinvader.width,
        tmpinvader.height
      ); //draw the invaders on screen -----
      tmpinvader.x -= tmpinvader.vX;
      if (tmpinvader.x + tmpinvader.width > 750) {
        // changes direction when invader hits the side of the screen -----
        tmpinvader.vX = 3;
      }
      if (tmpinvader.x < 0) {
        tmpinvader.vX = -3;
      }

      var rannum = Math.random() * ranmath;
      if (rannum < 1 && bulletcheck2[i] == true) {
        tmpbullet2 = bulletArray2[i];
        tmpbullet2.x = tmpinvader.x;
        tmpbullet2.y = tmpinvader.y;
        bulletcheck2[i] = false;
      }
    }
    //-----bullet spawning-----
    for (
      var i = 0;
      i < invadersLength;
      i++ //bullet spawn -----
    ) {
      tmpbullet1 = bulletArray1[i];
      c.fillStyle = "rgb(255,255,255)";
      c.fillRect(
        tmpbullet1.x,
        tmpbullet1.y,
        tmpbullet1.width,
        tmpbullet1.height
      ); //draw bullet on screen -----
      tmpbullet1.y -= tmpbullet1.vY;

      if (tmpbullet1.y + tmpbullet1.height > 750) {
        tmpbullet1.y = 0;
        tmpbullet1.vY = -3;
        tmpbullet1.x = -10;
        bulletcheck1[i] = true;
      }
    }
    for (
      var i = 0;
      i < invadersLength;
      i++ //bullet spawn -----
    ) {
      tmpbullet2 = bulletArray2[i];
      c.fillStyle = "rgb(255,255,255)";
      c.fillRect(
        tmpbullet2.x,
        tmpbullet2.y,
        tmpbullet2.width,
        tmpbullet2.height
      ); //draw bullet on screen -----
      tmpbullet2.y -= tmpbullet2.vY;

      if (tmpbullet2.y + tmpbullet2.height > 750) {
        tmpbullet2.y = 0;
        tmpbullet2.vY = -3;
        tmpbullet2.x = -10;
        bulletcheck2[i] = true;
      }
    }
    bulletLength = bulletArray3.length;
    for (
      var i = 0;
      i < bulletLength;
      i++ //bullet spawn -----
    ) {
      tmpbullet3 = bulletArray3[i];
      c.fillStyle = "rgb(255,255,255)";
      c.fillRect(
        tmpbullet3.x,
        tmpbullet3.y,
        tmpbullet3.width,
        tmpbullet3.height
      ); //draw bullet on screen -----
      tmpbullet3.y -= tmpbullet3.vY;

      if (tmpbullet3.y + tmpbullet3.height > 750) {
        tmpbullet3.y = 0;
        tmpbullet3.vY = -3;
        tmpbullet3.x = -750;
      }
    }
    for (var i = 0; i < invadersLength; i++) {
      tmpinvader = invaderArray1[i];
      for (var j = 0; j < bulletLength; j++) {
        tmpbullet3 = bulletArray3[j];
        if (
          !(tmpbullet3.x + tmpbullet3.width < tmpinvader.x) &&
          !(tmpbullet3.y + tmpbullet3.width < tmpinvader.y) &&
          !(tmpinvader.x + tmpinvader.height < tmpbullet3.x) &&
          !(tmpinvader.y + tmpinvader.height < tmpbullet3.y)
        ) {
          //-----add 1 to score-----
          cscore++;
          //-----reset bullet-----
          tmpbullet3.y = 0;
          tmpbullet3.vY = 3;
          tmpbullet3.x = -750;
          //-----reset invader-----
          tmpinvader.x = canvasWidth + Math.random() * canvasWidth;
          tmpinvader.y = Math.random() * 325 + 50;
          tmpinvader.vX = -3;
        }
      }
    }
    for (var i = 0; i < invadersLength; i++) {
      tmpinvader = invaderArray2[i];
      for (var j = 0; j < bulletLength; j++) {
        tmpbullet3 = bulletArray3[j];
        if (
          !(tmpbullet3.x + tmpbullet3.width < tmpinvader.x) &&
          !(tmpbullet3.y + tmpbullet3.width < tmpinvader.y) &&
          !(tmpinvader.x + tmpinvader.width < tmpbullet3.x) &&
          !(tmpinvader.y + tmpinvader.width < tmpbullet3.y)
        ) {
          //-----add 1 to score-----
          cscore++;
          //-----reset bullet-----
          tmpbullet3.y = 0;
          tmpbullet3.vY = 3;
          tmpbullet3.x = -750;
          //-----reset invader-----
          tmpinvader.x = -canvasWidth + Math.random() * canvasWidth;
          tmpinvader.y = Math.random() * 325 + 50;
          tmpinvader.vX = -3;
        }
      }
    }
    if ($("input:checkbox:checked").val() == undefined) {
      for (
        var i = 0;
        i < invadersLength;
        i++ // check if ship has been hit but invader bullet1 -----
      ) {
        tmpbullet1 = bulletArray1[i];
        if (
          !(tmpbullet1.x + tmpbullet1.width < whiteship.x) &&
          !(tmpbullet1.y + tmpbullet1.width < whiteship.y) &&
          !(whiteship.x + whiteship.width < tmpbullet1.x) &&
          !(whiteship.y + whiteship.width < tmpbullet1.y)
        ) {
          //-----ship got hit, lose one hp-----
          shiphp -= 1;
        }
      }
      for (
        var i = 0;
        i < invadersLength;
        i++ // check if ship has been hit but invader bullet2 -----
      ) {
        tmpbullet2 = bulletArray2[i];
        if (
          !(tmpbullet2.x + tmpbullet2.width < whiteship.x) &&
          !(tmpbullet2.y + tmpbullet2.width < whiteship.y) &&
          !(whiteship.x + whiteship.width < tmpbullet2.x) &&
          !(whiteship.y + whiteship.width < tmpbullet2.y)
        ) {
          //-----ship got hit, lose one hp-----
          shiphp -= 1;
        }
      }
    }
    //-----ship location check-----
    if (whiteship.x < 0) {
      // checks to see if the ship has gone of screen, if so bring it back on screen -----
      whiteship.x = 0;
    }
    if (whiteship.x > 725) {
      whiteship.x = 725;
    }
    //-----Game over check-----
    if (game) {
      //checks to see if the game has been lost, if so stop animate -----
      if (set) {
        requestAnimationFrame(animate);
      }
    }
    //-----ship hp check-----
    if (shiphp < 1) {
      //checks the ships hp, if below 1 end the game -----
      shiphp = 0;
      if (shiphp == 0) {
        game = false;
        endgame.show();
        reset.show();
      }
    }
    if (!set) {
      startGame();
      cleancanvas();
    }
    var now = Date.now();
    var frametime = now - frameStart;
    c.fillText("TSF: " + Math.round(frametime) + "ms", 525, 25);
  }

  setInterval(function() {
    if (Intervalcounter < 60) {
      //record 60 seconds worth of data
      //this function will run every second. records the FPS var and puts it into a txt file
      $.post("php/CanvasInvader.php", {
        postIntervalcounter: Intervalcounter,
        postFPS: FPS
      });
      FPSGraphMakerFun(Intervalcounter, FPS);
      Intervalcounter++;
    }
  }, 1000);
  init();
};
