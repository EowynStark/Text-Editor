import { putDb } from './database.js';
const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA

// event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';
});

// click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
    deferredPrompt = null;
    butInstall.style.display = 'none';
    }
});

// handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('JATE was installed', event);
    putDb({ event: 'installed', timestamp: new Date() });
    fetch('/api/install', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: 'installed', timestamp: new Date() }),
    });
});
