import { Sprite, Texture } from 'pixi.js'

export class Chicken extends Sprite {

    arrayofComponent = [

        {
            name: "mouth",
            path: "mouth",
            offset: {
                x: -140,
                y: -10
            },
            resource: Texture.EMPTY
        },
        {
            name: "left_foot",
            path: "foot",
            offset: {
                x: -30,
                y: 130
            },
            resource: Texture.EMPTY
        },
        {
            name: "right_foot",
            path: "foot",
            offset: {
                x: 30,
                y: 130
            },
            resource: Texture.EMPTY
        },
        {
            name: "body",
            path: "body",
            offset: {
                x: 0,
                y: 0
            },
            resource: Texture.EMPTY
        },
        {
            name: "eye",
            path: "eye",
            offset: {
                x: -20,
                y: -30
            },
            resource: Texture.EMPTY
        },

    ]
    box: Array<Sprite> = [];
    leftUp = true;
    rightUp = false;
    otherText: Array<{ name: string, path: string, resource: Texture }> = [
        {
            name: "eye",
            path: "eye_close",
            resource: Texture.EMPTY,
        },

        {
            name: "mouth",
            path: "mouth_open",
            resource: Texture.EMPTY,
        }
    ]
    constructor() {
        super();
        this.arrayofComponent.forEach(item => {
            let texture = Texture.from(`./assets/images/chicken/${item.path}.png`);
            let part = Sprite.from(texture);
            part.anchor.set(0.5);
            part.x = item.offset?.x || 0;
            part.y = item.offset?.y || 0;
            part.name = item.name;
            item.resource = texture;
            this.addChild(part);
        });
        this.otherText.forEach(item => {
            let text = Texture.from(`./assets/images/chicken/${item.path}.png`);
            item.resource = text;
        })
        this.play();


    }

    play() {
        let leftLeg = this.getChildByName("left_foot") || { y: 0 };
        let rightLeg = this.getChildByName("right_foot") || { y: 0 };


        setInterval(() => {
           

            leftLeg.y = this.leftUp ? 100 : 130;
            this.leftUp = !this.leftUp;


            rightLeg.y = this.rightUp ? 100 : 130;
            this.rightUp = !this.rightUp;


        }, 200);
    }
    timeout: NodeJS.Timeout | null = null;
    happy() {



        let r_eye = this.otherText.find(p => p.name == "eye");
        let r_mouth = this.otherText.find(p => p.name == "mouth");
        let eye_el = (this.getChildByName("eye") as Sprite);
        let mouth_el = (this.getChildByName("mouth") as Sprite)
        if (r_eye != null)
            eye_el.texture = r_eye.resource;
        if (r_mouth != null)
            mouth_el.texture = r_mouth.resource;




        if (!!this.timeout)
            clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            let n_eye = this.arrayofComponent.find(p => p.name == "eye");
            let n_mouth = this.arrayofComponent.find(p => p.name == "mouth");
            if (n_eye != null)
                eye_el.texture = n_eye.resource;
            if (n_mouth != null)
                mouth_el.texture = n_mouth.resource;

        }, 200)
    }
 

}