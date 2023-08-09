const wrapper=document.querySelector(".wrapper"),
carousal=document.querySelector(".carousal"),
images=document.querySelectorAll("img"),
buttons=document.querySelectorAll(".button");

let imgIndex=1,intervalId;

//Define function to start automatic image slider
const autoSlide=()=>{
    //Start the function by calling slideImage() every 2 Seconds
    intervalId=setInterval(()=> slideImage(++imgIndex),2000);
};

//Call autoslide function on page load
autoSlide();

//Function to update the carousal display to show the specified image
const slideImage=()=>{
    //calculate the updated image index
    imgIndex = imgIndex === images.length ? 0 : imgIndex < 0 ? images.length - 1 : imgIndex;
    //Update the carousal display to show the specified image.
    carousal.style.transform=`translate(-${imgIndex * 100}%)`;
};
//Function to update the carousal display to show the next or previous image
const updateClick = (e) => {
    //Stop the automatic slideshow
    clearInterval(intervalId);
    //calculate updated image index based on the button clicked 
    imgIndex += e.target.id==="next" ? 1 : -1;
    slideImage(imgIndex);
    //Restart the autoSlide
    autoSlide();
};

// Add event listeners to navigation buttons 
buttons.forEach((button) => button.addEventListener("click",updateClick));

//Add mouseover listener to wrapper element auto sliding
wrapper.addEventListener("mouseover",()=>clearInterval(intervalId));

//Add mouseover listener to wrapper element auto sliding
wrapper.addEventListener("mouseleave",autoSlide);