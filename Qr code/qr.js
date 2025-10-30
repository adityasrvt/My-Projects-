let qimg = document.getElementById("qimg");
let inp = document.getElementById("inp");
let qrContainer = document.querySelector(".qrimg");

function genqr() {
    let text = inp.value.trim();

    if (text === "") {
        alert("Please enter some text or a URL!");
        return;
    }

    // Hide old QR before loading new one
    qrContainer.classList.remove("show");

    qimg.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(text);

    // Wait for the image to load, then trigger animation
    qimg.onload = () => {
        qrContainer.classList.add("show");
    };
}
