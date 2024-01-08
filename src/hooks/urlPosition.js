const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

async function urlPosition(arr) {
  try {
    const res = await fetch(
      `${BASE_URL}?latitude=${arr[0]}&longitude=${arr[1]}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error:", err);
  }
}

export default urlPosition;
