const base = 'https://auth-qa.qencode.com'

export async function sendFetchRequest(url, method, data, token) {
    const headers = {
        'Content-Type': 'application/json',
    };

    const options = {
        method: method,
        headers: headers,
    };

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (method === 'POST' && data) {
        options.body = JSON.stringify(data);
    }

    return await fetch(base + url, options)
        .then(async response => {
            return await response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}