const API_URL = 'http://localhost:3000';

export default async function fetcher<T>(
    url: string,
    data?: unknown,
    method?: string
): Promise<T> {
    const res = await fetch(`${API_URL}/api${url}`, {
        method: method ? method : 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (res.status < 200 && res.status > 399) {
        throw new Error();
    }
    return await res.json();
}
