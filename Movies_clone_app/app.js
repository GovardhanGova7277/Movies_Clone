'use strict';//to declare a variable with keyword otherwise error ex: let[declaring] a-10;

const header=document.querySelector('header');
const menus=document.querySelector('.menus');
const sliders=document.querySelectorAll('.slide');
const leftBtn=document.getElementById('left');
const rightBtn=document.getElementById('right');
const slideContentEl=document.querySelectorAll('.slide-content');

window.addEventListener('scroll',()=>{
    if(document.documentElement.scrollTop>20){
        menus.classList.add('sticky');
    }
    else{
        menus.classList.remove('sticky');
    }
})
let activeSlider=0;

//set body background
function setBgBody(){
    header.style.backgroundImage=sliders[activeSlider].style.backgroundImage;
}
setBgBody();

function setActiveSlide(){
    sliders.forEach((slides)=>slides.classList.remove('active'));
    sliders[activeSlider].classList.add('active');
}
//set content
function setContent(){
    slideContentEl.forEach((slidersContents)=>{
        slidersContents.classList.remove('active');
    });
    slideContentEl[activeSlider].classList.add('active');
    
}

rightBtn.addEventListener('click',()=>{
    nextSlide();
    setBgBody();
    setActiveSlide();
    setContent();
});

leftBtn.addEventListener('click',()=>{
    previousSlide();
    setBgBody();
    setActiveSlide();
    setContent();
});

//
function nextSlide(){
    activeSlider++;
    if(activeSlider>sliders.length -1){
        activeSlider=0;
    }
}

function previousSlide(){
    activeSlider--;
    console.log(activeSlider);
    if(activeSlider<0){
        activeSlider=sliders.length-1;
        
    }
}

setInterval(()=>{
    nextSlide();
    setBgBody();
    setActiveSlide();
    setContent();
},7000);