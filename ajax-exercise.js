import axios from 'axios';

// PART 1: Show Dog Photo

// function showDogPhoto(evt) {
//   //*: get a random photo from the Dog API and show it in the #dog-image div
//   axios.get("https://dog.ceo/api/breeds/image/random")
//   .then((promise) => {
//     const imgUrl = promise.data.message
//     document.querySelector('#dog-image').innerHTML= `<img src=${imgUrl}>`
//   })
// }
async function showDogPhoto(evt) {
  const imgUrl = await axios.get("https://dog.ceo/api/breeds/image/random")
  document.querySelector('#dog-image').innerHTML= `<img src=${imgUrl.data.message}>`
  console.log(imgUrl)
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;
  //*: request weather with that URL and show the forecast in #weather-info
  axios.get(`/weather.txt?zipcode=${zipcode}`).then(response => {
    let forecast = response.data;
    document.querySelector('#weather-info').innerHTML= `<p>${forecast}</p>`
  })
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {

  evt.preventDefault() //*: Need to preventDefault here, because we're listening for a submit event!
  
  const cookieType = document.querySelector('#cookie-type-field').value;
  const qty = document.querySelector('#qty-field').value;
  const order = await axios.post(
    '/order-cookies.json',
    {cookieType: cookieType, qty: qty}
  );
  //FIXME-
  // const body = {qty: document.querySelector('#qty-field').value, cookieType: document.querySelector('#cookie-type-field').value}
  // const order = await axios.post('/order-cookies.json',{cookieType: cookieType, qty: qty})

  const orderStatus = document.querySelector('#order-status')
  orderStatus.innerText = order.data.message
  if(order.data.resultCode === "ERROR"){
    orderStatus.classList.add('order-error')
  } else {
    orderStatus.classList.remove('order-error')
  }
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;
  const formData = {'term': searchTerm};
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;
  const response = await axios.get(url);
  let displayString = "";
  for(const result of response.data.results) {
    displayString += `<li>Artist:${result.artistName} Song:${result.trackName}</li>`
  }
  document.querySelector('#itunes-results').innerHTML = displayString
  //*: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
