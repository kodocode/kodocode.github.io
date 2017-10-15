AlphaPhase.Game=function(){levelData={},hud={},playerControl={},gameControl={},score=0,scoreText="",gamePaused=!1,background={},cursor={},paddle={},bricks={},ball={},ballStationary=!0,ballsRemaining=0,ballsRemainingText=""},AlphaPhase.Game.prototype={init:function(a){this.levelData=a,this.worldStats={MAX_SPEED:500,ACCELERATION:1500,DRAG:600,GRAVITY:2500,JUMP_SPEED:-700}},create:function(){this.game.physics.startSystem(Phaser.Physics.ARCADE),this.cursor=this.game.input.keyboard.createCursorKeys();let a=this.game.height-50-this.game.cache.getImage("paddle").height,b=0.5*this.game.width-0.5*this.game.cache.getImage("paddle").width;this.paddle=this.game.add.sprite(b,a,"paddle"),this.game.physics.arcade.enable(this.paddle),this.paddle.body.collideWorldBounds=!0,this.paddle.body.immovable=!0,this.createBricks(),this.ballsRemaining=2,this.ball=this.game.add.sprite(1*this.game.width/2-0.5*(1.25*this.game.cache.getImage("ball").width),a-1.25*this.game.cache.getImage("ball").height,"ball"),this.ball.scale.setTo(1.25,1.25),this.game.physics.arcade.enable(this.ball),this.ball.body.velocity.x=0,this.ball.body.velocity.y=0,this.ballStationary=!0,this.ball.body.collideWorldBounds=!0,this.ball.body.bounce.x=1,this.ball.body.bounce.y=1,this.score=0,this.scoreText=this.game.add.text(10,10,"Score:"+this.score,{font:"20px Arial",fill:"#ffffff"}),this.ballsRemainingText=this.game.add.text(200,10,"Balls Remaining: "+this.ballsRemaining,{font:"20px Arial",fill:"#ffffff"}),this.ballsRemainingText.x=this.game.width-this.ballsRemainingText.width-10,this.game.input.addMoveCallback(this.move,this)},update:function(){this.gamePaused||this.gameplay()},gameplay:function(){this.scoreText.setText("Score: "+this.score),this.cursor.right.isDown?(this.paddle.body.velocity.x=350,this.ballStationary&&(this.ball.position.x=this.paddle.position.x)):this.cursor.left.isDown?(this.paddle.body.velocity.x=-350,this.ballStationary&&(this.ball.position.x=this.paddle.position.x)):(this.paddle.body.velocity.x=0,this.ballStationary&&(this.ball.body.velocity.x=0)),(this.cursor.up.isDown||game.input.activePointer.isDown)&&this.ballStationary&&(this.ballStationary=!1,this.ball.body.velocity.x=200,this.ball.body.velocity.y=-200),this.ballStationary?this.ball.x=this.paddle.x+0.5*this.game.cache.getImage("paddle").width-0.5*this.game.cache.getImage("ball").width:(this.game.physics.arcade.collide(this.paddle,this.ball,"",this.paddleHit,this),this.game.physics.arcade.collide(this.ball,this.bricks,this.hit,null,this));this.ball.body.onFloor()&&(1<=this.ballsRemaining?(this.resetVelocity(this.ball),this.resetVelocity(this.paddle),this.ballStationary=!0,this.ball.body.position.x=this.paddle.x+1/2*this.paddle.width-1/2*this.ball.width,this.ball.body.position.y=this.paddle.y-this.ball.height,this.ballsRemaining--,this.ballsRemainingText.setText("Balls Remaining: "+this.ballsRemaining)):(this.ball.kill(),this.game.canvas.style.cursor="initial",this.game.state.start("GameOver",!0,!1)))},shutdown:function(){},hit:function(a,b){b.hit(),this.score+=10},paddleHit:function(a,b){var c=0;return b.x<a.x?(c=a.x-b.x,b.body.velocity.x=-10*c):b.x>a.x?(c=b.x-a.x,b.body.velocity.x=10*c):b.body.velocity.x=2+2*Math.random(),!0},move:function(){let a=this.game.input.mouse.event.x,b=this.game.cache.getImage("paddle").width,c=this.game.width-0.5*b;a>0.5*b&&a<c&&(this.paddle.x=this.game.input.mouse.event.x-1*this.paddle.width/2)},togglePause:function(){this.gamePaused=!this.gamePaused,this.player.worldPaused=!this.player.worldPaused,this.game.physics.arcade.isPaused=!this.game.physics.arcade.isPaused},configureControls:function(){this.gameControl.pause=this.input.keyboard.addKey(Phaser.Keyboard.P),this.gameControl.pause.onDown.add(function(){this.togglePause()},this)},addToScore:function(a){this.score+=a,this.scoreText.setText("Score: "+this.score)},createBricks:function(){let a=this.game.width,b=this.game.cache.getImage("brick").width,c=0.75*b,d=50,e=Math.ceil((a-2*d)/(b+c));this.bricks=this.game.add.group(),this.bricks.enableBody=!0,this.bricks.add(new Brick(this.game,55,55));for(var f=0;f<e;f++)for(var g=0;5>g;g++){let a=d+f*(b+c),e=Math.floor(4*Math.random());this.bricks.add(new Brick(this.game,a,55+32*g,"bricks",e))}this.bricks.setAll("body.immovable",!0)},createHud:function(){},resetVelocity:function(a){a.body.velocity.x=0,a.body.velocity.y=0}};