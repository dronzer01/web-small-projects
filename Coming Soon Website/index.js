const sec=document.querySelector(".seconds .number"),
min=document.querySelector(".minutes .number"),
hrs=document.querySelector(".hours .number"),
days=document.querySelector(".days .number");

let secVal=60,
minVal=60,
hrVal=60,
dayVal=60;

const timefn=setInterval(()=>{
    secVal--;
    if(secVal==0){
        minVal--;
        secVal=60;
    }
    if(minVal==0){
        hrVal--;
        minVal=60;
    }
    if(hrVal==0){
        dayVal--;
        hrVal=60;
    }
    if(dayVal===0){
        clearInterval(timefn);
    }
    sec.textContent=secVal <10 ? `0${secVal}`:secVal;
    min.textContent=minVal <10 ? `0${minVal}`:minVal;
    hrs.textContent=hrVal <10 ? `0${hrVal}`:secVal;
    days.textContent=dayVal <10 ? `0${dayVal}`:minVal;
},1000);