// Função principal para verificar e baixar a mídia
function downloadMedia() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    fetch(url, { method: 'HEAD' })
      .then(response => {
        const contentType = response.headers.get('Content-Type');
        if (contentType && (contentType.startsWith('image/') || contentType.startsWith('video/') || contentType.startsWith('audio/'))) {
          chrome.downloads.download({
            url: url,
            conflictAction: "uniquify"
          });
        } else {
          console.log("⚠️ URL não é uma mídia válida.");
        }
      })
      .catch(error => {
        console.error("Erro ao verificar o tipo de mídia:", error);
      });
  });
}

// Atalho de teclado (Ctrl+Shift+S)
chrome.commands.onCommand.addListener((command) => {
  if (command === "save-media") downloadMedia();
});

// Clique no ícone da extensão
chrome.action.onClicked.addListener((tab) => {
  downloadMedia();
});

// Notificação de download
// chrome.downloads.onCreated.addListener((downloadItem) => {
//  chrome.notifications.create({
//    type: "basic",
//    iconUrl: "icons/icon48.png",
//    title: "Download Iniciado ✅",
//    message: `Salvando: ${downloadItem.filename}`
//  });
//});