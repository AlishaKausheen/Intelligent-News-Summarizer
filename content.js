async function summarizeContent(text, wordCount) {
  const apiKey = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key
  const response = await fetch('https://api.gemini.com/v1/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ text: text, word_count: wordCount })
  });
  const data = await response.json();
  return data.summary;
}

function highlightText(keyPoints) {
  keyPoints.forEach(point => {
    let regex = new RegExp(point, 'gi');
    document.body.innerHTML = document.body.innerHTML.replace(regex, match => `<mark>${match}</mark>`);
  });
}

async function summarizePage(wordCount) {
  let pageText = document.body.innerText;
  let summary = await summarizeContent(pageText, wordCount);
  highlightText(summary.key_points);
  chrome.storage.local.set({ summary: summary.key_points });
}

// Remove this line, as summarizePage is called from popup.js with arguments
// summarizePage();
