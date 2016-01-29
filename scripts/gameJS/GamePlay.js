var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
            // this.background = this.add.sprite(0, 0, 'level1');
            //this.music = this.add.audio('music', 1, false);
            //this.music.play();
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('kenney');

            this.layer = this.map.createLayer('Tile Layer 1');

            this.layer.resizeWorld();

            this.map.setCollisionByExclusion([]);
            this.physics.arcade.gravity.y = 450;
            this.player = new KodoBreakout.Player(this.game, 130, 284);
        };

        GamePlay.prototype.update = function () {
            this.physics.arcade.collide(this.player, this.layer);
            this.game.debug.bodyInfo(this.player, 32, 32);
        };
        return GamePlay;
    })(Phaser.State);
    KodoBreakout.GamePlay = GamePlay;
})(KodoBreakout || (KodoBreakout = {}));
//# sourceMappingURL=GamePlay.js.map
