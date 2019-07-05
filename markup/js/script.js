import { country } from './country.js';


let selectedCountry = document.querySelector('#selected-country');

const dropHolder = document.querySelector('.drop-country-holder');
const dropList = document.querySelector('.drop-country-holder > ul');

const closeDrop = dropHolder.querySelector('.close');

const inputCountry = document.querySelector('#input-country');

const selectLanguage = document.querySelector('.select-language');

renderCountries(getCountriesArray(selectLanguage.value));


function getCountriesArray(optionValue) {
    let arrayObj = [];
    let newArr = [];

    for (let i in country) {
        if (i == optionValue) {
            arrayObj = country[i];
        }
    }

    for (let i in arrayObj) {
        newArr.push(arrayObj[i]);
    }

    return newArr;
}

function renderCountries(countries) {
    clearCountryList(dropList);

    for (let i in countries) {
        let li = document.createElement('li');
        li.innerHTML = countries[i];
        dropList.appendChild(li);
    }
}

function clearCountryList(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


inputCountry.addEventListener('input', function (e) {
    let coutries = getCountriesArray(selectLanguage.value);
    let inputValue = this.value.trim().toLowerCase();

    let filterArray = coutries.filter(item => {
        return item.toLowerCase().match(inputValue);
    });

    renderCountries(filterArray);

});


selectLanguage.addEventListener('change', (e) => {
    clearCountryList(dropList);
    selectedCountry.value = "";
    inputCountry.value = "";
    const selectedValue = e.target.value;
    for (let i in country) {
        if (i == selectedValue) {
            renderCountries(country[i]);
        }
    }
});

dropList.addEventListener('click', (e) => {
    if (e.target.tagName == 'LI') {
        selectedCountry.value = e.target.innerText
    }
})

inputCountry.addEventListener('focus', () => {
    dropHolder.classList.add('show');
});

closeDrop.addEventListener('click', () => {
    dropHolder.classList.remove('show');
});





