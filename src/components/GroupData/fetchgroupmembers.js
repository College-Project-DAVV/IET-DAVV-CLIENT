export const fetchDataFromAPI=(groupid)=> {
    const apiUrl = `http://localhost:3001/groupmembers`;
    const data = localStorage.getItem('FetchUserToken');
    return  fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header for JSON data
        },
        body: JSON.stringify({"token":data,"groupid":groupid}), // Convert the data to a JSON string
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json(); // Parse the response as JSON
        })
       
        .catch((error) => {
          // Handle errors, if any
          console.error('Error in POST request:', error);
        });
}