$(document).ready(function () {

  const loginForm = $('form.login');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // Validate that email and pass aren't blank
  loginForm.on('submit', function (event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
    return;
    }

  // If we have an email and password, we run loginUser()
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  // loginUser does post to api/index and redirects
  function loginUser(email, password) {
    $.post('/api/index', {
    email: email,
    password: password,
    })
      .then(function() {
      window.location.replace('/search');
      })
      .catch(function(err) {
      console.log(err);
      });
  }
});

