class Scene03 extends Phaser.Scene{
    constructor() {
        super("scene03");
    }
    
    init(opts) {
      // Check to see if any optional parameters were passed
      if (!opts) opts = {};
      // set properties from opts object or use defaults
      this.borderThickness = opts.borderThickness || 3;
      this.borderColor = opts.borderColor || 0x907748;
      this.borderAlpha = opts.borderAlpha || 1;
      this.windowAlpha = opts.windowAlpha || 0.8;
      this.windowColor = opts.windowColor || 0x303030;
      this.windowHeight = opts.windowHeight || 150;
      this.padding = opts.padding || 32;
      this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
      this.dialogSpeed = opts.dialogSpeed || 3;
      // used for animating the text
      this.eventCounter = 0;
      // if the dialog window is shown
      this.visible = true;
      // the current text in the window
      this.text;
      // the text that will be displayed in the window
      this.dialog;
      this.graphics;
      this.closeBtn;
      // Create the dialog window
      this.createWindow();
    }
    preload() {
      this.load.audio('memory three','./assets/memory3.mp3');
    }
    getGameWidth() {
      return w;
    }
    // Gets the height of the game (based on the scene)
    getGameHeight() {
      return h;
    }
    // Calculates where to place the dialog window based on the game size
    calculateWindowDimensions(width, height) {
      var x = this.padding;
      var y = height - this.windowHeight - this.padding;
      var rectWidth = width - (this.padding * 2);
      var rectHeight = this.windowHeight;
      return {
        x,
        y,
        rectWidth,
        rectHeight
      };
    }
    createInnerWindow(x, y, rectWidth, rectHeight) {
      this.graphics.fillStyle(this.windowColor, this.windowAlpha);
      this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }
    // Creates the border rectangle of the dialog window
    createOuterWindow(x, y, rectWidth, rectHeight) {
      this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
      this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }
    _createCloseModalButton(){
      var self = this;
      this.closeBtn = this.make.text({
        x: 800 - this.padding - 14,
        y: 600 - this.windowHeight - this.padding + 3,
        text: 'X',
        style: {
          font: 'bold 12px Arial',
          fill: this.closeBtnColor
        }
      });
      this.closeBtn.setInteractive();
      this.closeBtn.on('pointerover', function () {
        this.setTint(0xff0000);
      });
      this.closeBtn.on('pointerout', function () {
        this.clearTint();
      });
      this.closeBtn.on('pointerdown', function () {
        self.toggleWindow();
      });
    }
    _createCloseModalButtonBorder() {
      var x = 800 - this.padding - 20;
      var y = 600 - this.windowHeight - this.padding;
      this.graphics.strokeRect(x, y, 20, 20);
    }
    toggleWindow() {
      this.visible = !this.visible;
      if (this.text) this.text.visible = this.visible;
      if (this.graphics) this.graphics.visible = this.visible;
      if (this.closeBtn) this.closeBtn.visible = this.visible;
    }
    setText(text) {
      this._setText(text);
    }
    // Calcuate the position of the text in the dialog window
    _setText(text) {
      // Reset the dialog
      if (this.text) this.text.destroy();
      var x = this.padding + 10;
      var y = 600 - this.windowHeight - this.padding + 10;
      this.text = this.make.text({
        x,
        y,
        text,
        style: {
          wordWrap: { width: 800 - (this.padding * 2) - 25 }
        }
      });
    }
    createWindow(){
      var gameHeight = 600;
      var gameWidth = 800;
      this.add.sprite(0, 0, 'scene2_bg22').setOrigin(0,0);
      var dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
      this.graphics = this.add.graphics();
      this.createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
      this.createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
      this._createCloseModalButton();
      this._createCloseModalButtonBorder();
        this.setText(" We are almost there. you will notice that fantastic pink color change in background. Inside that special water barrier which is the sign of the secret garden, you should collect precious memories bubbles (Press ENTER to continue and F to collect) ");
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.sprite(0, 0, 'scene3_bg22').setOrigin(0,0);
      }
      create() {
        this.audio.play('memory three');
      }
      update() {
        if (keyENTER.isDown) {
          console.log("hello");
          this.scene.start('scene3');
          this.sound.get('memory3').stop();
        }
      }
    }