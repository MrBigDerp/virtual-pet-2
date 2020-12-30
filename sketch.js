//Create variables here
var dog,happyDog,database,foodS,foodStock;
var feed, addFoood;
var fedTime, lastFed;
var foodObj;
var milkimage;
var money,moneyS
var bttlemove
money = 200
moneyS = 200
function preload()
{
  //load images here
  milkimage = loadImage("Milk.png");
  doggo = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodObj = new Food()

  dog=createSprite(850,250)
  dog.addImage(doggo)
  dog.scale = 0.2

  money = createButton("Earn Some Money");
  money.position(1000,95)
  money.mousePressed(earnIt);
  money.mouseReleased(noEarn);

  feed = createButton("Feed doggo");
  feed.position(700,95)
  feed.mousePressed(feedDog);
  feed.mouseReleased(doggoSit)

  addFoood = createButton("Add Food")
  addFoood.position(800,95)
  addFoood.mousePressed(addFood)


  foodStock = 20;
  foodS = 20;

  foodStock = database.ref('Food')
  foodStock.on("value", function(readStock){
    readstock = database.foodStock
  })

}


function draw() {  
  background(46,139,87)

  if(bttlemove===true){
    for(var i=410;i<=720;i++){
       background(46,139,87)

imageMode(CENTER);
image(milkimage,i,220,70,70)
    }
    //bttlemove = false
}

  fedTime = database.ref("FeedTime")
  fedTime.on('value',function(data){
    lastFed = data.val();
  })

  fill("white")
  textSize(20)
  if(lastFed>=12){
    text("Doggo was last fed at:"+lastFed % 12 + "PM", 250, 30)
  }
  else if(lastFed ==0){
    text("Doggo was last fed at: 12 AM", 250 ,30)
  }
  else{
    text("Doggo was last fed at:"+lastFed + "AM",250,30)
  }

  foodObj.display();
  drawSprites();
  
  //add styles here
textSize(20);
  fill("white");
  text("Food Left:"+foodS,550,30)
  textSize(15)
  text("Money Left: $"+moneyS,800,50)
}

function readStock(database){
  foodS = database.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  if(foodS>0){
  dog.addImage(dogHappy)
  foodS--
  //setInterval(image(milkimage,720,220,70,70),200);
  bttlemove = true
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  }) 
  }

}

  function addFood(){
    if(moneyS>0){
    if(foodS<20){
    foodS++
    moneyS=moneyS-50;
    foodObj.foodStock = foodS
    database.ref('/').update({
      Food:foodS
    })      
    }
  }
  }

function doggoSit(){
  dog.addImage(doggo)
  bttlemove = false
}

function earnIt(){
  if(moneyS<500){
  moneyS=moneyS+50
  }
}

function noEarn(){
  if(moneyS>0){
    moneyS=moneyS
  }
}