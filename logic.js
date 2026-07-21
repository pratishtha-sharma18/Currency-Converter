const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const counOption = document.querySelectorAll("select");
const toCoun = document.querySelector(".to select");
const fromCoun = document.querySelector(".from select");
let message = document.querySelector(".msg");

for (let select of counOption) {
    for (let val in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = val;
        newOption.value = val;
        if (select.name === "toBeChanged" && val === "USD") {
            newOption.selected = true;
        } else if (select.name === "result" && val === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let counCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${counCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#amount");
    let amtVal = amount.value;
    if (amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    let newFromCoun = fromCoun.value.toLowerCase()
    const URL = `${BASE_URL}/${newFromCoun}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let newToCoun = toCoun.value.toLowerCase();
    let value = data[newFromCoun][newToCoun];
    let finalVal = amtVal * value;
    message.innerText = `${amtVal} ${fromCoun.value} = ${finalVal} ${toCoun.value}`;
})