const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

const dropdowns = document.querySelectorAll('.select');
const btn = document.querySelector("#btn");
const display = document.querySelector('.message');

const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');

for(let select of dropdowns) {
    for(let curCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = curCode;
        newOption.value = curCode;
        if(select.name === 'from' && curCode === 'USD') {
            newOption.selected = "selected";
        } else if(select.name === 'to' && curCode === 'INR') {
            newOption.selected = "selected";
        } 
        select.append(newOption)
    }

    select.addEventListener('change', (e) => {
        updateFlag(e.target)
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img')
    img.src = newScr;
}

btn.addEventListener('click', async (e) => {
    e.preventDefault()
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if(amtVal == '' || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    
    const fromCurV = fromCurr.value.toLowerCase();
    const toCurV = toCurr.value.toLowerCase();
    const url = `${BASE_URL}/${fromCurV}/${toCurV}.json`;

    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurV];
    let result = amtVal * rate;
    let exchangeRate = result.toFixed(4);
    
    display.innerText = `${amtVal} ${fromCurr.value} = ${exchangeRate} ${toCurr.value}`;
});