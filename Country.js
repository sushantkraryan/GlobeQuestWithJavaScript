// const urlParams = new URLSearchParams(window.location.search);
// const myParam = urlParams.get('name');
// const countryName = myParam;

// -> In Short
const countryName = new URLSearchParams(location.search).get("name");
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data[0]);
  });
