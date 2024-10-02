let currentImageIndex = 0;
const images = [
   "Imagens/banner1.png",
   "Imagens/banner2.png"
];
const imgElement = document.getElementById('img1');

setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    imgElement.src = images[currentImageIndex];
}, 3000); 
