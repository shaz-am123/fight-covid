function initial(){
	canvas=document.getElementById('mycanvas');
	W=1550;
	H=650;
	canvas.width=W;
	canvas.height=H;
	game_over=false;
	pen=canvas.getContext('2d');
	health=100;

	enemy_image=new Image;
	enemy_image.src="enemy.gif";

	player_image=new Image;
	player_image.src="player.gif";

	gem_image=new Image;
	gem_image.src="gem.png";

	e1={
		x:1300,
		y:20,
		w:100,
		h:100,
		speed:10,
	}
	e2={
		x:950,
		y:20,
		w:100,
		h:100,
		speed:20,
	}
	e3={
		x:600,
		y:400,
		w:110,
		h:110,
		speed:25,
	}
	e4={
		x:275,
		y:20,
		w:125,
		h:125,
		speed:30,
	}
	enemy=[e1,e2,e3,e4];

	player={
		x:20,
		y:320,
		w:150,
		h:150,
		speed:35,
		moving:false,
	};
	gem={
		x:W-100,
		y:H/2,
		w:75,
		h:75,
	};

	canvas.addEventListener('mousedown',function(){
	player.moving=true;
     }); 
	canvas.addEventListener('mouseup',function(){
	player.moving=false;
    });
}
function collission(rect1,rect2){
	if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) 
        return true;
    else
    	return false;
}
function draw(){
	pen.clearRect(0,0,W,H);
	for(let i=0;i<enemy.length;i++)
	pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);

    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);

    pen.font="40px Roboto ";
    pen.fillStyle="red";
    pen.fillText(health,50,50);
}
function update(){
	if(player.moving==true)
	{
		player.x+=player.speed;
	}

		for(let i=0;i<enemy.length;i++)
	{
		if(collission(player,enemy[i])==true)
		{
			health-=20;
			player.x=20;
		}
	}
	if(collission(player,gem)==true)
	{
		game_over=true;
		alert("YOU WON!!!");
	}

	for(let i=0;i<enemy.length;i++)
	{
		enemy[i].y+=enemy[i].speed;
		if(enemy[i].y>=(H-enemy[i].h)||enemy[i].y<=0)
			enemy[i].speed*=-1;
	}
	if(health==0)
	{
		game_over=true;
		alert("You Lost, better luck next time");
	}
}
function gameloop(){
	if(game_over==false)
	{
	   draw();
	   update();
    }
    if(game_over==true)
    	clearInterval(f);
}
initial();
setInterval(gameloop,100);
