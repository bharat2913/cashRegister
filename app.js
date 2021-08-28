const billAmount = document.querySelector('#billAmount');
const cashGiven = document.querySelector('#cashGiven');
const cashGivenText = document.querySelector('#cashGivenText');
const next = document.querySelector('#next');
const button = document.querySelector('#check');
const errorMessage = document.querySelector('#errorMessage');
const table = document.querySelector('#table');
const noOFNotes = document.querySelectorAll('.noOFNotes');

const aviailableNotes = [2000, 500, 100, 20, 10, 5, 1];
cashGiven.style.display = 'none';
cashGivenText.style.display = 'none';
button.style.display = 'none';
table.style.display = 'none';

hideMessage();

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

next.addEventListener('click', () => {
  if (billAmount.value && billAmount.value >= 0) {
    cashGiven.style.display = 'block';
    cashGivenText.style.display = 'block';
    button.style.display = 'block';
    hideMessage();
  } else if (billAmount.value < 0) {
    showMessage('Bill Amount should be positive');
  } else if (!billAmount.value) {
    showMessage('Enter number only');
  }
});

button.addEventListener('click', function validateBillAndCashAmount() {
  hideMessage();

  if (cashGiven.value && cashGiven.value > 0 && billAmount.value >= 0) {
    if (cashGiven.value >= billAmount.value) {
      const returningAmount = cashGiven.value - billAmount.value;
      calculateChange(returningAmount);
      table.style.display = 'block';
    } else {
      showMessage('Enter amount atleast equal to Bill Amount');
    }
  } else if (cashGiven.value < 0) {
    showMessage('Cash Given should be positive');
  } else {
    // showMessage('Invalid Bill Ammount');
    showMessage('Enter number only');
  }
});

function calculateChange(returningAmount) {
  for (let i = 0; i < aviailableNotes.length; i++) {
    const numberOfNotes = Math.trunc(returningAmount / aviailableNotes[i]);
    returningAmount %= aviailableNotes[i];
    noOFNotes[i].innerText = numberOfNotes;
  }
}

function hideMessage() {
  errorMessage.style.display = 'none';
}

function showMessage(msg) {
  errorMessage.style.display = 'block';
  errorMessage.innerText = msg;
}
