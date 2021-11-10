interface IAddedImage {
    name: string,
    url: string
}

interface ILoadedImage {
    name: string,
    src: HTMLImageElement
}

export class ImageLoader {
    images: ILoadedImage[] = [];
    constructor() {}

    load(addedImages: IAddedImage[]): ILoadedImage {
        addedImages.forEach((addedImage) => {
            const image = new Image();
            image.src = addedImage.url;
            image.onload = () => {
            }
            this.images.push({...addedImage, src: image});
        });
        return this.images[0];
    }

    getImage(imageName: string) {
        return this.images.find(image => image.name == imageName);
    }
}
