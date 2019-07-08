export class CountryList{
    constructor(countries){
        this.countries = countries;
    }

    renderCountries(array,parent) {
        parent.innerHTML = '';

        for (let i in array) {
            let li = document.createElement('li');
            li.innerHTML = array[i].value;
            li.setAttribute('data-country',array[i].key);
            parent.appendChild(li);
        }
    }

    getSelectedArray(currentLanguage){
        let array = [];
    
        for (let i in this.countries) {
            if (i == currentLanguage) {
                array = this.countries[i];
            }
        }
    
        return array;
    }

    getAssotiaveArray(array){
        let newArray = [];

        for(let i in array){
            newArray.push({key: i, value: array[i]});
        }

        return newArray;
    }
}




