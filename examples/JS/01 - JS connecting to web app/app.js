document.body.style.backgroundColor = "green";

setTimeout(() => {
    document.body.style.backgroundColor = "blue";
}, 2000);


const colors = ["white", "red", "yellow", "purple", "orange", "pink"];

let index = 0;

setInterval(() => {
    document.body.style.backgroundColor = colors[index];
    //index = (index + 1) % colors.length;
}, 1000);


const button = document.createElement("button");
button.textContent = "Click me!";
document.body.appendChild(button);

const nameInput = document.getElementById("nameInputToReverse");
const reverseName = document.getElementById("reversedName");
nameInput.addEventListener("input", (event) => {
    const name = event.target.value;
    reverseName.textContent = name.split("").reverse().join("");
});

const hidemeBtn = document.getElementById("hidemeBtn");
hidemeBtn.addEventListener("click", () => {
    hidemeBtn.style.display = "none";
});

const clonemeBtn = document.getElementById("clonemeBtn");
clonemeBtn.addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
        const clone = clonemeBtn.cloneNode(true);
        document.body.appendChild(clone);
    }
});


document.addEventListener("keydown", (event) => {
    const car = document.getElementById("car");
    const step = 10;
    const carPosition = car.getBoundingClientRect();
    switch (event.key) {
        case "ArrowUp":
            car.style.rotate = "0deg";
            car.style.top = `${carPosition.top - step}px`;
            break;
        case "ArrowDown":
            car.style.rotate = "180deg";
            car.style.top = `${carPosition.top + step}px`;
            break;
        case "ArrowLeft":
            car.style.rotate = "270deg";
            car.style.left = `${carPosition.left - step}px`;
            break;
        case "ArrowRight":
            car.style.rotate = "90deg";
            car.style.left = `${carPosition.left + step}px`;
            break;
    }
});

/*
alert("Hello, welcome to the web app!");
const userName = prompt("What is your name?");
alert(`Nice to meet you, ${userName}!`);

if(confirm("Do you Like JavaScript?")) {
    alert("Great! JavaScript is awesome!");
} else {
    alert("Oh no! Maybe you will like it later.");
}
*/

const submitBtn = document.getElementById("submitBtn");

const submitFormName = document.getElementById("nameInput");
const submitFormEmail = document.getElementById("emailInput");
const submitFormMessage = document.getElementById("messageInput");

submitBtn.addEventListener("click", () => {
    const userInfo = {
        name: submitFormName.value,
        email: submitFormEmail.value,
        message: submitFormMessage.value
    };
    alert(`Message sent! Name: ${submitFormName}, Email: ${submitFormEmail}, Message: ${submitFormMessage}`);

    console.log("User Info:", userInfo);
});

submitFormName.addEventListener("input", (event) => {
    console.log("Name input changed:", event.target.value.length);
    if (event.target.value.length < 3) {
        event.target.classList.add("error-input");
    } else {
        event.target.classList.remove("error-input");
    }
});





