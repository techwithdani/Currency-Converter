// Base URL for sending request to API
let baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Selecting elements from HTML file with DOM
let dropdownMenu = document.querySelectorAll(".dropdown-menu select");
let amount = document.querySelector(".amount");
let fromCurrency = document.querySelector(".select-from select");
let toCurrency = document.querySelector(".select-to select");
let message = document.querySelector(".conversion-message");
let button = document.querySelector(".exchange-rate-button");

const selectCurrency = () => {
    // Loop to access the select elements and adding options to them according to the countries list file
    for(let select of dropdownMenu) {
        // Loop to get currency code from countries list (key)
        for(currencyCode in countriesList) {
            // Creating option elements in select to add currency codes
            let options = document.createElement("option");
            options.innerText = currencyCode;
            options.value = currencyCode;

            // Condition to keep default selection of USD for "from" and PKR for "to"
            if (options.value === "USD" && select.name === "from") {
                options.selected = "selected";
            }

            if (options.value === "EUR" && select.name === "to") {
                options.selected = "selected";
            }

            // Appending all the options created in select element
            select.append(options);
        }

        // Adding event listener to select for tracking the change in options
        select.addEventListener("change", (evt) => {
            flagUpdate(evt.target);
        });
    }
}

// Function to update the flag
const flagUpdate = (element) => {
    // Accessing flag image from parent element of select element
    let flagImage = element.parentElement.querySelector("img");
    // Getting the value of currency code from select element
    let currencyCode = element.value;
    // Getting the country code from countries list
    let countryCode = countriesList[currencyCode];
    // Generating a new link using country code for different currencies
    let newSource = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    // Updating the flag image according to selected currency
    flagImage.src = newSource;
}

// Function to calculate exchange rate
const calculateAmount = (rate) => {
    // Getting the amount value
    let amountValue = amount.value;
    // Condition to check if the value is negative or zero
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }

    // Calculating exchange rate with the given amount by the user
    let calculatedAmount = amountValue * rate;
    return calculatedAmount;
}

// Displaying the exchange rate after calculation
const displayExchangeRate = (amount, exchangeRate) => {
    message.innerText = `${amount} ${fromCurrency.value} = ${exchangeRate} ${toCurrency.value}`;
}

// Function to send request to API and get data from it in form of JSON
const getExchangeRate = async () => {
    // Creating URL with Currency endpoints
    let URL = `${baseUrl}/${fromCurrency.value.toLowerCase()}.json`;
    // Getting response from API
    let response = await fetch(URL);
    // Converting that response from promise to JSON
    let data = await response.json();
    // Getting Exchange rate by accessing data of the specified currency
    let exchangeRate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    // Storing the returned calculation in variable
    let finalAmount = calculateAmount(exchangeRate);
    // Calling displayExchangeRate function
    displayExchangeRate(amount.value, finalAmount);

}

// Function to run the converter
const runConverter = () => {
    // Function called to select the currency from dropdown menu
    selectCurrency();
    // Event listener to provide exchange rate
    button.addEventListener("click", (evt) => {
        // To prevent default behaviour of the form
        evt.preventDefault();
        getExchangeRate();
    });
    // On refresh, the amount value will be null
    window.addEventListener("load", () => {
        amount.value = "";
    });
}

// Function to run the app
runConverter();