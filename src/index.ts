import { Application, Container, Sprite, Texture } from 'pixi.js'
import { Chicken } from './chicken';
import { Egg } from './egg';
import {Tween,update} from '@tweenjs/tween.js'
import { Sound } from '@pixi/sound';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: window.innerWidth,
	height: window.innerHeight
});


//let eggCount = 0;
let bg = new Sprite(Texture.WHITE);
let under = new Container();
let over = new Container();
let chick = new Chicken();

chick.x = app.screen.width / 2;
chick.y = app.screen.height / 2;
chick.width = 0.3
chick.height = 0.3


bg.interactive = true;
bg.width = window.innerWidth
bg.height = window.innerHeight
bg.tint = 0x6495ed;

app.stage.addChild(under);
app.stage.addChild(over);

under.addChild(bg);
over.addChild(chick);


bg.addEventListener("pointerdown", function (e) {
	Sound.from(`./assets/music/fangpi.mp3`).play();

	let egg = new Egg();
	
	egg.x =  chick.x = e.globalX;
	egg.y =  chick.y = e.globalY;
	egg.x +=30;

	egg.width = 0.0;
	egg.height = 0.0;
	egg.anchor.x = 0.5;
	egg.anchor.y = 0.5;

	egg.onBirth(()=>{

		let chick_temp = new Chicken();
		chick_temp.x = egg.x
		chick_temp.y = egg.y
		chick_temp.height = chick_temp.width = 0;
		under.addChild(chick_temp);
		new Tween(egg).to({
			alpha :0
		},200) .onComplete(()=>{
			egg.destroy();
		}).start();

		new Tween(chick_temp).to({
			width:0.15,
			height:0.15
		},200).onComplete(()=>{

			new Tween(chick_temp).to({
				x:-20,
			
			},chick_temp.x / 0.2).onComplete(()=>{
				chick_temp.destroy();
			}).start();

			chick_temp.happy();
			chick_temp.tween();
			
		}).start();
	})
	under.addChild(egg);

	new Tween(egg).to({
		width:0.3,
		height:0.3,
		y:egg.y+50
	},200).start();

	chick.happy();

});


window.addEventListener("resize",()=>{
	app.renderer.resize(window.innerWidth,window.innerHeight)
})
let bgm = Sound.from(`./assets/music/bg.mp3`);
bgm.loop = true;
bgm.volume =0.5;
bgm.play();

animate()

function animate() {
	requestAnimationFrame(animate)
	// [...]
	update();
	// [...]
}