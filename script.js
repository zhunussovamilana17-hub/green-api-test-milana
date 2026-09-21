const API_URL = 'https://api.green-api.com';

function getAuthParams() {
  const idInstance = document.getElementById('idInstance').value.trim();
  const apiTokenInstance = document.getElementById('apiTokenInstance').value.trim();

  if (!idInstance || !apiTokenInstance) {
    alert('Пожалуйста, введите idInstance и apiTokenInstance!');
    return null;
  }
  return { idInstance, apiTokenInstance };
}

function printResponse(data) {
  document.getElementById('responseOutput').value = JSON.stringify(data, null, 2);
}

// 1. getSettings
async function getSettings() {
  const auth = getAuthParams();
  if (!auth) return;

  try {
    const response = await fetch(`${API_URL}/waInstance${auth.idInstance}/getSettings/${auth.apiTokenInstance}`);
    const data = await response.json();
    printResponse(data);
  } catch (error) {
    printResponse({ error: error.message });
  }
}

// 2. getStateInstance
async function getStateInstance() {
  const auth = getAuthParams();
  if (!auth) return;

  try {
    const response = await fetch(`${API_URL}/waInstance${auth.idInstance}/getStateInstance/${auth.apiTokenInstance}`);
    const data = await response.json();
    printResponse(data);
  } catch (error) {
    printResponse({ error: error.message });
  }
}

// 3. sendMessage
async function sendMessage() {
  const auth = getAuthParams();
  if (!auth) return;

  const phoneNumber = document.getElementById('chatIdMessage').value.trim();
  const message = document.getElementById('messageText').value;

  if (!phoneNumber || !message) {
    alert('Заполните номер телефона и текст сообщения!');
    return;
  }

  const chatId = `${phoneNumber}@c.us`;

  try {
    const response = await fetch(`${API_URL}/waInstance${auth.idInstance}/sendMessage/${auth.apiTokenInstance}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, message })
    });
    const data = await response.json();
    printResponse(data);
  } catch (error) {
    printResponse({ error: error.message });
  }
}

// 4. sendFileByUrl
async function sendFileByUrl() {
  const auth = getAuthParams();
  if (!auth) return;

  const phoneNumber = document.getElementById('chatIdFile').value.trim();
  const url = document.getElementById('fileUrl').value.trim();

  if (!phoneNumber || !url) {
    alert('Заполните номер телефона и URL файла!');
    return;
  }

  const chatId = `${phoneNumber}@c.us`;
  const fileName = url.substring(url.lastIndexOf('/') + 1) || 'file';

  try {
    const response = await fetch(`${API_URL}/waInstance${auth.idInstance}/sendFileByUrl/${auth.apiTokenInstance}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, urlFile: url, fileName })
    });
    const data = await response.json();
    printResponse(data);
  } catch (error) {
    printResponse({ error: error.message });
  }
}