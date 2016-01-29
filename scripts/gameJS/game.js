window.onload = function () {
    var game = new KodoBreakout.Game();
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var KodoBreakout;
(function (KodoBreakout) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/images/loader.png');
        };

        Boot.prototype.create = function () {
            this.input.maxPointers = 1;

            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                //this.stage.scale.pageAlignHorizontally = true;
            } else {
            }

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    KodoBreakout.Boot = Boot;
})(KodoBreakout || (KodoBreakout = {}));
var KodoBreakout;
(function (KodoBreakout) {
    var Brick = (function (_super) {
        __extends(Brick, _super);
        function Brick(game, x, y) {
            _super.call(this, game, x, y, 'bricks');
            this.frame = 0;
            this.maxDurablilty = 3;
            this.durability = this.maxDurablilty;
            this.game.physics.enable(this);
            this.body.immovable = true;
        }
        Brick.prototype.update = function () {
        };

        Brick.prototype.hit = function () {
            if (this.durability >= 1) {
                this.durability--;
                this.frame = this.maxDurablilty - this.durability;
            } else {
                this.kill();
            }
        };
        return Brick;
    })(Phaser.Sprite);
    KodoBreakout.Brick = Brick;
})(KodoBreakout || (KodoBreakout = {}));
var KodoBreakout;
(function (KodoBreakout) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 400, 450, Phaser.AUTO, 'content', null);

            //Sets game properties
            this.state.add('Boot', KodoBreakout.Boot, false);

            //Loads game assets.
            this.state.add('Preloader', KodoBreakout.Preloader, false);

            this.state.add('MainMenu', KodoBreakout.MainMenu, false);
            this.state.add('GamePlay', KodoBreakout.GamePlay, false);
            this.state.add('GameOver', KodoBreakout.GameOver, false);

            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    KodoBreakout.Game = Game;
})(KodoBreakout || (KodoBreakout = {}));
var KodoBreakout;
(function (KodoBreakout) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.apply(this, arguments);
        }
        GameOver.prototype.create = function () {
            this.score = this.game.state.states['GamePlay'].score;

            this.game.stage.backgroundColor = "#0000FF";
            this.input.onDown.addOnce(this.startGame, this);

            this.menuText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "Game Over", {
                font: "50px Arial",
                fill: "#ffffff"
            });
            this.menuText.anchor.set(0.5, 0.5);

            this.instructionText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, "Score:" + this.score + "\nClick to play again!", {
                font: "25px Arial",
                fill: "#ffffff"
            });
            this.instructionText.anchor.set(0.5, 0.5);
            this.instructionText.wordWrap = true;
            this.instructionText.wordWrapWidth = this.game.width - 50;

            this.game.input.onDown.addOnce(this.startGame, this);
        };

        GameOver.prototype.startGame = function () {
            this.game.state.start('GamePlay', true, false);
        };
        return GameOver;
    })(Phaser.State);
    KodoBreakout.GameOver = GameOver;
})(KodoBreakout || (KodoBreakout = {}));
var KodoBreakout;
(function (KodoBreakout) {
    var GamePlay = (function (_super) {
        __extends(GamePlay, _super);
        function GamePlay() {
            _super.apply(this, arguments);
        }
        GamePlay.prototype.preload = function () {
        };

        GamePlay.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'background');

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.cursor = this.game.input.keyboard.createCursorKeys();

            //Paddle
            this.paddle = this.game.add.sprite((this.game.width * 1 / 2 - this.game.cache.getImage('paddle').width * 1 / 2), 400, 'paddle');

            this.game.physics.arcade.enable(this.paddle);

            this.paddle.body.collideWorldBounds = true;
            this.paddle.body.immovable = true;

            //Bricks
            this.bricks = this.game.add.group();
            this.bricks.enableBody = true;

            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    this.bricks.add(new KodoBreakout.Brick(this.game, 55 + i * 60, 55 + j * 32));
                }
            }
            this.bricks.setAll('body.immovable', true);

            //Ball
            this.ballsRemaining = 2;

            this.ball = this.game.add.sprite(this.game.width * 1 / 2 - this.game.cache.getImage('ball').width * 1 / 2, 400 - this.game.cache.getImage('ball').height, 'ball');
            this.game.physics.arcade.enable(this.ball);

            this.ball.body.velocity.x = 0;
            this.ball.body.velocity.y = 0;

            this.ballStationary = true;

            this.ball.body.collideWorldBounds = true;
            this.ball.body.bounce.x = 1;
            this.ball.body.bounce.y = 1;

            this.score = 0;

            this.scoreText = this.game.add.text(0, 0, "Score:" + this.score, {
                font: "25px Arial",
                fill: "#ffffff"
            });

            this.ballsRemainingText = this.game.add.text(200, 0, "Balls:" + this.ballsRemaining, {
                font: "15px Arial",
                fill: "#ffffff"
            });

            //Mouse movement
            this.game.input.addMoveCallback(this.move, this);
        };

        GamePlay.prototype.move = function (pointer, x, y) {
            return;

            this.paddle.x = this.game.input.mouse.event.x - this.paddle.width * 1 / 2;

            if (this.ballStationary) {
                this.ball.body.x = this.game.input.mouse.event.x;
            }
        };

        GamePlay.prototype.update = function () {
            this.scoreText.setText("Score: " + this.score);

            if (this.cursor.right.isDown) {
                this.paddle.body.velocity.x = 350;
                if (this.ballStationary) {
                    this.ball.body.velocity.x = 350;
                }
            } else if (this.cursor.left.isDown) {
                this.paddle.body.velocity.x = -350;
                if (this.ballStationary) {
                    this.ball.body.velocity.x = -350;
                }
            } else {
                this.paddle.body.velocity.x = 0;
                if (this.ballStationary) {
                    this.ball.body.velocity.x = 0;
                }
            }

            if (this.cursor.up.isDown) {
                if (this.ballStationary) {
                    this.ballStationary = false;

                    this.ball.body.velocity.x = 200;
                    this.ball.body.velocity.y = -200;
                }
            }

            this.game.physics.arcade.collide(this.paddle, this.ball, this.paddleHit, null, this);

            this.game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

            if (this.ball.body.onFloor()) {
                if (this.ballsRemaining >= 1) {
                    resetVelocity(this.ball);
                    resetVelocity(this.paddle);

                    this.ballStationary = true;
                    this.ball.body.position.x = this.paddle.x + 1 / 2 * this.paddle.width - 1 / 2 * this.ball.width;
                    ;
                    this.ball.body.position.y = this.paddle.y - this.ball.height;
                    this.ballsRemaining--;
                    this.ballsRemainingText.setText("Balls: " + this.ballsRemaining);
                } else {
                    this.ball.kill();
                    this.game.state.start('GameOver', true, false);
                }
            }
        };
        GamePlay.prototype.hit = function (ball, brick) {
            brick.hit();
            this.score += 10;
        };

        GamePlay.prototype.paddleHit = function (paddle, ball) {
            //adjust ball velocity - reflection. Currently random reflection. Maybe implement a system to adjust the reflection?
            ball.body.velocity.x = Math.floor(Math.random() * (300 - 1 + 1)) + 1;
            ;
        };
        return GamePlay;
    })(Phaser.State);
    KodoBreakout.GamePlay = GamePlay;

    function resetVelocity(sprite) {
        sprite.body.velocity.x = 0;
        sprite.body.velocity.y = 0;
    }
})(KodoBreakout || (KodoBreakout = {}));
var KodoBreakout;
(function (KodoBreakout) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.game.stage.backgroundColor = "#0000FF";

            this.input.onDown.addOnce(this.startGame, this);

            this.menuText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "Breakout", {
                font: "50px Arial",
                fill: "#ffffff"
            });
            this.menuText.anchor.set(0.5, 0.5);

            this.instructionText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, "Use left and right arrow keys to move paddle and Up Key to launch ball\nClick to begin.", {
                font: "25px Arial",
                fill: "#ffffff"
            });
            this.instructionText.anchor.set(0.5, 0.5);
            this.instructionText.wordWrap = true;
            this.instructionText.wordWrapWidth = this.game.width - 50;

            this.game.input.onDown.addOnce(this.startGame, this);
        };

        MainMenu.prototype.startGame = function () {
            this.game.state.start('GamePlay', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    KodoBreakout.MainMenu = MainMenu;
})(KodoBreakout || (KodoBreakout = {}));
var KodoBreakout;
(function (KodoBreakout) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'aileRun', 0);

            this.anchor.setTo(0.5, .5);
            this.scale.set(1.5, 1.5);
            this.animations.add('walk', [0, 1, 2, 3, 4, 5], 10, true);

            this.game.physics.arcade.enableBody(this);

            this.body.game.add.existing(this);
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                if (this.lastKeyTime + 100 > this.game.time.now) {
                    console.log(this.lastKeyTime);
                }

                if ((this.lastKey.keyCode == Phaser.Keyboard.LEFT) && (this.lastKeyTime + 500 > this.game.time.now)) {
                    this.body.velocity.x = -350;
                    this.animations.play('walk');
                } else {
                    this.body.velocity.x = -150;
                    this.animations.play('walk');
                }

                this.scale.x = -1.5;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');

                this.scale.x = 1.5;
            } else {
                this.animations.frame = 0;
            }

            if (this.body.onWall()) {
                console.log('on wall');
                this.body.velocity.y = 50;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.body.onFloor()) {
                this.body.velocity.y = -350;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !this.body.onFloor() && this.body.onWall()) {
                this.body.velocity.y = -350;
                this.body.velocity.x = -500;
            }

            this.lastKey = this.game.input.keyboard.lastKey;
            this.lastKeyTime = this.game.time.now;
        };
        return Player;
    })(Phaser.Sprite);
    KodoBreakout.Player = Player;
})(KodoBreakout || (KodoBreakout = {}));
var KodoBreakout;
(function (KodoBreakout) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //Setup preloader sprite
            this.preloadBar = this.add.sprite(100, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar, 0);
            this.load.image('background', 'assets/images/background.png');
            this.load.image('paddle', 'assets/images/paddle.png');
            this.load.image('ball', 'assets/images/ball.png');
            this.load.spritesheet('bricks', 'assets/images/bricks.png', 32, 16, 4);
            this.load.spritesheet('effect', 'assets/images/effect.png', 25, 25, 4);
        };

        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };

        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    KodoBreakout.Preloader = Preloader;
})(KodoBreakout || (KodoBreakout = {}));
//# sourceMappingURL=game.js.map
