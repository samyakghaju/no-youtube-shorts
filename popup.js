document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");

  chrome.storage.local.get(["enabled"], (res) => {
    const enabled = res.enabled ?? true;
    setToggle(enabled);
  });

  function setToggle(state) {
    if (state) toggle.classList.add("on");
    else toggle.classList.remove("on");
  }

  toggle.addEventListener("click", () => {
    chrome.storage.local.get(["enabled"], (res) => {
      const enabled = !(res.enabled ?? true);

      chrome.storage.local.set({ enabled });

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "toggle",
            enabled
          });
        }
      });

      setToggle(enabled);
    });
  });
});
