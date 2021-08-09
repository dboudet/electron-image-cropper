const fs = require('fs'); //  allows us-node- to access user file system

export function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

const createImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
};

export async function saveCroppedImage(fileName, imageSrc, croppedAreaPixels) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const maxSize = Math.max(image.width, image.height);
  canvas.width = maxSize;
  canvas.height = maxSize;
  ctx.drawImage(
    image,
    maxSize / 2 - image.width / 2,
    maxSize / 2 - image.height / 2
  );
  const data = ctx.getImageData(0, 0, maxSize, maxSize);
  // set canvas to the desired size
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  //drop our image data in with the correct offsets for x and y to crop
  ctx.putImageData(
    data,
    Math.round(0 - maxSize / 2 + image.width / 2 - croppedAreaPixels.x),
    Math.round(0 - maxSize / 2 + image.height / 2 - croppedAreaPixels.y)
  );
  const url = canvas.toDataURL('image/jpg', 0.8);
  const base64data = url.replace(/^data:image\/png;base64,/, '');
  const newFileName = fileName + '-cropped.png';
  fs.writeFile(newFileName, base64data, 'base64', (err) => {
    if (err) {
      console.error(err);
    }
  });
}
