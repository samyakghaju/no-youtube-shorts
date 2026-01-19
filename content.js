let enabled = true;

chrome.storage.local.get(["enabled"], (res) => {
  enabled = res.enabled ?? true;
});

function removeShorts() {
  if (!enabled) return;

  document.querySelectorAll("ytd-rich-section-renderer").forEach(el => {
    if (el.innerText.includes("Shorts")) el.remove();
  });

  document.querySelectorAll("a").forEach(a => {
    if (a.href && a.href.includes("/shorts")) a.remove();
  });
}

setInterval(removeShorts, 2000);

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "toggle") {
    enabled = msg.enabled;
  }
});
