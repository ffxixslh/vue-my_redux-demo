const baseUrl = "http://localhost:8080";

async function getData({ method, url, data }) {
  const result = await fetch(`${baseUrl}${url}`, {
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: method,
    body: JSON.stringify(data),
  });
  const resultData = await result.json();
  return resultData;
}

export default getData;
