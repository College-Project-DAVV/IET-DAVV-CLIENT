export const adduser=(user)=> {
    const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
      const apiUrl = `${SERVER_BASE_URL}/adduser`;
      return  fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header for JSON data
          },
          body: JSON.stringify(user), // Convert the data to a JSON string
        })
          .then((response) => {
            if (!response.ok) {
              alert("Unable to add user")
              throw new Error(`Network response was not ok: ${response.status}`);
              return;
            }
            return response.json(); // Parse the response as JSON
          })
         
          .catch((error) => {
            // Handle errors, if any
            console.error('Error in POST request:', error);
          });
  }