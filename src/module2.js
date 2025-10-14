function dragstartHandler(ev) {
  // Add different types of drag data
  ev.dataTransfer.setData("text/plain", ev.target.innerText);
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
  ev.dataTransfer.setData(
    "text/uri-list",
    ev.target.ownerDocument.location.href,
  );
}

const paragraphs = document.querySelectorAll(".pdrag");

paragraphs.forEach(p => {
  p.addEventListener("dragstart", dragstartHandler);
});

// 1. Select all elements with the "target" class
const targets = document.querySelectorAll(".target");

// 2. Loop through each target and add the necessary event listeners
targets.forEach(target => {
  // Cancel dragover so that drop can fire
  target.addEventListener("dragover", (ev) => {
    ev.preventDefault();
  });

  target.addEventListener("drop", (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.textContent = data;
  });
});