document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('saveButton').addEventListener('click', saveCanvas);
document.getElementById('scaleRange').addEventListener('input', handleScale);
document.getElementById('rotateRange').addEventListener('input', handleRotate);
document.getElementById('brightnessRange').addEventListener('input', handleBrightness);
document.getElementById('contrastRange').addEventListener('input', handleContrast);
document.getElementById('grayscaleRange').addEventListener('input', handleGrayscale);
document.getElementById('hueRotateRange').addEventListener('input', handleHueRotate);
document.getElementById('invertRange').addEventListener('input', handleInvert);
document.getElementById('opacityRange').addEventListener('input', handleOpacity);
document.getElementById('saturateRange').addEventListener('input', handleSaturate);
document.getElementById('sepiaRange').addEventListener('input', handleSepia);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let originalImage = null;

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            originalImage = img;
            drawImage();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function handleScale(event) {
    const scaleValue = event.target.value;
    document.getElementById('scaleValue').innerText = `${scaleValue}%`;
    drawImage();
}

function handleRotate(event) {
    const rotateValue = event.target.value;
    document.getElementById('rotateValue').innerText = `${rotateValue}°`;
    drawImage();
}

function handleBrightness(event) {
    const brightnessValue = event.target.value;
    document.getElementById('brightnessValue').innerText = `${brightnessValue}%`;
    drawImage();
}

function handleContrast(event) {
    const contrastValue = event.target.value;
    document.getElementById('contrastValue').innerText = `${contrastValue}%`;
    drawImage();
}

function handleGrayscale(event) {
    const grayscaleValue = event.target.value;
    document.getElementById('grayscaleValue').innerText = `${grayscaleValue}%`;
    drawImage();
}

function handleHueRotate(event) {
    const hueRotateValue = event.target.value;
    document.getElementById('hueRotateValue').innerText = `${hueRotateValue}°`;
    drawImage();
}

function handleInvert(event) {
    const invertValue = event.target.value;
    document.getElementById('invertValue').innerText = `${invertValue}%`;
    drawImage();
}

function handleOpacity(event) {
    const opacityValue = event.target.value;
    document.getElementById('opacityValue').innerText = `${opacityValue}%`;
    drawImage();
}

function handleSaturate(event) {
    const saturateValue = event.target.value;
    document.getElementById('saturateValue').innerText = `${saturateValue}%`;
    drawImage();
}

function handleSepia(event) {
    const sepiaValue = event.target.value;
    document.getElementById('sepiaValue').innerText = `${sepiaValue}%`;
    drawImage();
}

function drawImage() {
    if (!originalImage) return;
    const scale = document.getElementById('scaleRange').value / 100;
    const rotate = document.getElementById('rotateRange').value;
    const brightness = document.getElementById('brightnessRange').value;
    const contrast = document.getElementById('contrastRange').value;
    const grayscale = document.getElementById('grayscaleRange').value;
    const hueRotate = document.getElementById('hueRotateRange').value;
    const invert = document.getElementById('invertRange').value;
    const opacity = document.getElementById('opacityRange').value;
    const saturate = document.getElementById('saturateRange').value;
    const sepia = document.getElementById('sepiaRange').value;

    canvas.width = originalImage.width * scale;
    canvas.height = originalImage.height * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) hue-rotate(${hueRotate}deg) invert(${invert}%) opacity(${opacity}%) saturate(${saturate}%) sepia(${sepia}%)`;
    ctx.drawImage(originalImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.restore();
}

async function saveCanvas() {
    try {
        const options = {
            types: [
                {
                    description: 'PNG Image',
                    accept: { 'image/png': ['.png'] },
                },
                {
                    description: 'JPEG Image',
                    accept: { 'image/jpeg': ['.jpg', '.jpeg'] },
                },
            ],
        };

        const fileHandle = await window.showSaveFilePicker(options);
        const writableStream = await fileHandle.createWritable();
        const fileType = fileHandle.name.endsWith('.jpg') || fileHandle.name.endsWith('.jpeg') ? 'image/jpeg' : 'image/png';

        canvas.toBlob(async (blob) => {
            await writableStream.write(blob);
            await writableStream.close();
        }, fileType);
    } catch (error) {
        console.error('Save operation cancelled or failed:', error);
    }
}