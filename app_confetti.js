(function () {
  const NombreConfetti = 350;
  const colorConfetti = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];
  const PI_2 = 2 * Math.PI;
  let directionConfetti = 0.5;
  
  const canvas = document.getElementById("world");
  const acceuil = document.getElementById("acceuil");
   
  const ctx = canvas.getContext("2d");
  
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = 800;
  window.addEventListener('resize', () =>{
    w = canvas.width = window.innerWidth;
    h = canvas.height = 800;
  })


  document.onmousemove = function (e) {
    return directionConfetti = e.pageX / w;
  };
  
  const range = (a, b) => {
    return (b - a) * Math.random() + a;
  };
   
    
  window.requestAnimationFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };

  }();

  
  const drawCircle = (x, y, r, style) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, PI_2, false);
    ctx.fillStyle = style;
    return ctx.fill();
  };
    
  class Confetti {
    constructor() {
      this.style = colorConfetti[~~range(0, 5)];
      this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }
    
    replace() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * directionConfetti - 5;
      return this.vy = 0.7 * this.r + range(-1, 1);
    }
    
    draw() {
      var ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!(0 < (ref = this.x) && ref < this.xmax)) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
    }};
  
  
  
  const confetti = function () {      
    const ArrayPopulationConfetti = [];
    for (let i = 1;  i <= NombreConfetti ;++i) {
      ArrayPopulationConfetti.push(new Confetti());
    }
    return ArrayPopulationConfetti;
  }();

    
  
  window.step = () =>{
    requestAnimationFrame(step);
    ctx.clearRect(0, 0, w, h);
    const dessinPopConfetti = [];
    for (let i = 0; i < confetti.length; i++) {
      dessinPopConfetti.push(confetti[i].draw());
    }
    return dessinPopConfetti;
  };

  step();
  
}).call(this);
  
  
  