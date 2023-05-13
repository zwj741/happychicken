import { Sprite, Texture } from "pixi.js";
import { Tween } from '@tweenjs/tween.js'



export class Egg extends Sprite {

    egg_normal: Texture
    egg_broken: Texture
    birthEvent:Array<Function> = [];
    constructor() {
        super();
        this.egg_normal = Texture.from(`./assets/images/egg/egg.png`);
        this.egg_broken = Texture.from(`./assets/images/egg/egg_broken.png`);
        let part = Sprite.from(this.egg_normal)
        part.anchor.x = 0.5;
        part.anchor.y = 0.5;
        this.addChild(part);

        this.play();
    }

    play() {
        setTimeout(() => {

            //(this.getChildAt(0) as Sprite).texture =
            // let part = Sprite.from(`./assets/images/egg/egg_broken.png`);
            // part.anchor.x = 0.5;
            // part.anchor.y = 0.5;
            //this.addChild(part);
            //this.removeChildAt(0);
            (this.getChildAt(0) as Sprite).texture = this.egg_broken;
            this.shake();

        }, 2000);
    }

    shake() {

        let tweena = new Tween(this).to({
            rotation: -0.3
        }, 200);
        let tweenb = new Tween(this).to({
            rotation: 0.3
        }, 200);
        let tweenc = new Tween(this).to({
            rotation: 0
        }, 200).onComplete(()=>{
            this.birthEvent.forEach(p=>p());
        });

        tweena.chain(tweenb.chain(tweenc)).start();


    }
    
    onBirth(callback:Function)
    {
        this.birthEvent.push(  callback  );
    }


}

