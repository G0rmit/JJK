let banner = document.getElementById('banner');

const images = [ /*all images that are being rotated*/
	"assets/banner/tojiSide1.jpg",
	"assets/banner/tojiSide2.jpg",
	"assets/banner/tojiSide3.jpg",
	"assets/banner/tojiSide4.jpg",
	"assets/banner/tojiSide5.jpg",
	"assets/banner/gojoSide1.jpg",
	"assets/banner/gojoSide2.jpg",
	"assets/banner/gojoSide3.jpg",
	"assets/banner/gojoSide4.jpg",
	"assets/banner/gojoSide5.jpg"
];

let index = 0;
function bannerChange(){ /*makes count with reminder, and when the last picture turns, reminder sets to 0, so does index and images go all over again*/
	index = (index + 1) % images.length;
	banner.src = images[index];
}

setInterval(bannerChange, 5000); /*sets how often the images change, 5 seconds in this case*/