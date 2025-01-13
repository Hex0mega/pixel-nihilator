
export default class Game {
    private ctx: CanvasRenderingContext2D;
    private color = "red";
    private size = 10;
    private step = 2;
    private pixelX = 0;
    private pixelY = 0;
    private right = false;
    private left = false;
    private up = false;
    private down = false;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.pixelX = this.ctx.canvas.width / 2;
        this.pixelY = this.ctx.canvas.height / 2;
        console.log(this.pixelX);
        console.log(this.pixelY);
        window.addEventListener("resize", () => this.resize());
        requestAnimationFrame(() => {
            this.draw();
        })

        window.addEventListener("keydown", (event) => this.keyDownHandler(event));
        window.addEventListener("keyup", (event) => this.keyUpHandler(event));
        this.resize();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // console.log("drawing");
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(
            1,
            1,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
        this.drawPixel();
        requestAnimationFrame(() => {
            this.draw();
        })
        //4 directional movement
        if (this.up) {
            this.pixelY -= this.step;
        }
        if (this.down) {
            this.pixelY += this.step;
        }
        if (this.right) {
            this.pixelX += this.step;
        }
        if (this.left) {
            this.pixelX -= this.step;
        }

    }

    resize() {
        const boundingBox = this.ctx.canvas.parentElement!.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio;
        this.ctx.canvas.width = boundingBox.width * pixelRatio;
        this.ctx.canvas.height = boundingBox.height * pixelRatio;
        this.ctx.canvas.style.width = `${boundingBox.width}px`;
        this.ctx.canvas.style.height = `${boundingBox.height}px`;
    }

    reset() {
        this.pixelX = this.ctx.canvas.width / 2;
        this.pixelY = this.ctx.canvas.height / 2;
    }

    drawPixel(): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.pixelX, this.pixelY, this.size, this.size);
        this.ctx.closePath();
    }

    drawLevel(): void {
        console.log("drawLevel");
    }

    pixelkillCounter(): void {
        console.log("pixelKillCounter");
    }

    keyDownHandler(event: KeyboardEvent) {
        switch (event.key) {
            case "w": //up
                this.up = true;
                this.drawPixel();
                break;
            case "s": //down
                this.down = true;
                this.drawPixel();
                break;
            case "a": //left
                this.left = true;
                this.drawPixel();
                break;
            case "d": //right
                this.right = true;
                this.drawPixel();
                break;
            default:
                break;
        }
    }

    keyUpHandler(event: KeyboardEvent) {
        switch (event.key) {
            case "w": //up
                this.up = false;
                this.drawPixel();
                break;
            case "s": //down
                this.down = false;
                this.drawPixel();
                break;
            case "a"://left
                this.left = false;
                this.drawPixel();
                break;
            case "d": //right
                this.right = false;
                this.drawPixel();
                break;
            default:
                break;
        }
    }
}

