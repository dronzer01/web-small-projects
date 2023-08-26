const currentDate=document.querySelector(".current-date");
const days=document.querySelector(".days");
const iconfn=document.querySelectorAll(".icons i");


//getting new date, current month and year
let date=new Date(),
y=date.getFullYear(),
m=date.getMonth();

const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

const renderCalender=()=>{
    let firstDayofMonth=new Date(y,m,1).getDay();//getting first date of month
    let lastDateofMonth=new Date(y,m+1,0).getDate();//getting last date of month
    let lastDateofLastMonth=new Date(y,m,0).getDate();//getting last date of previous month
    let lastDayofMonth=new Date(y,m,lastDateofMonth).getDay();//getting last day of month
    let liTag="";

    // previous month dates in current month
    for(let i=firstDayofMonth;i>0;i--){
        liTag+=`<li class="inactive">${lastDateofLastMonth-i+1}</li>`
    }
// current month dates in current month
    for(let i=1;i<=lastDateofMonth;i++){
        // Adding active class if current Date 
        let isToday = i===date.getDate() && m===new Date().getMonth() && y==new Date().getFullYear() ? "active":"";
        liTag+=`<li class="${isToday}">${i}</li>`
    }
    // next month dates in current month
    for(let i=lastDayofMonth;i<6;i++){
        liTag+=`<li class="inactive">${i-lastDayofMonth+1}</li>`;
    }

    currentDate.innerHTML=`${months[m]} ${y}`;
    days.innerHTML=liTag
}
renderCalender();
iconfn.forEach(icon=>{
    //adding click listeners on icons
    icon.addEventListener("click",()=>{
        //changing months on icon click
        m=icon.id==="before" ? m-1:m+1;

        if(m<0 || m>11){
            date=new Date(y,m);
            y=date.getFullYear();
            m=date.getMonth();
        }else{
            date=new Date();
        }
        renderCalender();
    });
})
;