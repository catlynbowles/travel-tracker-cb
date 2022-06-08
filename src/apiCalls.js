//FETCH REQUESTS
export function fetchAllData() {
  let apis = [
    'http://localhost:3001/api/v1/travelers',
    'http://localhost:3001/api/v1/trips',
    'http://localhost:3001/api/v1/destinations',
  ];

  let endpoints = apis.map((url) => {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
  })

  const allData = Promise.all(endpoints).then((value) => {
    return value;
  });

  return allData;
}
