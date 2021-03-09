var boy, cash, diamonds, jewel, sword, bgImg, boyImg, cashImg, diamondImg, jewelImg, swordImg, cashG, diamondG, jewelG, swordG, gO, endImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var treasure = 0;

function preload() {
  bgImg = loadImage("road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondImg = loadImage("diamond.png");
  jewelImg = loadImage("jewel.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gO.png");
}

function setup() {
  createCanvas(400, 500);

  background = createSprite(200, 250);
  background.addImage(bgImg);
  background.velocityY = 4;

  boy = createSprite(70, 430, 20, 20);
  boy.addAnimation("boy_running", boyImg);
  boy.scale = 0.08;
  boy.setCollider("circle", 0, 0, 500);

  gO = createSprite(200, 250, 10, 10);
  gO.addImage(endImg);
  gO.scale = 0.8;
  gO.visible = false;

  cashG = createGroup();
  diamondG = createGroup();
  jewelG = createGroup();
  swordG = createGroup();
}

function draw() {
  boy.x = World.mouseX;

  edges = createEdgeSprites();
  boy.collide(edges);

  if (background.y > 400) {
    background.y = height / 2;
  }

  cash();
  diamonds();
  jewellery();
  sword();

  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasure = treasure + 500;
  } else if (diamondG.isTouching(boy)) {
    diamondG.destroyEach();
    treasure = treasure + 300;
  } else if (jewelG.isTouching(boy)) {
    jewelG.destroyEach();
    treasure = treasure + 200;
  } else {
    if (swordG.isTouching(boy)) {
      swordG.destroyEach();
      gameState = END;
    }

    if (gameState === END) {
      background.velocityY = 0;
      cashG.destroyEach();
      diamondG.destroyEach();
      jewelG.destroyEach();
      swordG.destroyEach();
      boy.destroy();
      gO.visible = true;
    }
  }
  drawSprites();
  textSize(25);
  fill(0);
  text("Treasure: " + treasure, 140, 30);
}

function cash() {
  if (World.frameCount % 180 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 200;
    cash.setCollider("circle", 0, 0, 200);
    cashG.add(cash);
  }
}

function diamonds() {
  if (World.frameCount % 130 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 200;
    diamondG.add(diamonds);
  }
}

function jewellery() {
  if (World.frameCount % 150 == 0) {
    var jewellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jewellery.addImage(jewelImg);
    jewellery.scale = 0.13;
    jewellery.velocityY = 3;
    jewellery.lifetime = 200;
    jewellery.setCollider("circle", 0, -10, 210);
    jewelG.add(jewellery);
  }
}

function sword() {
  if (World.frameCount % 100 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 200;
    sword.setCollider("rectangle", 0, 0, 500, 500);
    swordG.add(sword);
  }
}