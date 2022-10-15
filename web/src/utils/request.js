const baseUrl = "http://localhost:8080";

async function getData(url) {
  const result = await fetch(`${baseUrl}${url}`);
  const data = await result.json();
  return data;
}

export default getData;
