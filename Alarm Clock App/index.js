const selectMenu=document.querySelectorAll("select");
const currentTime=document.querySelector("h1");
const alarmbtn=document.querySelector("button");
const content=document.querySelector(".content");
let alarmtime,
ringtone=new Audio("img/Alarm Clock Alarm.mp3"),
isalarmSet=false;

for(let i=12;i>0;i--){
    i=i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=59;i>=0;i--){
    i=i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=59;i>=0;i--){
    i=i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=2;i>0;i--){
    let ampm=i ==1 ? "AM" :"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend",option);
}
setInterval(()=>{
    // getting hrs,mins,secs
    let date=new Date(),
    h=date.getHours(),
    m=date.getMinutes(),
    s=date.getSeconds(),
    ampm="AM";
    if(h>=12){
        h=h-12;
        ampm="PM";
    }
    // if hr value is 0,then it to 12  
    h=h==0?h=12:h;
    // adding 0 before history,min,sec if its value is less than 10 
    h=h<10? "0" +h :h;
    m=m<10? "0" +m :m;
    s=s<10? "0" +s :s;
    currentTime.innerText=`${h}:${m}:${s} ${ampm}`;


    if(alarmtime == `${h}:${m}:${s} ${ampm}`){
        ringtone.play();
        ringtone.loop=true;
    } 
},1000);

// alarm button function 

function alarmfn(){
    if(isalarmSet){
        alarmtime="";
        ringtone.pause();
        content.classList.remove("disable");
    alarmbtn.innerText="SET ALARM";
    return isalarmSet=false;
    }
    // getting history,min & sec values 
    let time=`${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;

    if(time.includes("Hours") ||time.includes("Minutes") ||time.includes("Seconds")|| time.includes("AM/PM")){
        return alert("PLZ SELECT A VALID TIME TO SET ALARM!!!")
    }
    isalarmSet=true;
    alarmtime=time;
    content.classList.add("disable");
    alarmbtn.innerText="CLEAR ALARM";
}

alarmbtn.addEventListener("click",alarmfn);