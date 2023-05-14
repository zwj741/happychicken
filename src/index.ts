import { Application, BlurFilter, Container, Graphics, Point, Sprite, Texture } from 'pixi.js'
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

let bg_text = Texture.from("./assets/images/bg.jpg")
let bg = new Sprite(bg_text);
let bg_image = new Sprite(bg_text);
let under = new Container();
let over = new Container();
let chick = new Chicken();
let pi = Sound.from(`./assets/music/fangpi.m4a`);
let tween = Sound.from(`./assets/music/wakeup.m4a`);
var blurFilter1 = new BlurFilter(20);

bg_image.anchor.set(0.5)


bg_image.x =  chick.x = app.screen.width / 2;
bg_image.y = chick.y = app.screen.height / 2;
chick.width = 0.3
chick.height = 0.3


bg.interactive = true;
bg.width = app.screen.width 
bg.height = app.screen.height
bg.filters = [blurFilter1];

app.stage.addChild(under);
app.stage.addChild(over);
under.addChild(bg);
under.addChild(bg_image)
over.addChild(chick);


bg.addEventListener("pointerdown", function (e) {
	pi.play();

	let egg = new Egg();
	
	egg.x =  chick.x = e.globalX;
	egg.y =  chick.y = e.globalY - 20 ;
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
			tween.play();
			
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
	app.renderer.resize(window.innerWidth,window.innerHeight);
	bg.width = window.innerWidth
	bg.height = window.innerHeight;
	bg_image.x =  chick.x = app.screen.width / 2;
	bg_image.y = chick.y = app.screen.height / 2;
})
let bgm = Sound.from(`./assets/music/bg.m4a`);
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



// function background(bgSize:Point, inputSprite:Sprite, type:"cover"|"default", forceSize:Point|null) {
//     var sprite = inputSprite;
//     var bgContainer = new Container();
//     var mask = new Graphics().beginFill(0x000000).drawRect(0,0, bgSize.x, bgSize.y).endFill();
//     bgContainer.mask = mask;
//     bgContainer.addChild(mask);
//     bgContainer.addChild(sprite);
//     function resize() {
//         var sp = {x:sprite.width,y:sprite.height};
//         if(forceSize) sp = forceSize;
//         var winratio = bgSize.x/bgSize.y;
//         var spratio = sp.x/sp.y;
//         var scale = 1;
//         var pos = new Point(0,0);
// 		console.log(sp)
//         if(type == 'cover' ? (winratio > spratio) : (winratio < spratio)) {
//             //photo is wider than background
//             scale = bgSize.x/sp.x;
//             pos.y = -((sp.y*scale)-bgSize.y)/2
//         } else {
//             //photo is taller than background
//             scale = bgSize.y/sp.y;
//             pos.x = -((sp.x*scale)-bgSize.x)/2
//         }

//         sprite.scale = new Point(scale,scale);
//         sprite.position = pos;
//     }
    
//     resize();

//     return {
//         container: bgContainer,
//         doResize: resize
//     }
// }