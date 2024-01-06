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
    droplist[i].addEventListener('click', e => {
        loadFlag(e.target)
    })
}

function loadFlag(element) {
   for( code in countryCode) {
    if( code === element.value) {
        let imgTag = element.parentElement.querySelector('img')
        imgTag.src = `https://flagsapi.com/${countryCode[code]}/flat/64.png`
    }
   }
}


button.addEventListener('click', e => {
    e.preventDefault();
    getExchange();

})
const exchangeIcon = document.querySelector('.icon')
exchangeIcon.addEventListener('click', () => {
    let tempCode = fromCurrency.value
    fromCurrency.value = toCurrency.value
    toCurrency.value = tempCode
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchange()
})

const getExchange = () => {
    const amount = document.querySelector('.amount input')
    const exchangeRateTxt = document.querySelector('.exchange__rate')
    let amountValue = amount.value

    if (amountValue === '' || amountValue === '0') {
        amount.value = '1'
        amountValue = 1
    }

    exchangeRateTxt.innerText = 'Optimizing Exchange Rate'
    let apiKey = '613612c0b11dd1367eed7ce9'
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    fetch(url)
    .then(response => response.json())
    .then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountValue * exchangeRate).toFixed(2)
        exchangeRateTxt.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}.`
    }).catch(() => {
        exchangeRateTxt.innerText = 'Something Went Wrong'
    })
    
}