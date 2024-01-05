const droplist = document.querySelectorAll('.drop__list select'),
    fromCurrency = document.querySelector('.from select'),
    toCurrency = document.querySelector('.to select'),
    button = document.querySelector('form button')

for (let i = 0; i < droplist.length; i++) {
    for (const currencyCode in countryCode) {

        let selected;
        if (i === 0) {
            selected = currencyCode == 'USD' ? 'selected' : ''
        } else if (i === 1) {
            selected = currencyCode == 'NGN' ? 'selected' : ''
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
    const amount = document.querySelector('.amount input')
    let amountValue = amount.value

    if (amountValue === '' || amountValue === '0') {
        amount.value = '1'
        amountValue = 1
    }
    let apiKey = '613612c0b11dd1367eed7ce9'
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    fetch(url)
    .then(response => response.json())
    .then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountValue * exchangeRate).toFixed(2)
        const exchangeRateTxt = document.querySelector('.exchange__rate')
        exchangeRateTxt.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}.`
    })
    
}