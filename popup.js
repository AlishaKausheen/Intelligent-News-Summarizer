document.getElementById('summarizeButton').addEventListener('click', () => {
  const wordCount = document.getElementById('wordCount').value;
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: summarizePage,
      args: [wordCount]
    });
  });
});

chrome.storage.local.get('summary', (data) => {
  const summaryOutput = document.getElementById('summaryOutput');
  summaryOutput.innerHTML = '';
  if (data.summary) {
    data.summary.forEach(point => {
      let p = document.createElement('p');
      p.textContent = point;
      summaryOutput.appendChild(p);
    });
  } else {
    summaryOutput.textContent = 'No summary available.';
  }
});

function summarizePage(wordCount) {
  // Placeholder function
}
