import { ImageObject } from "../simple-engine/objects/ImageObject";
import { Renderer } from "../simple-engine/renderer/Renderer";
import { IBackgroundObject } from "../simple-engine/utils/type";

export class Background extends ImageObject {
    static sprite: HTMLImageElement;
    background: IBackgroundObject;
    renderer: Renderer;

    constructor(background: IBackgroundObject) {
        super(background);
        this.renderer = new Renderer();
        this.background = background;
    }

    update() {
        if (this.background.x < 0) this.background.x = this.background.width;
        this.background.x -= this.background.speed;
    }

    render() {
        this.renderer.backgroundRenderer(this.background);
    }
}
