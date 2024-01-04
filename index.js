const droplist = document.querySelectorAll('.drop__list select'),
    fromCurrency = document.querySelector('.from select'),
    toCurrency = document.querySelector('.to select'),
    button = document.querySelector('.form button')

for (let i = 0; i < droplist.length; i++) {
    for (const currencyCode in countryCode) {

        let selected;
        if (i === 0) {
            selected = currencyCode == 'US' ? 'selected' : ''
        } else if (i === 1) {
            selected = currencyCode == 'NG' ? 'selected' : ''
        }
        let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`
        droplist[i].insertAdjacentHTML('beforeend', optionTag)
    }
}

button.addEventListener('click', e => {
    e.preventDefault();
    getExchange();

})
const getExchange = () => {
    const amount = document.querySelector('.form amount')
    let amountValue = amount.value

    if (amountValue === '' || amountValue === '0') {
        amountValue = 1
        amount.value = '1'
    }
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/ ${fromCurrency.value}`
    
}