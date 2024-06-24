
export const handleCombineBackgroundAndTextOverlay = (
  backgroundBase64,
  overlayBase64,
  overlayTransforms // Includes x, y, scale, and rotation information
) => {

  console.log('overlay transforms', overlayTransforms);

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; // Set canvas size
    canvas.height = 1024;

    const ctx = canvas.getContext("2d");
    const backgroundImage = new Image();
    const overlayImage = new Image();


    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      overlayImage.onload = () => {
        // Apply transformations for overlay
        console.log('ctx', ctx);
        ctx.save(); // Save the current state
        ctx.translate(overlayTransforms.x + overlayImage.width / 2, overlayTransforms.y + overlayImage.height / 2); // Move to the center of the image
        ctx.rotate(overlayTransforms.rotation * Math.PI / 180); // Convert degrees to radians for rotation
        ctx.scale(overlayTransforms.scale[0], overlayTransforms.scale[1]); // Scale the image

    console.log('overlayimage w/h', overlayImage.width, '/', overlayImage.height)
        
        ctx.drawImage(overlayImage, -overlayImage.width / 2, -overlayImage.height / 2); // Draw the image centered
        ctx.restore(); // Restore the original state

        const combinedBase64 = canvas.toDataURL('image/png');
        resolve(combinedBase64);
      };

      overlayImage.onerror = () => {
        reject('Failed to load the overlay image');
      };
      overlayImage.src = overlayBase64;
    };

    backgroundImage.onerror = () => {
      reject('Failed to load the background image');
    };
    backgroundImage.src = backgroundBase64;
  });
};

