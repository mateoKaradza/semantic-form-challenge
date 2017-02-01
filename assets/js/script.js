let supportedCards = [
  {
    id: 'visa-cc',
    pattern: '^4[0-9]{6,}$'
  },
  {
    id: 'mastercard-cc',
    pattern: '^5[1-5][0-9]{14}$'
  },
  {
    id: 'amex-cc',
    pattern: '^3[47][0-9]{5,}$'
  },
  {
    id: 'discover-cc',
    pattern: '^3(?:0[0-5]|[68][0-9])[0-9]{4,}$'
  }
]

function handleCreditCardInput(e) {
  for (let index in supportedCards) {
    let card = supportedCards[index];
    let regex = new RegExp(card.pattern);
    const inputValue = e.value.replace(/ /g, "");

    document.getElementById(card.id).className = "hide-cc";

    if (regex.test(inputValue))
      document.getElementById(card.id).className = "";
  }
}

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
