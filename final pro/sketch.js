var player,playerImage,groundImage,obstaclesGroup,score;
var PLAY = 1;
var END=0;
var gameState=PLAY;
function preload (){
 playerImage=loadImage("fur.png") 
 groundImage=loadImage("planet3.png")
 backgroundImage=loadImage("nebula.jpg")
 obstaclesImage=loadImage("pink.png")
 shampooImage=loadImage("shampoo.png")
}
function setup() {
  score=0
  createCanvas(800,400);
  player=createSprite(100,80, 40, 40);
  player.addImage(playerImage);
  player.scale=0.18;
  player.debug=true;
  player.setCollider("rectangle",0,0,350,440)
ground = createSprite(400,380,800,20);
ground.addImage(groundImage);
ground.x = ground.width/2;
ground.velocityX=-4
ground.scale=1.5;

 invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;
obstaclesGroup=new Group();
}

function draw() {
  background(backgroundImage); 
  background.velocityX=-8
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(ground);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
   }
  }
  else if (gameState === END) {
  
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   //trex.changeAnimation("collided",trex_collided);
    
  //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
    
   // if(mousePressedOver(restart)) {
    //  reset();
   // }
  }
  
  
  drawSprites();
}

//function spawnClouds() {
 // write code here to spawn the clouds
 // drawSprites();
//}
function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacles = createSprite(800,215,10,40);
    //obstacle.debug = true;
    obstacles.velocityX = -6;
    var num = Math.round(random(1,2));
    switch(num){
      case 1:
    obstacles.addImage(obstaclesImage);
 break;
 case 2:
   obstacles.addImage(shampooImage);
   break;
    }
    
    obstacles.scale = 0.2;
    obstacles.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacles);
  }
}