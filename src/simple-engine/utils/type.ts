interface IBaseObject {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
}

export interface IImageObject extends IBaseObject {
    width: number;
    height: number;
    image: HTMLImageElement;
}

export interface IGameObject extends IBaseObject, IImageObject {
    vx: number;
    vy: number;
}

export interface IRectangleObject extends IBaseObject {
    width: number;
    height: number;
}

export interface ITextObject extends IBaseObject {
    text: string;
    value: number;
    align: CanvasTextAlign;
    fontStyle: string;
    fontSize: number;
    color: string;
}

export interface IButtonObject extends IBaseObject {
    width: number;
    height: number;
    text: string;
    textColor: string;
    backgroundColor: string;
    borderWidth: number;
    borderColor: string;
    fontSize: number;
    fontStyle: string;
}

export interface ISpriteSheetObject extends IImageObject {
    frameWidth: number;
    frameHeight: number;
    numColumns: number;
    numRows: number;
    radius: number;
}

export interface IBackgroundObject extends IImageObject {
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
