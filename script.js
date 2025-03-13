
document.getElementById('getSettings').addEventListener('click', async () => {
    const response = await fetchAPI('getSettings');
    displayResponse(response);
});

document.getElementById('getStateInstance').addEventListener('click', async () => {
    const response = await fetchAPI('getStateInstance');
    displayResponse(response);
});

document.getElementById('sendMessage').addEventListener('click', async () => {
    const phone = document.getElementById('phoneNumber').value;
    const message = document.getElementById('messageText').value;
    const response = await fetchAPI('sendMessage', { chatId: `${phone}@c.us`, message });
    displayResponse(response);
});

document.getElementById('sendFileByUrl').addEventListener('click', async () => {
    const phone = document.getElementById('phoneNumber').value;
    const fileUrl = document.getElementById('fileUrl').value;
    const response = await fetchAPI('sendFileByUrl', { chatId: `${phone}@c.us`, urlFile: fileUrl });
    displayResponse(response);
});

async function fetchAPI(method, body = {}) {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/${method}/${apiTokenInstance}`;
    
    const options = body && Object.keys(body).length
        ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
        : { method: 'GET' };
    
    try {
        const response = await fetch(apiUrl, options);
        return await response.json();
    } catch (error) {
        return { error: 'Ошибка при запросе API' };
    }
}

function displayResponse(response) {
    document.getElementById('responseField').innerText = JSON.stringify(response, null, 2);
}
