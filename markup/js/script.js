import { country } from './country.js';
import {CountryList} from './component/CountryList.js'

/*variable*/
const selectedCountry = document.querySelector('#selected-country');
const selectedCountryCode = document.querySelector('#selected-country-code');
const dropHolder = document.querySelector('.drop-country-holder');
const dropList = document.querySelector('.drop-country-holder > ul');
const dropItem = dropList.getElementsByTagName('li');
const closeDrop = dropHolder.querySelector('.close');
const inputHolder = document.querySelector('.input-country-holder');
const removeInputValue = inputHolder.querySelector('.close');
const inputCountry = document.querySelector('#input-country');
const selectLanguage = document.querySelector('.select-language');
const countryErrorValue = document.querySelector('.error-msg .search-country');
/**********/

const objectCountry = new CountryList(country);


objectCountry.renderCountries(objectCountry.getAssotiaveArray(objectCountry.getSelectedArray(selectLanguage.value)), dropList);

inputCountry.addEventListener('input', function (e) {
    let countries = objectCountry.getSelectedArray(selectLanguage.value);
    let inputValue = this.value.trim().toLowerCase();
    let filterArray = [];

    for(let i in countries){
        if(countries[i].toLowerCase().match(inputValue)){
            filterArray.push({key: i, value: countries[i]});
        }
    }

    inputValue.length >= 1 ? inputHolder.classList.add('active-input') : inputHolder.classList.remove('active-input');

    if(filterArray.length == 0){
        dropHolder.classList.add('country-error');
        countryErrorValue.innerHTML =  `'${inputValue}'`;
    }else{
        dropHolder.classList.remove('country-error');
    }

    objectCountry.renderCountries(filterArray, dropList);
});

selectLanguage.addEventListener('change', (e) => {
    dropList.innerHTML = '';
    selectedCountry.value = "";
    selectedCountryCode.value = "";
    inputCountry.value = "";
    dropHolder.classList.remove('country-error');

    const selectedValue = e.target.value;

    for (let i in country) {
        if (i == selectedValue) {
            objectCountry.renderCountries(objectCountry.getAssotiaveArray(country[i]), dropList);
        }
    }
});

dropList.addEventListener('click', (e) => {
    for(let i = 0; i < dropItem.length; i++){
        dropItem[i].classList.remove('active-country');
    }
    
    if (e.target.tagName == 'LI') {
        selectedCountry.value = e.target.innerText;
        selectedCountryCode.value = e.target.getAttribute('data-country');
        e.target.classList.add('active-country');
    }
});

inputCountry.addEventListener('focus', () => {
    dropHolder.classList.add('show');
});

closeDrop.addEventListener('click', () => {
    dropHolder.classList.remove('show');
});

removeInputValue.addEventListener('click', () => {
    inputCountry.value = '';
    inputHolder.classList.remove('active-input');
    objectCountry.renderCountries(objectCountry.getAssotiaveArray(objectCountry.getSelectedArray(selectLanguage.value)), dropList);
})



