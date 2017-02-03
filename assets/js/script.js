var supportedCards = [
  { id: 'visa-cc', pattern: '^4[0-9]{6,}$' },
  { id: 'mastercard-cc', pattern: '^5[1-5][0-9]{14}$' },
  { id: 'amex-cc', pattern: '^3[47][0-9]{5,}$' },
  { id: 'discover-cc', pattern: '^3(?:0[0-5]|[68][0-9])[0-9]{4,}$' }
];

var inputFieldsToCheck = [
  { id: 'subdomain', pattern: '[a-zA-z0-9]{3}', errorMessage: 'Subdomain should be at least 3 characters long' },
  { id: 'full-name', pattern: '[a-zA-z0-9]{1}', errorMessage: 'Name is required' },
  { id: 'email', pattern: '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}', errorMessage: 'Email is not in correct format' },
  { id: 'password', pattern: '[a-zA-z0-9]{6}', errorMessage: 'Password should be at least 6 characters long' },
  { id: 'cc-number', pattern: '[0-9]{4}\\s?[0-9]{4}\\s?[0-9]{4}\\s?[0-9]{4}', errorMessage: 'Please fill in the credit card info using the right format' },
  { id: 'security-code', pattern: '[0-9]{3,4}', errorMessage: 'Security code should be in correct format', errorTarget: 'lastRowDiv' },
  { id: 'expiration-date', pattern: '[0-9]{1}', errorMessage: 'Expiration number is required', errorTarget: 'lastRowDiv' },
  { id: 'expiration-year', pattern: '[0-9]{4}', errorMessage: 'Expiration year is required', errorTarget: 'lastRowDiv' }
]

function handleCreditCardInput(e) {
  for (var index in supportedCards) {
    var card = supportedCards[index];
    var regex = new RegExp(card.pattern);
    var inputValue = e.value.replace(/ /g, "");

    var className = card.id + "-label";

    document.getElementById(card.id).className = className;

    if (regex.test(inputValue))
      document.getElementById(card.id).className = className + " full-opacity";
  }
}

function handlePasswordReveal(e) {
  if (e.checked)
    return document.getElementById("password").type = "text";
  document.getElementById("password").type = "password";
}

function clearError(errorElementId) {
  var errorDiv = document.getElementById(errorElementId);

  if (errorDiv)
    errorDiv.remove();
}

function generateError(message, errorElementId, elementId) {
  clearError(errorElementId);

  var div = document.createElement("div");
  var warningIcon = document.createElement("img");
  var span = document.createElement("span");
  var text = document.createTextNode(message);

  var element = document.getElementById(elementId);

  div.className = "alert";
  div.id = errorElementId;
  warningIcon.className = "warning";

  span.appendChild(text);
  div.appendChild(warningIcon);
  div.appendChild(span);

  if (elementId == 'cc-number')
    return insertAfter(element.parentElement, div);

  insertAfter(element, div);
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function validateCard(value) {
  var validated = false;

  for (var index in supportedCards) {
    var card = supportedCards[index];
    var regex = new RegExp(card.pattern);
    var inputValue = value.replace(/ /g, "");

    if (regex.test(inputValue))
      validated = true;
  }

  return validated;
}

function onSubmit(e) {
  var errored = false;
  e.preventDefault();

  for (var index in inputFieldsToCheck) {
    var field = inputFieldsToCheck[index];
    var element2 = document.getElementById(field.id);
    if (!element2) continue;
    var value = element2.value;

    var regex = new RegExp(field.pattern);

    if (!regex.test(value)) {
      if (!field.errorTarget)
        generateError(field.errorMessage, field.id + '-error', field.id );
      else {
        generateError(field.errorMessage, field.id + '-error', field.errorTarget );
      }
      errored = true;
    } else
      clearError(field.id + '-error');

    if (field.id == 'cc-number') {
      if (!validateCard(value)) {
        errored = true;
        generateError(field.errorMessage, field.id + '-error', field.id );
      }
    }
  }

  if (!errored) {
    document.getElementById('signup-form').submit();
  }
}
