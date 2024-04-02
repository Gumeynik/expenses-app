const expenses = [];
let LIMIT = 10000;
const currency = 'руб.';
const status_in_limit = 'всё хорошо';
const status_out_of_limit = 'всё плохо';

const inputNode = document.querySelector('.js-inp');
const btnNode = document.querySelector('.js-btn');
const historyNode = document.querySelector('.js-history');
const totalNode = document.querySelector('.js-total');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const btnResetNode = document.querySelector('.js-reset-btn');
const btnPopupNode = document.querySelector('.js-icon');
const popupNode = document.querySelector('.js-popup');
const btnClosePopupNode = document.querySelector('.js-burger-btn');
const popupInputNode = document.querySelector('.popup-input');
const btnPopupInputNode = document.querySelector('.js-popup-btn');
const categoryNode = document.querySelector('.category');
const validation = document.querySelector('.category_validation');


init(expenses);


btnNode.addEventListener('click', function () {
   const expense = getExpenseFromUser();

   if (!expense) {
    validation.setAttribute("style", "color: red;")
    validation.innerText = `Запишите расходы`;
    return;
   }
    else {
        validation.setAttribute("style", "color: white;")
   }
   if (categoryNode.value === ''){
    validation.setAttribute("style", "color: red;")
    validation.innerText = `Выберите категорию`;
    return;
   }
   else {
    validation.setAttribute("style", "color: white;")
}
   trackExpense(expense);
   render(expenses);
});

function init() {
    limitNode.innerText = `${LIMIT} ${currency}`;
    statusNode.innerText = status_in_limit;
    totalNode.innerText = ` ${calculateExpanses(expenses)}  ${currency}`;
};

localStorage.setItem('limit', popupInputNode.value)

function trackExpense(expense) {
    const category = categoryNode.options[categoryNode.selectedIndex].text;
    expenses.push({ amount: expense, category: category });
};

function getExpenseFromUser() {
    if (inputNode.value === '' ) {
        return null;
    }
    // if (categoryNode.value === '') {
    //     return null;
    // }
    const expense = parseInt(inputNode.value);

    clearInput();

    return expense;
};

function clearInput() {
    inputNode.value = '';
    popupInputNode.value = '';

};

function calculateExpanses(expenses) {
    let sum = 0;

    expenses.forEach(element => {
        sum += element.amount;
    });

    return sum;
};

function render(expenses) {
    const sum = calculateExpanses(expenses);
    init();  
    renderSum(sum);
    renderHistory(expenses);
 
    renderStatus(sum);
}

function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(expense => {
        expensesListHTML += `<li>${expense.amount} ${currency} - ${expense.category}</li>`;
    });

    historyNode.innerHTML = `<ol class='history-list'>${expensesListHTML}</ol> `;
};

function renderSum(sum) {
    totalNode.innerText = `${sum} ${currency}`;
}

function renderStatus(sum) {
    if (LIMIT >= sum) {
        statusNode.innerText = `${status_in_limit}`;
        statusNode.setAttribute("style", "color: green;")
    } else {
        statusNode.innerText = `${status_out_of_limit} (-${sum - LIMIT})`;
        statusNode.setAttribute("style", "color: red;")
    }
};


btnResetNode.addEventListener('click', function () {
    expenses.length = 0;
    
    render(expenses);
 });

 btnPopupNode.addEventListener('click', function () {
    popupNode.classList.add('popup-open');
 });

 btnClosePopupNode.addEventListener('click', function () {
    popupNode.classList.remove('popup-open');
 });

 btnPopupInputNode.addEventListener('click', function () {
    LIMIT = popupInputNode.value;
    popupNode.classList.remove('popup-open');
    render(expenses); 
    clearInput();
});


















// const POPUP_OPENED_CLASSNAME = 'popup_open';
// const BODY_FIXED_CLASSNAME = 'body_fixed';

// const bodyNode = document.querySelector('body');
// const popupNode = document.querySelector('.js-popup');
// const btnLimitNode = document.querySelector('.js-icon')
// const popupContentNode = document.querySelector('.js-popup-content')

// btnLimitNode.addEventListener('click', togglePopup);
// btnCloseNode.addEventListener('click', togglePopup);

// popupNode.addEventListener('click', (event) => {
//     const isClickOutsideContent = !event.composedPath().includes(popupContentNode)

//     if (isClickOutsideContent) {
//         togglePopup();
//     }
// })

// function togglePopup() {
//     popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
//     bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
// }