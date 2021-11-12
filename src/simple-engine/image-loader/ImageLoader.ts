interface IAddedImage {
    name: string;
    url: string;
}

interface ILoadedImage {
    name: string;
    src: HTMLImageElement;
}

export class ImageLoader {
    static images: ILoadedImage[] = [];
    constructor() {}

    static load(addedImages: IAddedImage[]) {
        addedImages.forEach((addedImage) => {
            const image = new Image();
            image.src = addedImage.url;
            this.images.push({ ...addedImage, src: image });
        });
    }

    static getImage(imageName: string) {
        return this.images.find((image) => image.name == imageName)
    }
}
