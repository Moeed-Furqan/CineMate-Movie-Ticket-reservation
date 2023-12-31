// Require Axios
const axios = require("axios");

// Your POST request
const postData = async () => {
  try {
    // Define the URL of your backend endpoint
    const backendUrl = "http://localhost:8000/booking/";

    // Object to be sent in the POST request body
    const data = { id: 1 };

    // Make a POST request using Axios
    const response = await axios.post(backendUrl, data);

    // Handle the response
    console.log("Response from the server:", response.data);
  } catch (error) {
    // Handle errors
    console.error("Error making POST request:", error);
  }
};

// Call the postData function
postData();
