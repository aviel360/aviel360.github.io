document.getElementById('cardNumber').addEventListener('input', validateCardNumber);
document.getElementById('cardHolderName').addEventListener('input', validateCardHolderName);
document.getElementById('cvv').addEventListener('input', validateCVV);
document.getElementById('expirationMonth').addEventListener('input', validateExpirationDateSelectors);
document.getElementById('expirationYear').addEventListener('input', validateExpirationDateSelectors);



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

document.addEventListener('DOMContentLoaded', function () {
  var currentYear = new Date().getFullYear();
  var selectYear = document.getElementById('expirationYear');

  for (var i = currentYear; i <= currentYear + 20; i++) {
      var option = document.createElement('option');
      option.value = i;
      option.text = i;
      selectYear.add(option);
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


  function validateExpirationDateSelectors() 
  {
    const selectedMonth = document.getElementById('expirationMonth');
    const selectedYear = document.getElementById('expirationYear');
    const monthError = document.getElementById('monthError');
    const yearError = document.getElementById('yearError');
    const dateError =  document.getElementById('dateError');

    selectedMonth.classList.remove('invalid');
    selectedYear.classList.remove('invalid');
    monthError.innerText = '';
    yearError.innerText = '';
    dateError.innerText = '';

    if(selectedMonth.value != '' && selectedYear.value != '')
    {
      // Get the current date
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var currentMonth = currentDate.getMonth()+1; // Months are zero-indexed
      
      var selectedMonthNumber = parseInt(selectedMonth.value, 10);
      var selectedYearNumber = parseInt(selectedYear.value, 10);
      if ( selectedYearNumber < currentYear || (selectedYearNumber == currentYear && selectedMonthNumber < currentMonth))
        {
          selectedMonth.classList.add('invalid');
          selectedYear.classList.add('invalid');
          dateError.innerText = 'Date must be a valid future date';
          return false;
        }
    }
    return true;
  }


  function submitForm() 
  {
    if (validateAllPaymentDetails()) 
    {
      window.location.href = "../ThankYou/thankYou.html";
    }
  }

  function validateAllPaymentDetails() 
  {
    if(CheckFieldsAreEmpty())
    {
      return false;
    }

    const isCardNumberValid = validateCardNumber();
    const isCardHolderNameValid = validateCardHolderName();
    const isExpirationDateValid = validateExpirationDateSelectors();
    const isCvvValid = validateCVV();
    
    if (!isCardNumberValid || !isCardHolderNameValid || !isCvvValid || !isExpirationDateValid) {
      return false;
    }

    return true;
  }

  function CheckFieldsAreEmpty()
  {
    const [cardHolderNameInput, cardNumberInput, cvvInput, selectedMonth, selectedYear] = returnInputElements();
    addFieldRequiredError();
    if(cardHolderNameInput.value == '' || cardNumberInput.value == '' || cvvInput.value == '' || selectedMonth.value == '' || selectedYear.value == '')
    {
      return true
    }
    return false;
  }

  function addFieldRequiredError()
  {
    const [cardHolderNameInput, cardNumberInput, cvvInput, selectedMonth, selectedYear] = returnInputElements();
    const[cardHolderNameError, cardNumberError, cvvInputError, monthError, yearError] = returnInputErrorElements();
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
    if(selectedMonth.value == '')
    {
      selectedMonth.classList.add('invalid');
      monthError.innerText = '*  required field';
    }
    if(selectedYear.value == '')
    {
      selectedYear.classList.add('invalid');
      yearError.innerText =  '*  required field';
    }
  }


  function returnInputElements()
  {
    const cardHolderNameInput = document.getElementById('cardHolderName');
    const cardNumberInput = document.getElementById('cardNumber');
    const cvvInput = document.getElementById('cvv');
    const selectedMonth = document.getElementById('expirationMonth');
    const selectedYear = document.getElementById('expirationYear');

    return [cardHolderNameInput, cardNumberInput, cvvInput, selectedMonth, selectedYear];
  }

  function returnInputErrorElements()
  {
    const cardHolderNameError = document.getElementById('cardHolderNameError');
    const cardNumberError = document.getElementById('cardNumberError');
    const cvvInputError = document.getElementById('cvvError');
    const monthError = document.getElementById('monthError');
    const yearError = document.getElementById('yearError');

    return [cardHolderNameError, cardNumberError, cvvInputError, monthError, yearError];
  }
  