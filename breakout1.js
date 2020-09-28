const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

//css
canvas.setAttribute('style', 'display:block;margin:auto; background-color: #ddd');

document.body.appendChild(canvas);

//ゲームに必要な要素を作る
const ball = {
    x: null,
    y: null,
    width: 5,
    height: 5,
    speed: 4,
    dx: null,
    dy: null,

    update: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();

        //かべに当たったら跳ね返る
        if(this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if(this.y < 0 || this.y > canvas.height) this.dy *= -1;

        this.x += this.dx;
        this.y += this.dy;
    }
}
const paddle = {
    x: null,
    y: null,
    width: 100,
    height: 15,
    speed: 0,

    update: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();

        this.x += this.speed;
    }
}
const block = {
    width: null,
    height: 20,
    data: [],

    update: function() {
        this.data.forEach(brick => {
            ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
            ctx.stroke();
        })
    }
}
const level = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
]

//初期化処理
const init = () => {
    paddle.x = canvas.width / 2 - paddle.width / 2; //ゲーム開始時の初期値、真ん中
    paddle.y = canvas.height - paddle.height;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2 + 50;
    ball.dx = ball.speed;
    ball.dy = ball.speed;

    block.width = canvas.width / level[0].length;

    for(let i=0; i<level.length; i++) {
        for(let j=0; j<level[i].length; j++) {
            if(level[i][j]) {
                block.data.push({
                    x: block.width * j,
                    y: block.height * i,
                    width: block.width,
                    height: block.height
                })
            }
        }
    }
}

//当たり判定
const collide = (obj1, obj2) => {
    return obj1.x < obj2.x + obj2.width &&
        obj2.x < obj1.x + obj1.width && 
        obj1.y < obj2.y + obj2.height &&
        obj2.y < obj1.y + obj1.height;
}

//ループ処理
const loop = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height); //clearRect() 指定した範囲の描画を削除する

    paddle.update();
    ball.update();
    block.update();

    if(collide(ball, paddle)) {
        ball.dy *= -1;
        ball.y = paddle.y - ball.height;
    }

    block.data.forEach((brick, index) => {
        if(collide(ball, brick)) {
            ball.dy *= -1;
            block.data.splice(index, 1);
        }
    })

    window.requestAnimationFrame(loop); //ブラウザの適切なタイミングで繰り返し処理を実行できる
}

init();
loop();

document.addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft') paddle.speed = -6;
    if(e.key === 'ArrowRight') paddle.speed = 6;
});
document.addEventListener('keyup', () => paddle.speed = 0);
