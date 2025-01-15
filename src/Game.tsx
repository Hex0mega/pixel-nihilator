
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
    private speed = 2;
    private projectiles: Array<{ x: number, y: number, size: number, color: string }> = [];

    //pixels to destroy
    private eColor = "cyan";
    private enemies: Array<{ x: number, y: number, size: number, color: string }> = [];
    private enemyCount = 100;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.pixelX = this.ctx.canvas.width / 2;
        this.pixelY = this.ctx.canvas.height / 2;
        this.addEnemies();

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
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(1, 1, this.ctx.canvas.width, this.ctx.canvas.height);

        this.drawLevel();
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

    addEnemies() {
        for (let i = 0; i < this.enemyCount; i++) {
            this.enemies.push({ x: Math.random() * this.ctx.canvas.width, y: Math.random() * this.ctx.canvas.height, size: this.size, color: this.eColor });
        }
    }

    reset() {
        this.pixelX = this.ctx.canvas.width / 2;
        this.pixelY = this.ctx.canvas.height / 2;
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
            projectile.y -= this.speed;
            this.ctx.fillRect(projectile.x, projectile.y, this.size, this.size);
            //remove projectile once it's off screen
            if (projectile.y < 0) {
                this.projectiles.splice(index, 1);
            }
        })
    }

    private drawLevel(): void {
        this.enemies.forEach((enemy) => {
            this.ctx.fillStyle = this.eColor;
            this.ctx.fillRect(enemy.x, enemy.y, this.size, this.size);
        })
    }

    private pixelkillCounter(): void {
        console.log("pixelKillCounter");
    }

    private keyDownHandler(event: KeyboardEvent) {
        console.log(event.code);
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

