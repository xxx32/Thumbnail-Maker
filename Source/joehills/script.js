const bgInput = document.getElementById("bgInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const epNumSelector = document.getElementById("epNumSelector");
const hcLogoToggler = document.getElementById("hcLogoToggler");
const previewText = document.getElementById("preview-text");
const downloader = document.getElementById("downloader");

/*// Cookies Stuff
let epNumValueFromCookie;

downloader.addEventListener("click", () => {
  document.cookie = `epNumCookie=${epNumSelector.value}`;
});

if (document.cookie.length === 0) {
  epNumValueFromCookie = "";
} else {
  epNumValueFromCookie = document.cookie.split("=")[1];
  epNumSelector.value = Number(epNumValueFromCookie) + 1;
}
// End Cookies Stuff

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}
// End Service Worker*/

function addBgImage() {
  let bgImage = new Image();
  bgImage.addEventListener(
    "load",
    () => {
      ctx.drawImage(bgImage, 0, 0, 1920, 1080);
      hcLogo();
      episodeNum();
      captionWriter();
    },
    false
  );
  bgImage.src = URL.createObjectURL(bgInput.files[0]);
}

function episodeNum() {
  let epNum;
  if (epNumSelector.value.length === 0) {
    epNum = '';
  } else {epNum = '#' + epNumSelector.value}

  ctx.font = "normal 250px EdGothic";
  let epNumWidth = ctx.measureText(epNum).width;

  const theGradient = ctx.createLinearGradient(0, 816, 0, 1080);
  //theGradient.addColorStop(0, '#9a6105');
  //theGradient.addColorStop(1, '#a16d03');
  //theGradient.addColorStop(0, '#c6b90c');
  theGradient.addColorStop(0, '#a66c02');
  theGradient.addColorStop(0.5, '#caa205');
  theGradient.addColorStop(1, '#e9cd07');

  ctx.beginPath();
  ctx.moveTo(0,1080);
  ctx.lineTo(0, 798.5);
  ctx.lineTo(epNumWidth + 36.5, 816);
  ctx.lineTo(epNumWidth + 97, 1080);
  ctx.lineTo(0, 1080);

  ctx.fillStyle = theGradient;
  ctx.fill();
  ctx.beginPath();

  ctx.fillStyle = "#26150e";
  ctx.textBaseline = "top";

  ctx.fillText(epNum, 14, 840.5);
  ctx.fill();
}

function hcLogo() {
  if (hcLogoToggler.checked) {
    let hc7Logo = new Image();
    hc7Logo.addEventListener("load", () => {
      ctx.drawImage(hc7Logo, 28, 22, 1842.5, 236);
    });
    hc7Logo.src =
      "https://hermit-tools.github.io/Thumbnail-Maker/Resources/Hermitcraft Logos/HC7 Logo.png";
    hc7Logo.crossOrigin = "Anonymous";
  }
}

function captionWriter() {
  let captions = document.getElementsByClassName('caption');

  for (let i = 0; i < captions.length; i++) {
    let caption = captions[i].value;

    ctx.font = "normal 165px EdGothic";

    const lineHeight = ctx.measureText('|||||').width
    let line = caption.split(/\r?\n/);

    ctx.textBaseline = "top";

    ctx.strokeStyle = "#281604";
    ctx.lineWidth = 24.5;
    ctx.lineJoin = 'round';
    
    for (let i = 0; i < line.length; i++) {
      const theGradient = ctx.createLinearGradient(
        0, ctx.measureText('|>').width + i * lineHeight, 0, ctx.measureText('|||>').width + i * lineHeight);
      theGradient.addColorStop(0, '#ecd319');
      theGradient.addColorStop(1, '#9b4a06');
      ctx.fillStyle = theGradient;

      ctx.strokeText(line[i], 0, 0 + i * lineHeight);
      ctx.fillText(line[i], 0, 0 + i * lineHeight);
    }

    ctx.fill();
    ctx.stroke();
  }
}

function process() {
  //ctx.fillStyle = "#fff";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0,0,canvas.width,canvas.height)
  if (bgInput.files.length != 0) {
    addBgImage();
  } else {
    hcLogo();
    if (epNumSelector.value.length !== 0) {
    episodeNum();
    }
    captionWriter();
  }
}

function finishEditing() {
  const downloadShow = document.getElementById("downloadShow");
  downloadShow.style.opacity = "1";
  setTimeout(() => {
    downloadShow.style.opacity = "0";
  }, 5000);
  downloader.download = `Ep${epNumSelector.value} HC7 Cub's Contraption.jpg`;
  downloader.href = canvas
    .toDataURL("image/png")
    .replace("data:image/png", "data:concorp>sahara");
}

draggable = document.getElementsByClassName('draggable');

let oldX = 0;
let oldY = 0;
let distX = 0;
let distY = 0;

for (let i = 0; i < draggable.length; i++) {
  const dragElement = draggable[i];
  dragElement.isMoving = false;
  dragElement.onmousedown = e => {
    dragElement.isMoving = true;

    oldX = e.clientX;
    oldY = e.clientY;
  }
    dragElement.onmouseup = () => {
        dragElement.isMoving = false;
    };

    window.onmousemove = e => {
      e.preventDefault();
      if (dragElement.isMoving === true) {
        distX = e.clientX - oldX;
        distY = e.clientY - oldY;
        oldX = e.clientX;
        oldY = e.clientY;
        dragElement.style.left = (dragElement.offsetLeft + distX) + 'px';
        dragElement.style.top = (dragElement.offsetTop + distY) + 'px';
      }
    }
  }
  /*window.addEventListener('mousemove', e => {
    if (dragElement.isMoving === true) {
      distX = oldX - e.clientX;
      distY = oldY - e.clientY;
      oldX = e.clientX;
      oldY = e.clientY;
      dragElement.style.left = (dragElement.offsetLeft - distX) + 'px';
      dragElement.style.top = (dragElement.offsetTop - distY) + 'px';
    }
  });*/
  
  /*window.addEventListener('mouseup', e => {
    if (dragElement.isMoving === true) {
      dragElement.isMoving = false;
    }
  }); 
}*/