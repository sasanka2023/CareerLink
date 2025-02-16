let videoElement;
let cameraStream;

export const preventCopying = () => {
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.addEventListener("copy", (event) => event.preventDefault());
  document.addEventListener("selectstart", (event) => event.preventDefault());

  console.log("Copying and right-clicking are disabled.");
};

export const openCamera = () => {
  videoElement = document.createElement("video");
  videoElement.setAttribute("autoplay", "");
  videoElement.setAttribute("playsinline", "");
  videoElement.style.position = "fixed";
  videoElement.style.bottom = "10px";
  videoElement.style.right = "10px";
  videoElement.style.width = "200px";
  videoElement.style.height = "150px";
  videoElement.style.border = "2px solid red";
  videoElement.style.borderRadius = "10px";
  videoElement.style.zIndex = "1000";
  document.body.appendChild(videoElement);

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      cameraStream = stream;
      videoElement.srcObject = stream;
      console.log("Camera access granted.");
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });
};

export const closeCamera = () => {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    console.log("Camera closed.");
  }
  if (videoElement) {
    videoElement.remove();
  }
};
