document.getElementById('converter-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    // Fetching exchange rate from API (e.g., exchangerate-api)
    const apiKey = 'YOUR_API_KEY';  // Replace with your own API key
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const convertedAmount = data.conversion_result;
                document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            } else {
                alert('Error fetching conversion rate.');
            }
        })
        .catch(error => {
            console.error('Error fetching the conversion rate:', error);
            alert('Failed to get conversion rate.');
        });
});
