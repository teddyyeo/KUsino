
const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);
const product = ["1", "3", "1", "10", "1", "3", "1", "5", "1", "5", "3", "1", "10", "1", "3", "1", "5", "1", "3", "1", "20", "1", "3", "1", "5"];
const colors = [];
colors.push("rgb(1,67,156)");
for(var l=0; l<product.length+2; l++){
    if (product[l] == "1"){
        let r = 0xf2;
        let g = 0xc5;
        let b = 0x40;
        colors.push("rgb(" + r + "," + g + "," + b + ")");
    }
    if (product[l] == "3"){
        let r = 0x03;
        let g = 0x66;
        let b = 0x35;
        colors.push("rgb(" + r + "," + g + "," + b + ")");
    }
    if (product[l] == "5"){
        let r = 0x01;
        let g = 0x43;
        let b = 0x9c;
        colors.push("rgb(" + r + "," + g + "," + b + ")");
    }if (product[l] == "10"){
        let r = 0xfa;
        let g = 0x8e;
        let b = 0xe5;
        colors.push("rgb(" + r + "," + g + "," + b + ")");
    }if (product[l] == "20"){
        let r = 0x9b;
        let g = 0x11;
        let b = 0x1e;
        colors.push("rgb(" + r + "," + g + "," + b + ")");
    }
    
}
colors.push("rgb(1,67,156)");
colors.push("rgb(1,67,156)");
colors.push("rgb(1,67,156)");


function getRandomItems(arr, num) {
  const result = [];
  const length = arr.length;

  if (num > length) {
      throw new Error('Number of items to extract exceeds the array length');
  }

  while (result.length < num) {
      const randomIndex = Math.floor(Math.random() * length);
      if (result.indexOf(arr[randomIndex]) === -1) {
          result.push(arr[randomIndex]);
      }
  }

  return result;
}

let ans = getRandomItems(product, 1)[0];

const newMake = () => {
  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const arc = Math.PI / (product.length / 2);  
  for (let i = 0; i < product.length+1; i++) {
    ctx.beginPath();
    
    
    
    ctx.fillStyle = colors[i % (product.length)];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
    ctx.fill();
    ctx.closePath();
  }

  ctx.fillStyle = "#fff";
  ctx.font = "18px Pretendard";
  ctx.textAlign = "center";

  for (let i = 0; i < product.length+1; i++) {
    const angle = (arc * i) + (arc / 2);

    ctx.save();

    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50)
    );

    ctx.rotate(angle + Math.PI / 2);

    product[i].split(" ").forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j);
    });

    ctx.restore();
  }
}

function rotate(num){
  $c.style.transform = `initial`;
  $c.style.transition = `initial`;
  //const alpha = Math.floor(Math.random()*100);
  let ran;

  if (num==1){
    ran = getRandomItems([72, 95, 123], 1)[0];
  }
  if (num==3){
    ran = getRandomItems([350, 240, 60], 1)[0];
  }
  if (num==5){
    ran = getRandomItems([350, 240, 60], 1)[0];
  }
  if (num==10){
    ran = getRandomItems([135, 140, 270, 268], 1)[0];
  }
  if (num==20){
    ran = getRandomItems([28, 22, 30], 1)[0];
  }

  setTimeout(() => {    
    const rotate = 3600 + ran;
    $c.style.transform = `rotate(-${rotate}deg)`;
    $c.style.transition = `2s`;
    
  }, 1);
};

newMake();