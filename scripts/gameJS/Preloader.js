var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var KodoBreakout;
(function (KodoBreakout) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //Setup preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            //Load actual game assets
            /*
            this.load.image('titlepage', 'assets/images/titlepage.jpg');
            this.load.image('logo', 'assets/images/logo.png');
            this.load.audio('music', 'assets/audio/title.mp3', true);
            this.load.spritesheet('aileRun', 'assets/images/aileRun.png', 28, 40, 6);
            this.load.image('aileJump', 'assets/images/aileJump.png');
            this.load.image('level1', 'assets/images/level1.png');
            this.load.tilemap('map', 'assets/tilemaps/kenney.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('kenney', 'assets/images/kenney.png');
            this.load.atlasJSONHash('aile', 'assets/images/Aile.png', 'assets/images/Aile.json');
            */
        };

        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };

        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('GamePlay', true, false);
            //this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    KodoBreakout.Preloader = Preloader;
})(KodoBreakout || (KodoBreakout = {}));
//# sourceMappingURL=Preloader.js.map
