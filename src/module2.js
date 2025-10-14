function dragstartHandler(ev) {
  // Add different types of drag data
  ev.dataTransfer.setData("text/plain", ev.target.innerText);
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
  ev.dataTransfer.setData(
    "text/uri-list",
    ev.target.ownerDocument.location.href,
  );
}

// 1. Use querySelectorAll to get a list of ALL matching elements
const paragraphs = document.querySelectorAll(".pdrag");

// 2. Loop through the list and add the event listener to EACH element
paragraphs.forEach(p => {
  p.addEventListener("dragstart", dragstartHandler);
});


const target = document.querySelectorAll(".target");

paragraphs.forEach(p => {
target.addEventListener("dragover", (ev) => {
  ev.preventDefault();
}});

target.addEventListener("drop", (ev) => {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text/plain");
  ev.target.textContent = data; // Changed to textContent to replace the "a"
});