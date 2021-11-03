import { GameObject } from "./GameObject";
import { IGameObject } from "./type";

export class Popup{
    context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context
    }

    render() {
        this.context.beginPath();
        this.context.rect(250, 100, 190, 100); 
        this.context.fillStyle = '#FFFFFF'; 
        this.context.fillStyle = 'rgba(225,225,225,0.5)';
        this.context.fillRect(25,72,32,32);
        this.context.fill(); 
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#000000'; 
        this.context.stroke();
        this.context.closePath();
        this.context.font = '24pt Kremlin Pro Web';
        this.context.fillStyle = '#000000';
        this.context.fillText('Restart', 345, 165);
    }
}

