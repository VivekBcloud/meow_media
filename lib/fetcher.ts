export default function fetcher(url: string, data: any) {
    return fetch(`${window.location.origin}/api${url}`, {
        method: data ? "POST" : "GET",
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
