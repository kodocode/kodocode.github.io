var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var KodoBreakout;
(function (KodoBreakout) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.preload = function () {
        };

        Level1.prototype.create = function () {
            // this.background = this.add.sprite(0, 0, 'level1');
            //this.music = this.add.audio('music', 1, false);
            //this.music.play();
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('kenney');
            this.layer = this.map.createLayer('Tile Layer 1');

            this.layer.resizeWorld();

            this.map.setCollisionByExclusion([]);

            this.player = new KodoBreakout.Player(this.game, 130, 284);
        };

        Level1.prototype.update = function () {
            this.physics.arcade.collide(this.player, this.layer);
        };
        return Level1;
    })(Phaser.State);
    KodoBreakout.Level1 = Level1;
})(KodoBreakout || (KodoBreakout = {}));
//# sourceMappingURL=Level1.js.map
