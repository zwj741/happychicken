import { Sprite } from 'pixi.js'

export class Chicken extends Sprite {

    arrayofComponent = [

        {
            name: "mouth",
            path: "mouth",
            offset: {
                x: -140,
                y: -10
            }
        },
        {
            name: "left_foot",
            path: "foot",
            offset: {
                x: -30,
                y: 130
            }
        },
        {
            name: "right_foot",
            path: "foot",
            offset: {
                x: 30,
                y: 130
            }
        },
        {
            name: "body",
            path: "body",
            offset: {
                x: 0,
                y: 0
            }
        },
        {
            name: "eye",
            path: "eye",
            offset: {
                x: -20,
                y: -30
            }
        },

    ]
    box: Array<Sprite> = [];
    leftUp = true;
    rightUp = false;

    constructor() {
        super();
        this.arrayofComponent.forEach(item => {
            let part = Sprite.from(`./assets/images/chicken/${item.path}.png`);
            part.anchor.set(0.5);
            part.x = item.offset?.x || 0;
            part.y = item.offset?.y || 0;
            part.name = item.name;
            this.addChild(part);
        });

        this.play();


    }

    play() {


        setInterval(() => {
            let leftLeg = this.getChildByName("left_foot") ||  {y:0};
            let rightLeg = this.getChildByName("right_foot") ||  {y:0};

            leftLeg.y = this.leftUp ? 100 : 130;
            this.leftUp = !this.leftUp;


            rightLeg.y = this.rightUp ? 100 : 130;
            this.rightUp = !this.rightUp;


        }, 200);
    }


}