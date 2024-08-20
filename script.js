const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");

let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/Country.html?name=${country.name.common}`;
    const cardHTML = `
        <img src="${country.flags.svg}" alt="" />
        <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString(
              "en-IN"
            )}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital}</p>
        </div>`;

    countryCard.innerHTML = cardHTML;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  console.log(allCountriesData);
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});
