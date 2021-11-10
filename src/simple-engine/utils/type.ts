export interface IGameObject {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export interface IRectangleObject {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ITextObject {
    context: CanvasRenderingContext2D;
    text: string;
    x: number;
    y: number;
    value: number;
}

export interface IBackgroundRenderer {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
}

export interface IAnimationObjectRenderer {
    x: number;
    y: number;
    radius: number;
}

export interface ISpriteSheet {
    image: HTMLImageElement;
    frameWidth: number;
    frameHeight: number;
}

export interface IFrame {
    width: number;
    height: number;
}
