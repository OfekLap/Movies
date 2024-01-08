function useCountries() {
  // Your API key
  const apiKey = "ff3a351a-0bd2-4c43-a6da-9bcae781b228";

  // Fetch bearer token
  fetch("https://api4.thetvdb.com/v4/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      apikey: apiKey,
      // Include other required fields for authentication if needed
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Authentication error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((authData) => {
      const bearerToken = authData.data.token;

      // Fetch the list of countries with the bearer token
      fetch("https://api4.thetvdb.com/v4/countries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Handle the list of countries
          const countries = data.data;
          console.log(countries);
        })
        .catch((error) => {
          // Handle errors during the second fetch
          console.error("Fetch error:", error);
        });
    })
    .catch((error) => {
      // Handle authentication errors
      console.error("Authentication error:", error);
    });
}

export default useCountries;
