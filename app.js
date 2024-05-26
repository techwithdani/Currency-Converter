// Base URL for sending request to API
let baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Selecting elements from HTML file with DOM
let dropdownMenu = document.querySelectorAll(".dropdown-menu select");

// Loop to access the select elements and adding options to them according to the countries list file
for(let select of dropdownMenu) {
    for(currencyCode in countriesList) {
        // Creating option elements in select to add currencies code
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
}