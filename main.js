let inputUrl = document.querySelector(".urlInput");
let btnSubmit = document.querySelector(".submit");
let divQr = document.getElementById("qrcode");
let inputQRPage = document.querySelector(".inputQR");
let QRPage = document.querySelector(".QR");
let myForm = document.querySelector("form");
let btnDownloud = document.querySelector(".download");
let btnShare = document.querySelector(".share");
let btnback = document.querySelector(".back");

let qrcode;
let currentQRText;

// submit from of url
myForm.addEventListener("submit" , (e)=> {
    e.preventDefault(); // to prevent load the page

    let text = inputUrl.value.trim();
    if(text === '') {
        return alert("Please Enter URL");
    }

    divQr.innerHTML = ""; // remov any old QR

    currentQRText = text;

    qrcode = new QRCode(divQr, {
        text: text,
        width: 150,
        height: 150,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // clear the input feild
    inputUrl.value = "";

    inputQRPage.classList.remove("activePage");
    QRPage.classList.add("activePage");
});


// download btn
btnDownloud.addEventListener("click" , ()=> {
    let imgQR = divQr.querySelector("img");
    console.log(imgQR);
    if(imgQR) {
        //console.log(imgQR.src);
        let link = document.createElement("a");
        link.href = imgQR.src;
        link.download = "imgQR.png"; // download the file in href of a (src of image) when user click in link
        link.click(); // بتعمل click وهمي in link
    }
});

// btn share (copy url of QR)

// copy url function
function copyUrlQR (textUrl) {
    // create temp input to save url in value of that input to select that value to excuted execCommand("copy")
    let temInpt = document.createElement("input");
    temInpt.value = textUrl;
    document.body.append(temInpt);

    temInpt.select();
    document.execCommand("copy"); // copy that is select 

    // then remove that input and show user the url is copied
    document.body.removeChild(temInpt);

    alert("QR text copied!");
}

btnShare.addEventListener("click" , ()=> {
    if(currentQRText === '') {
        alert("generate QR first");
    } 
    // there QR generated
    copyUrlQR(currentQRText);
});

// back button
btnback.addEventListener("click" , ()=> {
    inputQRPage.classList.add("activePage");
    QRPage.classList.remove("activePage");
})

