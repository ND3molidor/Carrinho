 var car,car_run;
var obs,obs_img;
var fundo,imagemfundo;
var parededireita,paredeesquerda;
var poste,poste_img;
var gas, gasimg;
var final,final_img;
var ponto = 0;
var gas, valorgas = 0;

var som_bibi;

var MODOJOGAR = 1;
var MODOFINAL = 0;

var modo = MODOJOGAR;

var grupocar2, grupogas;

function preload(){
  //imagens pré-carregadas
  car_run = loadImage ("carro.png");
  imagemfundo = loadImage ("path.png");
  poste_img = loadImage("poste-eletrico.png");
  gasimg = loadImage("gasolina.png");
  final_img = loadImage("game.png");
  car2_img = loadImage("pngwing.com (1).png");
  
  som_bibi = loadSound("bibi.mp3");
}

function setup(){
  createCanvas(400,600);
  //crie os sprites aqui
  
  fundo = createSprite(200,200);
  fundo.addImage("fundo",imagemfundo);
  fundo.velocityY = 4;
  fundo.scale = 1.2;
  
  
  car = createSprite(200,400);
  car.addImage("car",car_run);
  car.scale = 0.2; 
  //car.debug = true;
  car.setCollider("rectangle",0,0,350,650) 
  
 
  
  
  final = createSprite(200,200);
  final.addImage(final_img);
  final.scale = 0.4
  final.visible = false;
  
 
  
  
  
  parededireita = createSprite (4,225,25,650);
  parededireita.visible = false;
  
  paredeesquerda = createSprite (398,225,25,650);
  paredeesquerda.visible= false;
  
  grupocar2 = new Group();
  grupogas = new Group();
 
  
}

function draw() {
  background("black");
 
  console.log(modo);
  
if(modo === MODOJOGAR){
 controles()
  
 obstaculo()
  
  if(grupocar2.isTouching(car)){
      modo = MODOFINAL;
    console.log("tocando");
    } 
  if(grupogas.isTouching(car)){
    grupogas.destroyEach();
    valorgas = valorgas +1;
    console.log("tocando");
    } 
  
  if(keyDown("w")){
    som_bibi.play();
  }
 
} 
  drawSprites();
if (modo === MODOFINAL){
  
  fundo.velocityY = 0;
  grupocar2.setVelocityYEach (0);
 grupogas.setVelocityYEach (0); 

  
  grupocar2.setLifetimeEach (-1);
  grupogas.setLifetimeEach(-1);

  
  final.visible = true;

  stroke("red");
  fill("yellow");
  textSize(20);
  text("Aperte espaço para ",100,300);
  text("recomeçar o jogo",109,320); 
  
   
    if(keyDown("space")){
     restart();   
}
  
  
       
}  
  
  fill("yellow");
  stroke("red");
   //drawSprites();
  textSize(13)
  text("ponto = "+ ponto,150,12);
  text("gasolina = "+ valorgas,150,30);
  
}  








function obstaculo(){
   if(frameCount % 140 === 0){
  car2 = createSprite(90,-20);
  car2.addImage(car2_img);
  car2.scale = 0.2;
     //car2.debug = true;
  car2.setCollider("rectangle",0,0,350,710); 
     
  car2.x = Math.round(random(90,320)) ;
  car2.velocityY = 4
  car2.lifetime = 230;
     grupocar2.add(car2);
      car2.depth = final.depth;
    final.depth = final.depth +1;
  }
  
  
   if(frameCount % 220 === 0){
  gas = createSprite(300,-30);
  gas.addImage(gasimg);
  gas.scale = 0.1;
  
  
  gas.x = Math.round(random(90,320)) ;
  gas.velocityY = 4;
  gas.lifetime = 230;
     grupogas.add(gas);
  } 
  
   
}


function restart(){
  modo = MODOJOGAR; 
 
  final.visible = false;
  
  grupocar2.destroyEach();
  grupogas.destroyEach();
  
  ponto = 0;
  
  
  fundo.velocityY = 4;
  
  valorgas = 0;
  
  car.x = 200;
  
}



function controles(){
 //faz o carro mecher 
 //car.y = World.mouseY;
 //car.x = World.mouseX;
  
  
  
  // conta os pontos 
  ponto = ponto + Math.round(frameRate() /60 ); 
  
  //faz o fundo voltar 
  if(fundo.y > 600) {
    fundo.y = height/4;
  }
  
  //faz o carro colidir na parede
  car. collide(parededireita);
  car. collide(paredeesquerda);
  
  
   if(keyDown("left")){
   car.x = car.x -5;
  }
  
  if(keyDown("right")){
   car.x = car.x + 5;
  }
}
