import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { readFile, saveCroppedImage } from '../../helpers/images';
import { Link } from 'react-router-dom';
import testImage from '../../../assets/full-headshot-2021.jpg';

function Photos() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [fileName, setFileName] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, _croppedAreaPixels) => {
    setCroppedAreaPixels(_croppedAreaPixels);
  }, []);

  const handleFileChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.path);
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const handleSave = () => {
    //first - we want to save the cropped image
    saveCroppedImage(fileName, imageSrc, croppedAreaPixels);
    //second - we can reset our imageSrc = null
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  if (!imageSrc) {
    return (
      <div className="photos">
        <Link to="/">
          <button type="button">
            <span role="img" aria-label="home">
              🛖&nbsp;
            </span>
            Return Home
          </button>
        </Link>
        <h1>Please select an image to crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
    );
  }

  return (
    <div className="crop-area">
      <Cropper
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        image={imageSrc}
      />
      <button type="button" className="save-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default Photos;
