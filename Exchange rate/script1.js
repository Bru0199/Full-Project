const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)

        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two];
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}

function updateCurrencyTwoOptions() {
    // const selectedCurrency = currencyEl_one.value;
    // const optionsArray = Array.from(currencyEl_one.options);
    // const filteredOptions = optionsArray.filter(option => option.value !== selectedCurrency);
    // currencyEl_two.innerHTML = filteredOptions.map(option => `<option value="${option.value}">${option.text}</option>`).join('');

    const selectedCurrency = currencyEl_one.value;
    const optionsArray = Array.from(currencyEl_one.options);

    // Add default currency (USD) to options array if it's not already included
    const defaultOption = optionsArray.find(option => option.value === 'USD');
    if (!defaultOption) {
        optionsArray.unshift(new Option('USD', 'USD'));
    }

    // Filter out the selected currency and update options in currencyEl_two
    const filteredOptions = optionsArray.filter(option => option.value !== selectedCurrency);
    currencyEl_two.innerHTML = filteredOptions.map(option => `<option value="${option.value}">${option.text}</option>`).join('');

    calculate();

}
currencyEl_one.addEventListener('change', updateCurrencyTwoOptions);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});
updateCurrencyTwoOptions();


