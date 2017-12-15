
import '../css/index.css';
/**
 * 封装踩黑块游戏
 * option {object}   配置参数
 *      rows {number}  定义块的行数
 *      column {number} 定义块的列数
 *      speed  {number} 定义初始的速度   建议1-5之间
*/

class blockGame {
    constructor(option) {
        this.option = option || {};
        /**
         * 获取元素
         */
        this.oC = document.getElementById('canvas');
        this.oL = document.querySelector('.layer');
        this.oTit = this.oL.children[0];
        this.oBtn = this.oL.children[1];
        /**
         * 获取屏幕宽高
         */
        this.cw = document.documentElement.clientWidth;
        this.ch = document.documentElement.clientHeight;
        this.ready();
        /**
         * 获取画图上下文
         * 获取画布的宽高
         */
        this.ctx = this.oC.getContext('2d');
        const {width,height} = this.oC;
        this.width = width;
        this.height = height;
        
        /**
         * 定义块的行数和列数
         */
        this.R = this.option.rows || 4;
        this.C = this.option.column || 4;
        /**
         * 计算小块的宽高
         */
        this.block_w = this.width/this.C; 
        this.block_h = this.height/this.R;
        /**
         * 定义一些辅助数据
         *    data    用于存放数据
         *    timer   用于定时器
         *    speed   块的滚动速度   默认为1
         *    top     定义上面的距离    用于滚动的时候看起来是连续的
         */
        this.data = [];
        this.timer = null;
        this.speed = this.option.speed || 1;
        this.top = -this.block_h;
        this.bind();
    }
    ready() {
        this.oC.width = this.cw;
        this.oC.height = this.ch;

        this.oC.style.width = this.cw + 'px';
        this.oC.style.height = this.ch + 'px';
    }
    createData() {
        var arr = [];
        for (var i = 0; i < this.C; i ++) {
            arr[i] = 0;
        }
        arr[Math.floor(Math.random() * this.C)] = 1;
        return arr;
    }
    /**
     * 画图方法
     */
    draw() {
        var _this = this;
        this.ctx.clearRect(0,0,_this.width,_this.height);
        for (var r = 0; r < _this.data.length; r ++) {
            for (var c = 0; c < _this.data[r].length; c ++) {
                if (_this.data[r][c] == 0) {
                    _this.ctx.fillStyle = '#fff';
                } else {
                    _this.ctx.fillStyle = '#000';
                }
                _this.ctx.fillRect(c * _this.block_w,_this.top + r * _this.block_h,_this.block_w,_this.block_h);
                _this.ctx.strokeStyle = '#999';
                _this.ctx.strokeRect(c * _this.block_w,_this.top + r * _this.block_h,_this.block_w,_this.block_h);
            }
        }
    }
    initGame() {
        var _this = this;
        this.speed = this.option.speed || 1;
        this.top = -this.block_h;
        this.data = [];
        for (var i = 0; i < this.R + 1; i ++) {
            this.data.push(this.createData());
        }
        this.draw();
        this.timer = setInterval(() => {
            this.top += this.speed;
            if (this.top >= 0) {
                let rArr = this.data.pop();
                this.data.unshift(this.createData());
                this.top = -this.block_h;
                if (rArr.includes(1)) {
                    clearInterval(_this.timer);
                    this.over();
                }
            }
            this.draw();
        },20);
    }
    over() {
        this.oL.style.display = 'block';
        this.oTit.innerHTML = 'GAME OVER';
        this.oBtn.innerHTML = '再来一局';
    }
    bind() {
        var _this = this;
        this.oC.addEventListener('touchstart',function(ev) {
            let x = ev.targetTouches[0].clientX;
            let y = ev.targetTouches[0].clientY - _this.top;
        
            let tr = Math.floor(y/_this.block_h);
            let tc = Math.floor(x/_this.block_w);
        
            if (_this.data[tr][tc] == 0) {
                clearInterval(_this.timer);
                _this.over();
            } else {
                _this.data[tr][tc] = 0;
                _this.speed += 0.2;
            }
            _this.draw();
            ev.preventDefault();
        },false);
        
        this.oBtn.onclick = function() {
            _this.oL.style.display = 'none';
            _this.initGame();
        }
    }
}
new blockGame();