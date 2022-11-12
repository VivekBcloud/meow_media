const API_URL = "http://localhost:3000";

export default function fetcher(url: string, data?: any, method?: string) {
  return fetch(`${API_URL}/api${url}`, {
    method: method ? method : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status < 200 && res.status > 399) {
      throw new Error();
    }
    return res.json();
  });
}
