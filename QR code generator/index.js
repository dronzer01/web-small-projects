let imgbox = document.getElementById("imgbox");
let qrimg = document.getElementById("qrimg");
let qrcontent = document.getElementById("qrcontent");

function generateQR() {
    if (qrcontent.value.length > 0) {
        qrimg.src = " https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrcontent.value;
        imgbox.classList.add('show-img');
    }else{
        qrcontent.classList.add('error');
        setTimeout(()=>{
            qrcontent.classList.remove('error');
        },1000);
    }
}
