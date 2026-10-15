/* NextPlay waitlist: signup form handling.

   Signups go to MailerLite using the address from your embedded form's code.
   Each signup type below points at one MailerLite form, and each MailerLite form
   adds people to one group. Right now every type uses the same form. To split
   people into groups, make one MailerLite form per group, copy each form's
   "subscribe" address (the action="..." in its embed code), and paste it next to
   the matching type below.

   Types: dev, creator, both are the three choices on the top form.
          founding-developer and founding-creator are the two founding forms.
*/
var CREATORS_FORM = "https://assets.mailerlite.com/jsonp/2710873/forms/201268033421837762/subscribe";
var DEVELOPERS_FORM = "https://assets.mailerlite.com/jsonp/2710873/forms/201356483787491115/subscribe";
var FOUNDING_FORM = "https://assets.mailerlite.com/jsonp/2710873/forms/201357096804943067/subscribe";
var DEFAULT_FORM = CREATORS_FORM;

var FORM_ENDPOINTS = {
  "dev": DEVELOPERS_FORM,
  "creator": CREATORS_FORM,
  "both": DEVELOPERS_FORM,
  "founding-developer": FOUNDING_FORM,
  "founding-creator": FOUNDING_FORM
};

(function () {
  "use strict";

  function showError(form, message) {
    var box = form.querySelector(".form-error");
    if (!box) return;
    box.textContent = message;
    box.hidden = !message;
  }

  function showSuccess(form) {
    var wrapper = form.closest(".signup, .founding-signup");
    var success = wrapper && wrapper.querySelector(".success");
    form.hidden = true;
    if (success) {
      success.hidden = false;
      success.focus();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    showError(form, "");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Hidden trap field: real people never fill it in, bots often do.
    var trap = form.elements["_gotcha"];
    if (trap && trap.value) {
      showSuccess(form);
      return;
    }

    var role = form.elements["role"] ? form.elements["role"].value : "";
    var endpoint = FORM_ENDPOINTS[role] || DEFAULT_FORM;

    // Same fields MailerLite's own embedded form sends.
    var body = new URLSearchParams();
    body.append("fields[email]", form.elements["email"].value.trim());
    body.append("ml-submit", "1");
    body.append("anticsrf", "true");

    var button = form.querySelector('button[type="submit"]');
    var label = button.textContent;
    button.disabled = true;
    button.textContent = "Sending...";

    // no-cors: the browser sends the signup but can't read MailerLite's reply,
    // so a request that goes through is treated as success.
    fetch(endpoint, { method: "POST", mode: "no-cors", body: body })
      .then(function () {
        showSuccess(form);
      })
      .catch(function () {
        showError(form, "Something went wrong. Please try again in a minute.");
        button.disabled = false;
        button.textContent = label;
      });
  }

  var forms = document.querySelectorAll("form[data-signup]");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", handleSubmit);
  }
})();

  
    
    
