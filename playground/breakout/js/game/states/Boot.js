var AlphaPhase=function(){};AlphaPhase.Boot=function(){},AlphaPhase.Boot.prototype={preload:function(){this.load.image('logo','assets/images/phaser.png'),this.load.image('preloadBar','assets/images/preloader-bar.png')},create:function(){this.game.stage.backgroundColor='#cccccc',this.input.maxPointers=1,this.state.start('Preloader')}};