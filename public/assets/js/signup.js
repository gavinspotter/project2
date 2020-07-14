$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const emailInput = $('input#email-signup');
  const passwordInput = $('input#password-signup');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    signUpUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });
  // If we have an email and password, run the signUpUser function
  function signUpUser(email, password) {
    $.post('/api/signup', {
      email: email,
      password: password,
    })
      .then(() => {
        // grab new user info
        let user = {};
        $.post('/api/user_data').then((res) => {
          // set user info to the response
          user = { id: res.id, email: res.email };
          // post request to mealplans and create a new plan for the user
          $.post(`/api/mealplans/${user.id}`).then(() => {
            // redirect the user to the search page now that they're logged in
            window.location.replace('/search');
          });
        });
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
});

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
