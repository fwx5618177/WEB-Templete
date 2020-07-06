

/*          *粒子化类构造
              *类功能：
              *1.初始化。创建画布，规定粒子属性等；
              *2.创建图像并且进行绘制 
              *3.区域颜色定义
              *4.粒子移动和偏射角度*/

class Particle {
  // 构造器()
  constructor(canvas, options) {
    let random = Math.random();
    this.canvas = canvas;
    // 在画布里的x坐标
    this.x = options.x;
    // 在画布里的y坐标
    this.y = options.y;
    // 取随机数的1/2，对角度进行随机放大
    this.s = 0.5 + Math.random();
    // this.s = 1 + Math.random();
    // 粒子运动的变化角度
    this.a = 0;
    // 宽度
    this.w = $(window).width();
    // 高度
    this.h = $(window).height();
    // 半径
    this.radius = options.radius || 0.5 + Math.random() * 10;
    // 颜色
    this.color = options.color || "#E5483F";

    // 指定3秒后调用；
    // 如果粒子的半径大于0.5,加入新的粒子。
    setTimeout(function () {
      if (this.radius > 0.5) {
        particles.push(
        new Particle(canvas, {
          x: this.x,
          y: this.y,
          color: this.radius / 2 > 1 ? "#d6433b" : "#FFFFFF",
          radius: this.radius / 2.2 }));


      }
    }.bind(this), 3000);
  }

  // 创建图像,并且绘制
  render() {
    //从(0,0)开始新的路径；
    this.canvas.beginPath();
    // 创建曲线弧
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    // 绘图的线条宽度
    this.canvas.lineWidth = 2;
    //颜色填充 
    this.canvas.fillStyle = this.color;
    // 填充当前图像的路径
    this.canvas.fill();
    // 返回初始点,并且绘制线条到初始位置
    this.canvas.closePath();
  }

  // 左右区域颜色定义
  swapColor() {
    // 排除白色
    if (this.color != "#FFFFFF") {
      // 判断左右界面,并且赋颜色的值
      if (this.x < this.w / 2) {
        // 左半边
        this.color = "#36fcfa";
      } else {
        // 右半边
        this.color = "#E5483F";
      }
    }
  }

  // 粒子移动
  move() {
    // 颜色定义
    this.swapColor();

    // 横坐标按照cos角度进行变换，并且对其进行随机数放大；
    // 偏射角度以便两个半界分开
    this.x += Math.cos(this.a) * this.s;
    this.y += Math.sin(this.a) * this.s;

    // this.y += Math.cos(this.a) * this.s;
    // this.x += Math.sin(this.a) * this.s;
    // 在变化后，对随机角度进行再重取；
    this.a += Math.random() * 0.8 - 0.4;

    // 判断全为0，粒子横坐标无移动；
    if (this.x < 0 || this.x > this.w - this.radius) {
      return false;
    }
    // 粒子纵坐标无移动；
    if (this.y < 0 || this.y > this.h - this.radius) {
      return false;
    }

    // 重新绘制图像
    this.render();

    return true;
  }

}



let particles = [];
let frequency = 50;
// Popolate particles
setInterval(
  function () {
    popolate();
  }.bind(this),
  frequency
);


//在body里添加canvas画板
//画板与界面宽高相等
let tela = document.createElement('canvas');
tela.width = $(window).width();
tela.height = $(window).height();

// body下添加canvas
$("body").append(tela);

//返回绘图坐标环境
let canvas = tela.getContext('2d');


/*
      * Function to clear layer canvas
      * @num:number number of particles
      */
function popolate() {
  particles.push(
  new Particle(canvas, {
    x: $(window).width() / 2,
    y: $(window).height() / 2 }));


  return particles.length;
}

// 图像填充和透明度设置；
function clear() {
  // 透明度
  canvas.globalAlpha = 0.04;
  canvas.fillStyle = '#000042';
  canvas.fillRect(0, 0, tela.width, tela.height);
  canvas.globalAlpha = 1;
}

function update() {
  particles = particles.filter(function (p) {
    return p.move();
  });
  clear();
  requestAnimationFrame(update.bind(this));
}
update();