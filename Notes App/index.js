const addbox = document.querySelector(".add-box");
const popupcontainer = document.querySelector(".popup-container");
const popuptitle = popupcontainer.querySelector("header p");
const closeicon = popupcontainer.querySelector("header i");
const title = popupcontainer.querySelector("input");
const description = popupcontainer.querySelector("textarea");
const addbtn = popupcontainer.querySelector("button");


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Getting local storage notes if it exists and parsing them to js object else passing an empty array to notes 
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate=false,updatId;

addbox.addEventListener("click", () => {
    popuptitle.innerText="Add a New Note";
    addbtn.innerText="Add Note";
    popupcontainer.classList.add('show');
    document.querySelector("body").style.overflow="hidden";
    if(window.innerWidth>660) title.focus();
});

closeicon.addEventListener("click",()=>{
    isUpdate=false;
    title.value="";
    description.value="";
    popupcontainer.classList.remove("show");
    document.querySelector("body").style.overflow="auto";
})

function showNotes(){
    if(!notes){return;}
    document.querySelectorAll(".note").forEach(note=>note.remove());
    notes.forEach((note,index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="fas fa-minus"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index},'${note.title}','${note.description}')" ><i class="fa fa-pencil" aria-hidden="true"></i>Edit</li>
                                    <li onclick="deleteNote(${index})" ><i class="fa fa-trash" aria-hidden="true"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addbox.insertAdjacentHTML("afterend",liTag);
    });
}
showNotes();

function showMenu(element){
    element.parentElement.classList.add("show");
    document.addEventListener("click",e=>{
        // removing show class from the settings menu on document click 
        if(e.target.tagName!="I" || e.target != element){
            element.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId){
    let confirmation=confirm("Are u sure u want to delete this note?");
    if(!confirmation){
        return;
    }
    notes.splice(noteId,1);//removing selected notes from array/tasks
    localStorage.setItem("notes", JSON.stringify(notes));//saving updated notes to local storage
    showNotes();
}

function updateNote(noteId,titleval,descriptionval){
    isUpdate=true;
    updatId=noteId;
    addbox.click();
    title.value=titleval;
    description.value=descriptionval
    addbtn.innerText="Update Note";
    popuptitle.innerText="Update a note";

}

addbtn.addEventListener("click", e => {
    e.preventDefault();
    let notetitle = title.value, 
    notedes = description.value;
    if (notetitle || notedes) {
        let dateObj = new Date,
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

        let noteInfo = {
            title: notetitle, description: notedes,
            date: `${month} ${day} , ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);//adding new motes to notes
        }else{
            isUpdate=false;
            notes[updatId]=noteInfo//updating specified note
        }
        localStorage.setItem("notes", JSON.stringify(notes));//saving notes to local storage
        showNotes();
        closeicon.click();
    }
});