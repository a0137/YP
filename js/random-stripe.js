const randomImgsContainer = document.getElementById('randomImgsContainer');
const randomImgsDiv = document.getElementById('randomImgs');
const numberOfImagesToShow = 12;

function createImageElement(imagePath) {
  const imgElement = new Image();
  imgElement.src = imagePath;

  imgElement.onload = () => {
    imgElement.style.visibility = 'visible';
  };

  imgElement.style.visibility = 'visible';

  imgElement.classList.add("image");
  return imgElement;
}

function getRandomUniqueImages(count) {
  const minImageNumber = 1;
  const maxImageNumber = 19;
  const imagePaths = [];
  const uniquePaths = new Set();

  // Generate unique image paths
  while (uniquePaths.size < count) {
    const randomNumber = Math.floor(Math.random() * (maxImageNumber - minImageNumber + 1)) + minImageNumber;
    const imagePath = `imgs-gal/${randomNumber.toString().padStart(3, '0')}.jpg`;
    
    if (!uniquePaths.has(imagePath)) {
      uniquePaths.add(imagePath);
      imagePaths.push(imagePath);
    }
  }

  return imagePaths;
}

function showRandomImages() {
  randomImgsDiv.innerHTML = '';

  const containerWidth = randomImgsContainer.clientWidth;
  const imageWidth = containerWidth / numberOfImagesToShow;
  const imagePaths = getRandomUniqueImages(numberOfImagesToShow);

  // Create image elements and position them based on the set of unique image paths
  for (let i = 0; i < numberOfImagesToShow * 2; i++) {
    const imgElement = createImageElement(imagePaths[i % numberOfImagesToShow]);
    imgElement.style.left = `${i * imageWidth}px`;
    randomImgsDiv.appendChild(imgElement);
  }
}

showRandomImages();
