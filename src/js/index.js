
import '../css/index.css';
let oC = document.getElementById('canvas');
let oL = document.querySelector('.layer');
let oTit = oL.children[0];
let oBtn = oL.children[1];

let cw = document.documentElement.clientWidth;
let ch = document.documentElement.clientHeight;

oC.width = cw;
oC.height = ch;

oC.style.width = cw + 'px';
oC.style.height = ch + 'px';


/**
 * 获取上下文开始画图
 */

let ctx = oC.getContext('2d');

const {width,height} = oC;
const R = 4,C = 4;
const block_w = width/C, block_h = height/R;
let data; //用于存放数据
let timer; //定时器
let speed; //速度
let top = -block_h;

/**
 * 创建数据
 * 数据格式   
 * [
 *  [0,0,1,0],
 *  [0,1,0,0],
 *  [1,0,0,0],
 *  [0,0,0,1]
 * ]
 */

function createData() {
    var arr = [];
    for (var i = 0; i < C; i ++) {
        arr[i] = 0;
    }
    arr[Math.floor(Math.random() * C)] = 1;
    return arr;
}

/**
 * 画图
 */

function draw() {
    ctx.clearRect(0,0,width,height);
    for (var r = 0; r < data.length; r ++) {
        for (var c = 0; c < data[r].length; c ++) {
            if (data[r][c] == 0) {
                ctx.fillStyle = '#fff';
            } else {
                ctx.fillStyle = '#000';
            }
            ctx.fillRect(c * block_w,top + r * block_h,block_w,block_h);
            ctx.strokeStyle = '#999';
            ctx.strokeRect(c * block_w,top + r * block_h,block_w,block_h);
        }
    }
}
// initGame();

function initGame() {
    speed = 1;
    top = -block_h;
    data = [];
    for (var i = 0; i < R + 1; i ++) {
        data.push(createData());
    }
    draw();
    timer = setInterval(function () {
        top += speed;
        console.log(top);
        if (top >= 0) {
            let rArr = data.pop();
            data.unshift(createData());
            top = -block_h;
            if (rArr.includes(1)) {
                clearInterval(timer);
                over();
            }
        }
        draw();
    },20);
}

oC.addEventListener('touchstart',function(ev) {
    let x = ev.targetTouches[0].clientX;
    let y = ev.targetTouches[0].clientY - top;

    let tr = Math.floor(y/block_h);
    let tc = Math.floor(x/block_w);

    if (data[tr][tc] == 0) {
        clearInterval(timer);
        over();
    } else {
        data[tr][tc] = 0;
        speed += 0.2;
    }
    draw();
    ev.preventDefault();
},false);

oBtn.onclick = function() {
    oL.style.display = 'none';
    initGame();
}
function over() {
    oL.style.display = 'block';
    oTit.innerHTML = 'GAME OVER';
    oBtn.innerHTML = '再来一局';
}