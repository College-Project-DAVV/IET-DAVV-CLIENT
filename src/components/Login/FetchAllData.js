export function fetchDataFromAPI() {
    const apiUrl = `http://localhost:3001/fetchuser`;
    const data = localStorage.getItem('FetchUserToken');
    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header for JSON data
        },
        body: JSON.stringify({"token":data}), // Convert the data to a JSON string
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json(); // Parse the response as JSON
        })
        .then((responseData) => {
          // Handle the response data
          console.log(responseData);
        })
        .catch((error) => {
          // Handle errors, if any
          console.error('Error in POST request:', error);
        });
}