document.getElementById('cardNumber').addEventListener('input', validateCardNumber);
document.getElementById('cardHolderName').addEventListener('input', validateCardHolderName);
document.getElementById('cvv').addEventListener('input', validateCVV);

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
    }
  }

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
        }
        else if(!/^\d{16}$/.test(cardNumberInput.value))
        {
            cardNumberInput.classList.add('error');
            cardNumberErrorMessage.innerText = 'Card Number must contain only digits';
        }
    }
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
        }
    }
  }