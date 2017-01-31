function emailError() {
  let div = document.createElement("div");
  let warningIcon = document.createElement("img");
  let span = document.createElement("span");
  const text = document.createTextNode("Please enter a valid email address.");

  div.className = "alert";
  warningIcon.className = "warning";

  span.appendChild(text);
  div.appendChild(warningIcon);
  div.appendChild(span);

  insertAfter(email, div);
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
