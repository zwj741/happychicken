import { Sprite } from "pixi.js";
import {Tween} from '@tweenjs/tween.js'

export class Egg extends Sprite {
    constructor() {
        super();
        let part = Sprite.from(`./assets/images/egg/egg.png`);
        part.anchor.x = 0.5;
        part.anchor.y = 0.5;
        this.addChild(part);
        this.play();
    }

    play()
    {
        setTimeout(()=>{
            let part = Sprite.from(`./assets/images/egg/egg_broken.png`);
            part.anchor.x = 0.5;
            part.anchor.y = 0.5;
            this.addChild(part);
            this.removeChildAt(0);

            this.shake();
            
        },1000);
    }

    shake()
    {

      let tweena = new Tween(this).to({
            rotation:-0.3
        },200);
        let tweenb =  new Tween(this).to({
            rotation:0.3
        },200);
        let tweenc = new Tween(this).to({
            rotation:0
        },200)
        
        tweena.chain(tweenb.chain(tweenc)).start();
    
 
      //  let item = this.getChildAt(0);
    
    }
}

