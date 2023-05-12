import { Application, Container, Sprite, Texture } from 'pixi.js'
import { Chicken } from './chicken';
import { Egg } from './egg';
import * as TWEEN from '@tweenjs/tween.js'

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
	
	let egg = new Egg();
	
	egg.x =  chick.x = e.globalX;
	egg.y =  chick.y = e.globalY;
	egg.y +=30;
	egg.x +=30;

	egg.width = 0.3;
	egg.height = 0.3;
	egg.anchor.x = 0.5;
	egg.anchor.y = 0.5;

	under.addChild(egg);
	//eggCount+=1;


});


window.addEventListener("resize",()=>{
	app.renderer.resize(window.innerWidth,window.innerHeight)
})


animate()

function animate() {
	requestAnimationFrame(animate)
	// [...]
	TWEEN.update()
	// [...]
}