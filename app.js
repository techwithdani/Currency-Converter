// Base URL for sending request to API
let baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Selecting elements from HTML file with DOM
let dropdownMenu = document.querySelectorAll(".dropdown-menu select");
let amount = document.querySelector(".input-amount input");

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

        if (options.value === "PKR" && select.name === "to") {
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