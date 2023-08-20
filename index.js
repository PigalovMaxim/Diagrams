const canvas = document.getElementById('canvas');

class Diagrams {
  #canvas;
  #size;
  #bgColor;
  #data = [];
  #ctx;
  #colors = ["#EB5757", "#F2994A", "#6FCF97", "#9B51E0", "#2F80ED", "#56CCF2", "#219653", "#F2C94C"];

  constructor({ canvas, size = 500, bgColor = 'black' }) {
    this.#data = this.#generateChartData();
    this.#canvas = canvas;
    this.#bgColor = bgColor;
    this.#size = size;
  }

  #generateChartData() {
    const data = [];
    const total = 100;
    let remaining = total;

    for (let i = 1; i <= Math.floor(Math.random() * 9) + 1; i++) {
      const percent = Math.floor(Math.random() * (remaining - 1) + 1);
      const radius = Math.floor(Math.random() * (100 - 50) + 50);

      data.push({
        percent: percent,
        radius: radius,
      });

      remaining -= percent;
    }

    data[data.length - 1].percent += remaining;
    return data;
  }

  init() {
    this.#canvas.width = this.#size;
    this.#canvas.height = this.#size;
    this.#ctx = this.#canvas.getContext('2d');
    this.#ctx.fillStyle = this.#bgColor;
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  draw(index = 0, _startAngle = 0) {
    const centerX = this.#size / 2;
    const centerY = this.#size / 2;
    if (index >= this.#data.length) {
      this.#ctx.beginPath();
      this.#ctx.fillStyle = this.#bgColor;
      this.#ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
      this.#ctx.fill();
      return;
    }
    const current = this.#data[index];
    const radius = current.radius;
    const startAngle = _startAngle;
    const endAngle = startAngle + (current.percent / 100) * Math.PI * 2;
    this.#ctx.beginPath();
    this.#ctx.moveTo(centerX, centerY);
    this.#ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    this.#ctx.closePath();
    this.#ctx.fillStyle = this.#colors[index];
    this.#ctx.fill();
    this.draw(index + 1, endAngle);
  }

  onClick() {
    this.init();
    this.#data = this.#generateChartData();
    this.draw();
  }
}

const diagrams = new Diagrams({ canvas });
diagrams.init();
diagrams.draw();

canvas.addEventListener('click', e => {
  diagrams.onClick();
});
