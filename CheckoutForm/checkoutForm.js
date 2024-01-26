document.getElementById('cardNumber').addEventListener('input', validateCardNumber);
document.getElementById('cardHolderName').addEventListener('input', validateCardHolderName);
document.getElementById('cvv').addEventListener('input', validateCVV);
document.getElementById('expirationDate').addEventListener('input', validateExpirationDate);
document.getElementById('expirationDate').addEventListener('input', validateExpirationDate);

let prevCardNumber = '';
let prevCardHolderName = '';
let prevCVV = '';
let prevDate = '';

function validateCardHolderName() 
{
  const cardHolderNameInput = document.getElementById('cardHolderName');
  const cardHolderNameErrorMessage = document.getElementById('cardHolderNameError');

  cardHolderNameInput.classList.remove('error');
  cardHolderNameErrorMessage.innerText = '';
  
  const nameregex = /^[a-zA-Z\s]+$/;


  if(cardHolderNameInput.value != "")
  {
    if (!nameregex.test(cardHolderNameInput.value)) 
    {
        cardHolderNameInput.classList.add('error');
        cardHolderNameErrorMessage.innerText = 'Name must contain only English characters.';
        return false;
    }
  }
  prevCardHolderName = cardHolderNameInput.value;
  return true;
}

function validateCardNumber() {
    const cardNumberInput = document.getElementById('cardNumber');
    const cardNumberErrorMessage = document.getElementById('cardNumberError');
    
    cardNumberInput.classList.remove('error');
    cardNumberErrorMessage.innerText = '';

  
    if(cardNumberInput.value != "")
    {
      if (cardNumberInput.value.length !== 16) 
      {
          cardNumberInput.classList.add('error');
          cardNumberErrorMessage.innerText = 'Please enter a valid 16-digit card number.';
          return false;
      }

      else if(!/^\d{16}$/.test(cardNumberInput.value))
      {
          cardNumberInput.classList.add('error');
          cardNumberErrorMessage.innerText = 'Card Number must contain only digits';
          return false;
      }
  }
  prevCardNumber = cardNumberInput.value;
  return true;
    
}


  function validateCVV()
  {
    const cvvInput = document.getElementById('cvv');
    const cvvErrorMessage = document.getElementById('cvvError');
    
    cvvInput.classList.remove('error');
    cvvErrorMessage.innerText = '';

    if(cvvInput.value != "")
    {
      if (cvvInput.value.length !== 3|| !/^\d{3}$/.test(cvvInput.value))
      {
          cvvInput.classList.add('error');
          cvvErrorMessage.innerText = 'CVV must contain 3 digits';
          return false;
      }
    }
    prevCVV = cvvInput.value;
    return true;
  }

  function validateExpirationDate() 
  {

    const expirationDateInput = document.getElementById('expirationDate');
    const expirationDateError = document.getElementById('expirationDateError');
  
    expirationDateInput.classList.remove('error');
    expirationDateError.innerText = '';

    if(expirationDateInput.value != "")
    {
      if(!/^\d{2}\/\d{2}$/.test(expirationDateInput.value))
      {
        expirationDateInput.classList.add('error');
        expirationDateError.innerText = 'Please enter a valid expiration date in MM/YY format.';
        return false;
      }
    
      const currentDate = new Date();
      const enteredDateParts = expirationDateInput.value.split('/');
      const enteredMonth = parseInt(enteredDateParts[0], 10);
      const enteredYear = parseInt(enteredDateParts[1], 10);
      const selectedDate = new Date(`20${enteredYear}-${enteredMonth}-01`);
    
      if (selectedDate <= currentDate) {
        expirationDateInput.classList.add('error');
        expirationDateError.innerText = 'Date must be a valid future date';
        return false;
      }
  }
  prevDate = expirationDateInput.value;
  return true;
  }

  function validateCreditCard() {
    const isCardNumberValid = validateCardNumber();
    const isCardHolderNameValid = validateCardHolderName();
    const isExpirationDateValid = validateExpirationDate();
    const isCvvValid = validateCVV();
  
    if(CheckFieldsAreEmpty())
    {
      alert('Please fill al the requried fills');
      return false;
    }
    else if (!isCardNumberValid || !isCardHolderNameValid || !isExpirationDateValid || !isCvvValid) {
      alert('Please correct the highlighted errors before continuing.');
      return false;
    }
    else
    {
      alert('Form submitted successfully!');
      return true;
    }
  }

  function CheckFieldsAreEmpty()
  {
    const cardHolderNameInput = document.getElementById('cardHolderName');
    const cardNumberInput = document.getElementById('cardNumber');
    const cvvInput = document.getElementById('cvv');
    const expirationDateInput = document.getElementById('expirationDate');

    if(cardHolderNameInput.value == '' || cardNumberInput.value == '' || cvvInput.value == '' || expirationDateInput.value == '')
    {
      return true
    }
    return false;
  }

  function submitForm() {
    if (validateCreditCard()) 
    {
      const form = document.getElementById('checkout_form');
      form.submit();
    }
  }





 
  