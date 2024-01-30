document.getElementById('cardNumber').addEventListener('input', validateCardNumber);
document.getElementById('cardHolderName').addEventListener('input', validateCardHolderName);
document.getElementById('cvv').addEventListener('input', validateCVV);
document.getElementById('expirationDate').addEventListener('input', validateExpirationDate);
document.getElementById('expirationDate').addEventListener('input', validateExpirationDate);


//To hold the prev inputs so the user can corrent them
let prevCardNumber = '';
let prevCardHolderName = '';
let prevCVV = '';
let prevDate = '';

document.addEventListener('DOMContentLoaded', function() {
  const discountedPrice = window.localStorage.getItem('discounted_price');

  // Update the span element in html
  const discountedPriceSpan = document.getElementById('discounted_price');
  if (discountedPriceSpan) {
      discountedPriceSpan.textContent = discountedPrice + " ₪"|| 'N/A'; //if the value is not available (not sure if will happen)
  }
});

function validateCardHolderName() 
{
  const cardHolderNameInput = document.getElementById('cardHolderName');
  const cardHolderNameErrorMessage = document.getElementById('cardHolderNameError');

  cardHolderNameInput.classList.remove('error');
  cardHolderNameErrorMessage.innerText = '';
  
  const nameRegex = /^[a-zA-Z\s]+$/;

  if(cardHolderNameInput.value != "")
  {
    if (!nameRegex.test(cardHolderNameInput.value)) 
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
      const carNumberRegex = /^\d*$/;

      if(!carNumberRegex.test(cardNumberInput.value))
      {
          cardNumberInput.classList.add('error');
          cardNumberErrorMessage.innerText = 'Card Number must contain only digits';
          return false;
      }
      if (cardNumberInput.value.length !== 16) 
      {
          cardNumberInput.classList.add('error');
          cardNumberErrorMessage.innerText = 'Please enter a valid 16-digit card number.';
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
    const cvvRegex = /^\d{3}$/;

    if(cvvInput.value != "")
    {
      if (cvvInput.value.length !== 3|| !cvvRegex.test(cvvInput.value))
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

    const DateRegex = /^\d{2}\/\d{2}$/;

    if(expirationDateInput.value != "")
    {
      if(!DateRegex.test(expirationDateInput.value))
      {
        expirationDateInput.classList.add('error');
        expirationDateError.innerText = 'Please enter a valid date in MM/YY format.';
        return false;
      }
    
      const currentDate = new Date();
      const enteredDateParts = expirationDateInput.value.split('/');
      const enteredMonth = parseInt(enteredDateParts[0], 10);
      const enteredYear = parseInt(enteredDateParts[1], 10);
      if(enteredMonth < 1 || enteredMonth>12)
      {
        expirationDateInput.classList.add('error');
        expirationDateError.innerText = 'Please enter a valid expiration date in MM/YY format.';
        return false;
      }
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

  function validateAllPaymentDetails() 
  {
    if(CheckFieldsAreEmpty())
    {
      return false;
    }

    const isCardNumberValid = validateCardNumber();
    const isCardHolderNameValid = validateCardHolderName();
    const isExpirationDateValid = validateExpirationDate();
    const isCvvValid = validateCVV();
    
    if (!isCardNumberValid || !isCardHolderNameValid || !isExpirationDateValid || !isCvvValid) {
      return false;
    }

    return true;
  }

  function CheckFieldsAreEmpty()
  {
    const [cardHolderNameInput, cardNumberInput, cvvInput, expirationDateInput] = returnInputElements();

    addFieldRequiredError();
    if(cardHolderNameInput.value == '' || cardNumberInput.value == '' || cvvInput.value == '' || expirationDateInput.value == '')
    {
      return true
    }
    return false;
  }

  function submitForm() 
  {
    if (validateAllPaymentDetails()) 
    {
      window.location.href = "../ThankYou/thankYou.html";
    }
  }

  function returnInputElements()
  {
    const cardHolderNameInput = document.getElementById('cardHolderName');
    const cardNumberInput = document.getElementById('cardNumber');
    const cvvInput = document.getElementById('cvv');
    const expirationDateInput = document.getElementById('expirationDate');
    return [cardHolderNameInput, cardNumberInput, cvvInput, expirationDateInput];
  }

  function returnInputErrorElements()
  {
    const cardHolderNameError = document.getElementById('cardHolderNameError');
    const cardNumberError = document.getElementById('cardNumberError');
    const cvvInputError = document.getElementById('cvvError');
    const expirationDateError = document.getElementById('expirationDateError');
    return [cardHolderNameError, cardNumberError, cvvInputError, expirationDateError];
  }

  function addFieldRequiredError()
  {
    const [cardHolderNameInput, cardNumberInput, cvvInput, expirationDateInput] = returnInputElements();
    const[cardHolderNameError, cardNumberError, cvvInputError, expirationDateError] = returnInputErrorElements();
    if(cardHolderNameInput.value == '')
    {
      cardHolderNameInput.classList.add('error');
      cardHolderNameError.innerText = '*  required field';
    }
    if(cardNumberInput.value == '')
    {
      cardNumberInput.classList.add('error');
      cardNumberError.innerText = '*  required field';
    }
    if(cvvInput.value == '')
    {
      cvvInput.classList.add('error');
      cvvInputError.innerText = '*  required field';
    }
    if(expirationDateInput.value == '')
    {
      expirationDateInput.classList.add('error');
      expirationDateError.innerText = '*  required field';
    }
  }





 
  