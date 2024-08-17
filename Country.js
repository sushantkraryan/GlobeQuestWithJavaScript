// const urlParams = new URLSearchParams(window.location.search);
// const myParam = urlParams.get('name');
// const countryName = myParam;

// -> In Short
const countryName = new URLSearchParams(location.search).get("name");
const countryDetails = document.querySelector(".country-details");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    const detailsHTML = `<img src="${country.flags.svg}" alt="flag" />
        <div class="details-text-container">
          <h1>${country.name.common}</h1>
          <div class="details-text">
            <p><b>Native Name: </b> <span>${
              country.name.nativeName
                ? Object.values(country.name.nativeName)[0].common
                : country.name.common
            }<span/></p>
            <p><b>Population: </b> ${country.population.toLocaleString(
              "en-IN"
            )}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Sub Region: </b>${
              country.subregion ? country.subregion : ""
            }</p>
            <p><b>Capital: </b>${
              country.capital ? country.capital.join(", ") : ""
            }</p>
            <p><b>Top Level Domain: </b>${country.tld.join(", ")}</p>
            <p><b>Currencies: </b>${
              country.currencies
                ? Object.values(country.currencies)
                    .map((currency) => currency.name)
                    .join(", ")
                : ""
            }</p>
            <p><b>Languages: </b>${
              country.languages
                ? Object.values(country.languages).join(", ")
                : ""
            }</p>
          </div>
          <div class="border-countries">
              <b>Border Countries: </b>&nbsp;
          </div>
        </div>`;

    countryDetails.innerHTML = detailsHTML;

    const borderCountries = document.querySelector(".border-countries");

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });
