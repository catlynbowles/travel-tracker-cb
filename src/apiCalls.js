//FETCH REQUESTS
import {displayAPIError} from './scripts'

export function fetchAllData() {
  let apis = [
    'http://localhost:3001/api/v1/travelers',
    'http://localhost:3001/api/v1/trips',
    'http://localhost:3001/api/v1/destinations',
  ];

  let endpoints = apis.map((url) => {
    return fetch(url)
    .then(response => checkForError(response))
    .catch(error => displayAPIError(error));
  })

  const allData = Promise.all(endpoints).then((value) => {
    return value;
  });

  return allData;
}

export function addUserTravelData(dataToTransmit) {
  var response = fetch('http://localhost:3001/api/v1/trips', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(dataToTransmit)
}).then(response => checkForError(response))
  .catch(error => displayAPIError(error))

  return response;
}

export function checkForError(response) {
  if (!response.ok) {
    throw new Error('Oops, something went wrong. Check back again with us soon while we resolve the issue!')
  } else {
    return response.json()
  }
}

// export function displayErrorMessage(error) {
//   console.log(Object.keys(error))
//   console.log(error.message)
//   userDashboardDisplay.innerHTML = `${error}, please try again later!`
// }
