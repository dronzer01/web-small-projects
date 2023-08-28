const lengthSlider = document.querySelector(".pass-length input");
const generateBtn = document.querySelector(".generate-btn");
const options = document.querySelectorAll(".option input");
const passwordInput=document.querySelector(".input-box input");
const passwordIndicator=document.querySelector(".pass-indicator");
const copyIcon=document.querySelector(".input-box i");

const characters = {//OBJECTS OF LETTERS,NUMBERS AND SYMBOLS
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!@#$%&*|[]():{};.,-+<>~"
}

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate=false;
        passLength = lengthSlider.value;

    options.forEach(option => {//looping through each option's checheckbox
        if (option.checked) {//if checkbox is checked
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                //adding particullar keyvalue from character object to staticPassword
                staticPassword += characters[option.id];
            }else if(option.id === "spaces"){
                staticPassword +=` ${staticPassword}`;
            }else{
                excludeDuplicate=true;
            }

        }
    });
    for (let i = 0; i < passLength; i++) {
        // getting random character as static password 
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){//if excludeDuplicate is true
            //if randomPandomPassword doesn't contains the current random character or randomChar is equal to space " " then add the random character to random Password else decrement i by -1.
            !randomPassword.includes(randomChar) || randomChar==" " ? randomPassword +=randomChar :i--;
        }else{
            randomPassword+=randomChar;
        }
    }
    passwordInput.value=randomPassword;//showing password on passwordInput value
}

const updatePassIndicator=()=>{
    passwordIndicator.id=lengthSlider.value<=8 ? "weak" :lengthSlider.value<=16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length .details span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword=()=>{
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.className="fa-solid fa-check";
    setTimeout(()=>{
        copyIcon.className="fa-solid fa-copy";
    },1500);
}

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click",copyPassword);