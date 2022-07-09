const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// diffrent elements for html canvas element
// html canvas is a vasst concept used for gaming drawing graphics animation and etc

ctx.strokeStyle = '#BADA55'; //it is a color
ctx.lineJoin = 'round'; // how a line ends MDN check for props
ctx.lineCap = 'round'; //when a line joins a another line what shape it should form
ctx.lineWidth = 100;
let isDrawing = false; // to know the state i.e when the mouse is down and not up then true;//flag

// ctx.globalCompositeOperation = 'multiply';// special feature for blend got to mdn doc for more info


let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return;


    ctx.beginPath();
    ctx.strokeStyle = `hsl(${hue},100%,50%)`;

    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >= 361) {
        hue = 0;
    }
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;

    } else {
        ctx.lineWidth--;

    }
    console.log(ctx.lineWidth);
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
}); //use multiple statement in form of block
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);