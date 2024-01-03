const droplist = document.querySelectorAll('.drop__list select')

for (let i = 0; i < droplist.length; i++) {
    for (const currencyCode in countryCode) {
        let optionTag = ` <option value="${currencyCode}">${currencyCode}</option>`
        droplist[i].insertAdjacentHTML('beforeend', optionTag)
    }

}