let [secVal, minVal, hrVal] = [0, 0, 0];
let time = document.getElementById("time");
let timer = null;

function stopwatch() {
    secVal++;
    if (secVal == 60) {
        secVal = 0;
        minVal++;
        if (minVal == 60) {
            minVal = 0;
            hrVal++;
        }
    }
    let h=hrVal<10 ? "0" +hrVal :hrVal;
    let m=minVal<10 ? "0" +minVal :minVal;
    let s=secVal<10 ? "0"+secVal:secVal;
    time.innerHTML = h + " : " + m+ " : " + s;
}
function watchStart() {
    if (timer != null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 1000);
}
function watchStop() {
    clearInterval(timer);
}
function watchReset() {
    clearInterval(timer);
    [secVal, minVal, hrVal] = [0, 0, 0];
    time.innerHTML="00:00:00";
}