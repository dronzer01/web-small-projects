//Creating all required Elements
const inputfield = document.querySelector(".input-field textarea"),
    todolists = document.querySelector(".todolists"),
    pendingnum = document.querySelector(".pending-num"),
    clearbtn = document.querySelector(".clear-button");

//we will call this function while adding,deleting and checking-unchecking the task
function alltasks(){
    let task=document.querySelectorAll(".pending");
    pendingnum.textContent=task.length===0? "no" : task.length;
    let allLists=document.querySelectorAll(".list");
    if(allLists.length > 0){
        todolists.computedStyleMap.marginTop="20px";
        clearbtn.style.pointerEvents="auto";
        return;
    }
    todolists.computedStyleMap.marginTop="0px";
    clearbtn.style.pointerEvents="none";
}

//to check if the variables get their values or not
console.log(inputfield, todolists, pendingnum, clearbtn);

//add task while we put value in text area and press enter
inputfield.addEventListener("keyup", (e) => {
    let inputVal = inputfield.value.trim();//trim removes space of front and back of the inputted values

    //if enter is pressed and input value length is greater than 0
    if (e.key === "Enter" && inputVal.length > 0) {
        let litag = `<li class="list pending" onclick="handleStatus(this)">
        <input type="checkbox"/>
        <span class="task">${inputVal}</span>
        <i class="fa-solid fa-trash" onclick="deleteTask(this)"></i>
    </li>`;
    todolists.insertAdjacentHTML("beforeend",litag);//inserting li tag inside todolist div
    inputfield.value="";//removing value from input field
    alltasks();
    }
});
//checking and unchecking the textbox while we click on the task
function handleStatus(e){
    const checkbox=e.querySelector("input");
    checkbox.checked=checkbox.checked ? false : true;
    e.classList.toggle("pending");
    alltasks();
}
//deleting all the task while we click on clear all btn
clearbtn.addEventListener("click",()=>{
    todolists.innerHTML="";
    alltasks();
}) ;
//deleting task while we click on delete icon
function deleteTask(e){
    e.parentElement.remove();//getting parent element and removing it
    alltasks();
}