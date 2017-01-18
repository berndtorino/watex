var mo = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.addedNodes == undefined) continue;
    for (let addedNode of mutation.addedNodes) {
      if (addedNode.classList != undefined && !addedNode.classList.contains("msg") && !addedNode.classList.contains("message")
          && !addedNode.classList.contains("pane-chat") && addedNode.getElementsByClassName != undefined) continue;
      for (let mt of addedNode.getElementsByClassName("message-text")) {
        renderMathInElement(mt, {delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "\\[", right: "\\]", display: true},
          {left: "\\(", right: "\\)", display: false},
          {left: "$", right: "$", display: false}
        ]});
      }
    }
  }
});

mo.observe(document.body, {
  childList: true,
  subtree: true
});
