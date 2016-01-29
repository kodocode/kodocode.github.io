var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
//# sourceMappingURL=Player.js.map
