var dogImg, happyDog, dog;
var foodS, foodStock;
var database;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(500, 500);

  dog = createSprite(250, 250, 50, 80);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();
  
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    writeStock();
  }

  drawSprites();

  textSize(12);
  stroke(3);
  fill(0);
  text("Note: Press up arrow key to feed the dog milk", 100, 50);
 
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('food').update({
    food: x
  })
}



