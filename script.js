// Selecting all inputField elements
const dayInp = document.getElementById('day');
const monthInp = document.getElementById('month');
const yearInp = document.getElementById('year');

// Selecting all outputs
const dayOut = document.getElementById('DD');
const monthOut = document.getElementById('MM');
const yearOut = document.getElementById('YY');

// Form element
const form = document.querySelector('form');

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Values for comparison
const MAX_MONTH = 12;
const MIN_MONTH = 1;
const MAX_DAY = 31;
const MIN_DAY = 1;

const setErrorState = (inputField, errorMsg) => {
  const parent = inputField.parentElement;
  inputField.style.border = '1px solid hsl(0, 100%, 67%)';
  parent.querySelector('.error').textContent = errorMsg;
  parent.querySelector('.form-label').style.color = 'hsl(0, 100%, 67%)';
};

const resetErrorState = (inputField) => {
  const parent = inputField.parentElement;
  inputField.style.border = '1px solid hsl(0, 0%, 86%)';
  parent.querySelector('.error').textContent = '';
  parent.querySelector('.form-label').style.color = 'hsl(0, 1%, 44%)';
};

const validate = () => {
  const inputFields = document.querySelectorAll('input');
  let isValid = true;

  inputFields.forEach((inputField) => {
    // Resetting error state
    resetErrorState(inputField);

    // Checking if inputField is empty
    if (!inputField.value) {
      setErrorState(inputField, 'This field is required');
      isValid = false;
    }

    // Checking if inputField is a valid month
    if (monthInp.value > MAX_MONTH || monthInp.value < MIN_MONTH) {
      setErrorState(monthInp, 'Must be a valid month');
      isValid = false;
    }

    // Checking if inputField is a valid day
    if (
      dayInp.value > months[monthInp.value - 1] ||
      dayInp.value > MAX_DAY ||
      dayInp.value < MIN_DAY
    ) {
      setErrorState(dayInp, 'Must be a valid day');
      isValid = false;
    }

    // Checking if inputField is a valid year
    if (yearInp.value > year) {
      setErrorState(yearInp, 'Must be in the past');
      isValid = false;
    }

    if (isValid) {
      resetErrorState(inputField);
      isValid = true;
    }
  });

  return isValid;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (dayInp.value > day) {
      day = day + months[month - 1];
      month = month - 1;
    }

    if (monthInp.value > month) {
      month = month + 12;
      year = year - 1;
    }

    const d = day - dayInp.value;
    const m = month - monthInp.value;
    const y = year - yearInp.value;

    console.log(d, m, y);

    dayOut.textContent = d;
    monthOut.textContent = m;
    yearOut.textContent = y;
  }
};

// Adding eventlistener to button
form.addEventListener('submit', handleSubmit);
