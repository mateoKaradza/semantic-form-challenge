function handlePasswordReveal(e) {
  if (e.checked)
    return document.getElementById("password").type = "text";
  document.getElementById("password").type = "password";
}

function clearError() {
  const emailErrorDiv = document.getElementById("emailError");

  if (emailErrorDiv)
    emailErrorDiv.remove();
}

function emailError() {
  clearError();
  
  let div = document.createElement("div");
  let warningIcon = document.createElement("img");
  let span = document.createElement("span");
  const text = document.createTextNode("Please enter a valid email address.");

  const email = document.getElementById("email");

  div.className = "alert";
  div.id = "emailError";
  warningIcon.className = "warning";

  span.appendChild(text);
  div.appendChild(warningIcon);
  div.appendChild(span);

  insertAfter(email, div);
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
