class Scene2 extends Phaser.Scene{
    constructor() {
        super("scene2")
    }

    init() {

    }
    preload() {
        this.load.image('scene3_bg', './assets/ocean_scene3.png');
        this.load.image('obj2', './assets/toy_bubble.png');
        this.load.audio('bgm2', './assets/bgm2.mp3');
    }
    create() {
        // background
        this.bg1 = this.add.image(0, 0, 'scene3_bg').setOrigin(0, 0);
        this.cameras.main.setBounds(0, 0, this.bg1.displayWidth, this.bg1.displayHeight);
        w = this.bg1.width;
        h = this.bg1.height;
        this.physics.world.setBounds(0, 0, w, h);
        this.enemyGroup = this.add.group({
            runChildUpdate: true,
            active: true
        });
        this.floorGroup = this.add.group({
            active: true
        })

        // platforms and enemies
        this.floor0 = this.addPlat(0,h, "ground",0).setOrigin(0,1);
        this.floor01 = this.addPlat(w/2,h, "ground",0).setOrigin(0,1);
        this.floor1 = this.addPlat(w/2,200,"plat",0).setOrigin(0.5, 0).setScale(2.5);
        this.floor2 = this.addPlat(200,600,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.floor3 = this.addPlat(1735,1000,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.floor4 = this.addPlat(1900,1350,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.floor5 = this.addPlat(1680,2100,"plat",0).setOrigin(0.5, 0).setScale(2.5);
        this.door2 = this.physics.add.image(1680 + 150,2100,"obj1")
            .setOrigin(1,1);
        this.floor6 = this.addPlat(752,2700,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.floor7 = this.addPlat(1568,3000,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.floor8 = this.addPlat(359,3400,"plat",0).setOrigin(0.5, 0).setScale(2.5);
        this.floor9 = this.addPlat(600,3700,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.floor10 = this.addPlat(200,2500,"plat",0).setOrigin(0.5, 0).setScale(2.5);
        this.door = this.physics.add.image(200,2500,"obj1")
            .setOrigin(1,1);
        this.floor11 = this.addPlat(150,1300,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.floor12 = this.addPlat(275,1750,"plat",0).setOrigin(0.5, 0).setScale(2.5);
        this.floor13 = this.addPlat(1800,3550,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.door3 = this.physics.add.image(1800,3550,"obj1")
            .setOrigin(1,1);
        this.floor14 = this.addPlat(826,2170,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.floor15 = this.addPlat(900,750,"plat",0).setOrigin(0.5, 0).setScale(2.5);
        this.floor16 = this.addPlat(1235,1850,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.floor17 = this.addPlat(1200,3250,"plat",0).setOrigin(0.5, 0).setScale(2.5);
        this.floor18 = this.addPlat(1680,2500,"plat",1).setOrigin(0.5, 0).setScale(2.5);
        this.floor19 = this.addPlat(987,1200,"plat",0).setOrigin(0.5, 0).setScale(2.5);
        this.floor20 = this.addPlat(1680,450,"plat",0).setOrigin(0.5, 0).setScale(2.5);
        this.floor21 = this.addPlat(1700,1600,"plat",0).setOrigin(0.5, 0).setScale(2.5);

        // player
        this.player = new Teddy(this, w/2, 0,'teddy').setOrigin(0,1);
        this.cameras.main.startFollow(this.player);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key:"left",
            frames: this.anims.generateFrameNumbers('player',
                {frames: [2,3]}),
            frameRate:5,
            repeat:-1
        });
        this.anims.create({
            key:"right",
            frames: this.anims.generateFrameNumbers('player',
                {frames: [1,0]}),
            frameRate:5,
            repeat: -1
        });
        this.anims.create({
            key:"front",
            frames: this.anims.generateFrameNumbers('teddy'),
            frameRate:5,
            repeat: -1
        })

        // controls
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //minor settings
        this.gameOver = false;
        this.count = 0;

        // collisions
        this.door.body.allowGravity = false;
        this.door2.body.allowGravity = false;
        this.door3.body.allowGravity = false;
        this.physics.add.overlap(this.player,this.door,this.open,null,this);
        this.physics.add.overlap(this.player,this.door2,this.open,null,this);
        this.physics.add.overlap(this.player,this.door3,this.open,null,this);
        this.physics.add.collider(this.player, this.floorGroup);
        this.physics.add.overlap(this.player,this.enemyGroup,this.crash,null,this);
        // music
        if(!musicOn) {
            music = this.sound.play('bgm2');
            music.setLoop(true);
            //music.play();
            musicOn = true;
            console.log("new7");
        }

    }
    update() {
        if(!this.gameOver) {
            this.player.update();
            if(this.count == 3) {
                this.scene.start("scene03");
                this.sound.get('bgm2').stop();
            }
        }
        if(this.gameOver) {
            this.scene.start("scene2");
        }
    }
    addPlat(width, height, pic, num) {
        this.name = this.physics.add.image(width, height, pic);
        this.name.setImmovable(true);
        this.name.body.allowGravity = false;
        this.floorGroup.add(this.name);
        if(num == 1) {
            this.addEnemy(width, height, "enemy");
        }
        return this.name;
    }
    addEnemy(width, height, pic) {
        this.name2 = new EvilTeddy(this, width, height, pic);
        this.enemyGroup.add(this.name2);
    }
    open(player, door) {
        if(keyF.isDown) {
            door.destroy();
            this.count++;
        }
    }
    crash(){
        this.gameOver = true;
        this.enemyGroup.runChildUpdate = false;
    }
}