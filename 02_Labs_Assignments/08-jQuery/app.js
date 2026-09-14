const button = document.querySelector('button');
const output = document.querySelector('p');
function trackUserHandler() {
console.log("Clicked !");
}
function getGeo(){
    navigator.geolocation.getCurrentPosition(
        (position) => {
        console.log("Lat" + position.coords.latitude);
        console.log("Long" + position.coords.longitude);
        },
        (error) => {
            console.log(error.message)
        }
        
    );
}   
button.addEventListener('click', trackUserHandler);
console.log("Hi");
let result = 0;
for (let i = 0; i < 100000000; i++) {
  result += i;
}
console.log(result);
