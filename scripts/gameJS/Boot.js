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
//# sourceMappingURL=Boot.js.map
