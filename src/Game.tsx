
export default class Game {
    private ctx: CanvasRenderingContext2D;
    //pixel info
    private color = "black";
    private size = 10;
    private step = 2;
    private pixelX = 0;
    private pixelY = 0;
    private right = false;
    private left = false;
    private up = false;
    private down = false;
    private space = false;

    //projectile info
    private pColor = "red";
    private pSpeed = 1;
    private projectileX = 0;
    private projectileY = 0;
    private projectiles: Array<{ x: number, y: number, size: number, color: string }> = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.pixelX = this.ctx.canvas.width / 2;
        this.pixelY = this.ctx.canvas.height / 2;

        window.addEventListener("resize", () => this.resize());
        requestAnimationFrame(() => {
            this.draw();
        })

        window.addEventListener("keydown", (event) => this.keyDownHandler(event));
        window.addEventListener("keyup", (event) => this.keyUpHandler(event));
        this.resize();
    }

    private draw() {
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
        if (this.space) {
            this.drawProjectiles();
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

    addProjectile() {
        this.projectiles.push({ x: this.pixelX, y: this.pixelY, size: this.size, color: this.color });
    }

    reset() {
        this.pixelX = this.ctx.canvas.width / 2;
        this.pixelY = this.ctx.canvas.height / 2;
    }

    resetProjectile() {
        this.projectileX = this.pixelX;
        this.projectileY = this.pixelY;
    }

    private drawPixel(): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.pixelX, this.pixelY, this.size, this.size);
        this.ctx.closePath();
    }

    private drawProjectiles(): void {
        this.projectiles.forEach((projectile, index) => {
            this.ctx.fillStyle = this.pColor;
            projectile.y -= this.pSpeed;
            this.ctx.fillRect(projectile.x, projectile.y, this.size, this.size);
            //remove projectile once it's off screen
            if (projectile.y < 0) {
                this.projectiles.splice(index, 1);
            }
        })

    }

    private drawLevel(): void {
        console.log("drawLevel");
    }

    private pixelkillCounter(): void {
        console.log("pixelKillCounter");
    }

    private keyDownHandler(event: KeyboardEvent) {
        switch (event.code) {
            case "Space":
                this.space = true;
                this.addProjectile();
                this.drawProjectiles();
                break;
            case "KeyW": //up
                this.up = true;
                this.drawPixel();
                break;
            case "KeyS": //down
                this.down = true;
                this.drawPixel();
                break;
            case "KeyA": //left
                this.left = true;
                this.drawPixel();
                break;
            case "KeyD": //right
                this.right = true;
                this.drawPixel();
                break;
            default:
                break;
        }
    }

    private keyUpHandler(event: KeyboardEvent) {
        switch (event.code) {
            case "Space":
                this.space = true;
                this.addProjectile();
                this.drawProjectiles();
                break;
            case "KeyW": //up
                this.up = false;
                this.drawPixel();
                break;
            case "KeyS": //down
                this.down = false;
                this.drawPixel();
                break;
            case "KeyA"://left
                this.left = false;
                this.drawPixel();
                break;
            case "KeyD": //right
                this.right = false;
                this.drawPixel();
                break;
            default:
                break;
        }
    }
}

