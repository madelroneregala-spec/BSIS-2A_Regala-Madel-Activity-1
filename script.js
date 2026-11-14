'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const modalElement = document.getElementById('confirmationModal');
  const confirmationModal = new bootstrap.Modal(modalElement);
  const confirmButton = document.getElementById('confirmSubmit');
  const successAlert = document.getElementById('successAlert');

  const fields = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    gender: document.getElementById('gender'),
    contact: document.getElementById('contact'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword')
  };

  function setReviewValue(elementId, value) {
    // textContent prevents user-entered text from being interpreted as HTML.
    document.getElementById(elementId).textContent = value.trim() || '—';
  }

  function passwordsMatch() {
    const matches = fields.password.value === fields.confirmPassword.value;
    fields.confirmPassword.setCustomValidity(matches ? '' : 'Passwords do not match.');
    document.getElementById('confirmFeedback').textContent =
      matches ? 'Please confirm your password.' : 'Passwords do not match.';
    return matches;
  }

  fields.confirmPassword.addEventListener('input', passwordsMatch);
  fields.password.addEventListener('input', passwordsMatch);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successAlert.classList.add('d-none');
    passwordsMatch();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      form.reportValidity();
      return;
    }

    setReviewValue('reviewName', fields.fullName.value);
    setReviewValue('reviewEmail', fields.email.value);
    setReviewValue('reviewGender', fields.gender.value);
    setReviewValue('reviewContact', fields.contact.value);
    setReviewValue('reviewUsername', fields.username.value);

    confirmationModal.show();
  });

  confirmButton.addEventListener('click', () => {
    confirmationModal.hide();
    successAlert.classList.remove('d-none');
    successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    form.reset();
    form.classList.remove('was-validated');
    fields.confirmPassword.setCustomValidity('');
  });
});
