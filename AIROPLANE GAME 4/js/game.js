class Game {
    constructor() {
  
    }

    
    getState() {
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value", function (data) {
        gameState = data.val();
      })
  
    }
  

    update(state) {
      database.ref('/').update({
        gameState: state
      });
    }


    async start() {
      if (gameState === 0) {
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if (playerCountRef.exists()) {
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }



      player1 = createSprite(200, 800);
      player1.addImage("player1", player_img);
  
      player2 = createSprite(800, 800);
      player2.addImage("player2", player_img);
    
      players = [player1, player2];

 
    
    }

  
    play() {
  
      form.hide();
  
      Player.getPlayerInfo();

      background(126,182,175);
      image(back_img, displayWidth-1800,0,displayWidth*10, displayHeight);
      
      var x = 100;
      var y = 200;
      var index = 0;
      drawSprites();
      textSize(32);

          for (var plr in allPlayers) {
          if (plr === "player1" || plr === "player2") {
  
         index = index + 1;
   
          x = 500 - allPlayers[plr].distance ;
          y = 760 + allPlayers[plr].distance1 ;
      
  
          players[index - 1].x = x;
          players[index - 1].y = y;



            if (index === player.index) {
            // to display player name on the Airoplane
            stroke("yellow");
            textSize(15);
            fill("yellow");
            text(allPlayers[plr].name ,x-50,y+25);

          // code for camera
             camera.position.x = players[index-1].x+100;
             camera.position.y = displayHeight/2;

             if (keyDown("space")) {
              
            createMissile(players[index - 1].x,players[index - 1].y);
            }
            
  
          }
          function createMissile(x,y) {
            for(var i=0; i <20; i++)
            {
            missile= createSprite(100, 100, 60, 10);
            missile.addImage(missile_img);
            missile.x = x;
            missile.y = y;
            missile.velocityX = 50;
            missile.lifetime = 500;
            missile.scale=0.5
            missileGroup.add(missile)  
            }
            
          }

        
          stroke("RED");
          textSize(25);
          fill("RED");
          text("Passengers"+":"+allPlayers[plr].score,players[index-1].x-600, index * 50);
         
          stroke("RED");
          textSize(25);
          fill("RED");
          text("Fuel"+":"+allPlayers[plr].score1,players[index-1].x-600, index * 75);
        
          stroke("RED");
          textSize(25);
          fill("RED");
          text("Kill"+":"+allPlayers[plr].score2,players[index-1].x-600, index * 100);

          
         
       }
      }

      if(cound===1){

      
      invisibleGround = createSprite(displayWidth - 600,displayHeight+40460,1400,81000);
      
    
      invisibleGround2 = createSprite(14100,displayHeight+40460,1000,81100);
     

      wall = createSprite(1700,displayHeight-30,10,450)

      wall2 = createSprite(13750,displayHeight-50,10,480)
      
      wall3 = createSprite(19600,displayHeight-200,9900,11000)
 
     wall4 = createSprite(19580,displayHeight-50,200,500)



      wall.visible=false
      wall2.visible=false
      wall3.visible=false
      invisibleGround.visible=false
      invisibleGround2.visible=false

     player1.collide( invisibleGround)
      
     player2.collide( invisibleGround)
      
     player1.collide( invisibleGround2)
      
     player2.collide( invisibleGround2)
     
     player1.collide(wall3)
      
     player2.collide(wall3)


      
        if (player1.isTouching(wall3)){

          cound=5

        }
        if (player2.isTouching(wall3)){

          cound=6

        }

     

        if(player1.isTouching(invisibleGround2)){
           cound=7
        }


       if(player2.isTouching(invisibleGround2)){
        cound=8
         }


      if (player1.isTouching(wall)||player1.isTouching(wall2)){
         cound=2
        }


      if (player2.isTouching(wall)||player2.isTouching(wall2)){
        cound=3
       }
        

      if (player1.isTouching(birdsGroup)){
        cound=2
        }


       if (player2.isTouching(birdsGroup)){
        cound=3
        }



        if (missileGroup.isTouching(birdsGroup)){
          player.score2++;
          birdsGroup.destroyEach();
          missileGroup.destroyEach();
        }

        if (missileGroup.isTouching(aliensGroup)){
          player.score2++;
          aliensGroup.destroyEach();
          missileGroup.destroyEach();
        }

        if (missileGroup.isTouching(bulletGroup)){
          bulletGroup.destroyEach();         
        }
        
        if (aliensGroup.isTouching(players[player.index - 1])){

        }





      if (gameState === 1) {
        player.distance -= 20
        
        player.update();
      }

      if (keyDown(RIGHT_ARROW) && player.index !== null) {
        player.distance -= 20
        player.update();
      }
    
      if (keyDown(UP_ARROW) && player.index !== null) {
        player.distance1 -= 10
        player.update();
      }

      if (keyDown(DOWN_ARROW) && player.index !== null) {
      if(player1.collide(invisibleGround)||player1.collide(invisibleGround2)||player1.collide(invisibleGround)||player1.collide(invisibleGround2)){

       }
       else{
        player.distance1 += 10
        player.update();
       }
        
      }
      


      //code for passengers

  
      if (frameCount % 50 === 0) {
        passengers = createSprite(random(1000,13000),random(30,displayHeight-30) , 100, 100);
        passengers.velocityX = -10;
        passengers.lifetime = 500
        passengers.addImage("passenger", passenger_img);
        passengersGroup.push(passengers);
  
      }
    

      //code for fuel
      if (frameCount % 50 === 0) {
        fuels = createSprite(random(1000,13000),random(30,displayHeight-30) , 100, 100);
        fuels.velocityX = -10;
        fuels.lifetime=500
        fuels.addImage("fuel", fuel_img);
        fuelsGroup.push(fuels);
      }

      if (frameCount % 50 === 0) {
        aliens = createSprite(random(1000,13000),random(30,displayHeight-30), 100, 100);
        aliens.velocityX = -10;
        aliens.lifetime=500
        aliens.addImage("alien", alien_img);
        createBullet(aliens.x,aliens.y);
        aliensGroup.push(aliens);
    

      }


      function createBullet(x,y) {
        for(var i=0; i <50; i++)
        {
        bullet= createSprite(100, 100, 60, 10);
        bullet.addImage(bullet_img);
        bullet.x = x;
        bullet.y = y;
        bullet.velocityX = -20;
        bullet.lifetime = 100;
        bullet.scale = 0.5;
        bulletGroup.add(bullet)  
        }
        
      }
      //code for bird
      if (frameCount % 50 === 0) {
        birds = createSprite(random(1000,13000),random(30,displayHeight-30) , 100, 100);
        birds.velocityX = -10;
        birds.lifetime=500
        var rand = Math.round(random(1, 3));
        switch (rand) {
            case 1: birds.addImage("bird", bird_img);
            break;
            case 2: birds.addImage("bird2", bird1_img);
            break;
            case 3: birds.addImage("bird2", bird2_img);
            break;
        
        }
        
        birdsGroup.push(birds);
      }

  
      if (player.index !== null) {

          for (let i = 0; i < passengersGroup.length; i++) {
          if (passengersGroup[i].isTouching(players[player.index - 1])) {
            player.score++;
            player.update();
            passengersGroup[i].destroy();
            passengersGroup.splice(i, 1);
          }
  
        }

  
        for (let i = 0; i < fuelsGroup.length; i++) {
          if (fuelsGroup[i].isTouching(players[player.index - 1])) {
            player.score1++;
            player.update();
            fuelsGroup[i].destroy();
            fuelsGroup.splice(i, 1);
          }
        }
      }

     
    
    
   }
     
   
   

    if (cound===2){
      birdsGroup.destroyEach();
      fire1=createSprite(player1.x,player1.y)
      fire1.addImage("fire",fire_img)
      player.distance-=0
      player.distance1+=0
      crash_sound.play();
    
    }
    if (cound===3){
      birdsGroup.destroyEach();
      fire=createSprite(player2.x,player2.y)
      fire.addImage("fire",fire_img)
      player.distance-=0
      player.distance1+=0
      crash_sound.play();
      player.update();
    }

    
    if(cound===4){
      player.distance-=0
      player.distance1+=0
      player.update();
    }


    if(cound===5){
      player.distance-=0
      player.distance1+=0
      win_sound.play();
      player.update();
    }


    if(cound===6){
      player.distance-=0
      player.distance1+=0
      win_sound.play();
      player.update();
    }

    if(cound===7){
      player.distance-=0
      player.distance1+=0
      win_sound.play();
      player.update();
    }


    if(cound===8){
      player.distance-=0
      player.distance1+=0
      win_sound.play();
      player.update();
    }

    if(cound===9){
      aliensGroup.destroyEach();
      fire=createSprite(player2.x,player2.y)
      fire.addImage("fire",fire_img)
      player.distance-=0
      player.distance1+=0
      crash_sound.play();
      player.update();
    }



    console.log(cound)
  }

   
    end() {
      console.log("Game Ended");

    }
  }
