const expenses = [];
let LIMIT = 10000;
const СURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';

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
const warningMessage = document.querySelector('.category_validation');

init(expenses);

btnNode.addEventListener('click', addExpense);
btnPopupInputNode.addEventListener('click', createNewLimit);
btnClosePopupNode.addEventListener('click', closePopup);
btnPopupNode.addEventListener('click', popupOpen);
btnResetNode.addEventListener('click', resetExpenses);

const addExpense = () => {
    const expense = getExpenseFromUser();
    if (validation(expense)) {
        trackExpense(expense);
        render(expenses);
    }
}

const validation = (expense) => {
    if ((!expense) || expense <= 0) {
        warningMessage.setAttribute("style", "color: red; opacity: 1")
        warningMessage.innerText = `Введите корректное число`;
        return false;
    } else {
        warningMessage.setAttribute("style", "color: white; opacity: 0")
    }

    if (categoryNode.value === '') {
        warningMessage.setAttribute("style", "color: red; opacity: 1")
        warningMessage.innerText = `Выберите категорию`;
        return false;
    } else {
        warningMessage.setAttribute("style", "color: white; opacity: 0")
    }
    return true;
}

const init = () => {
    limitNode.innerText = `${LIMIT} ${СURRENCY}`;
    statusNode.innerText = STATUS_IN_LIMIT;
    totalNode.innerText = ` ${calculateExpanses(expenses)}  ${СURRENCY}`;
};

const trackExpense = (expense) => {
    const category = categoryNode.options[categoryNode.selectedIndex].text;
    expenses.push({ amount: expense, category: category });
};

const getExpenseFromUser = () => {
    if (inputNode.value === '') {
        return null;
    }
    const expense = parseInt(inputNode.value);

    clearInput();

    return expense;
};

const clearInput = () => {
    inputNode.value = '';
    popupInputNode.value = '';
};

const calculateExpanses = (expenses) => {
    let sum = 0;

    expenses.forEach(element => {
        sum += element.amount;
    });

    return sum;
};

const render = (expenses) => {
    const sum = calculateExpanses(expenses);

    init();
    renderSum(sum);
    renderHistory(expenses);
    renderStatus(sum);
}

const renderHistory = (expenses) => {
    let expensesListHTML = '';

    expenses.forEach(expense => {
        expensesListHTML += `<li>${expense.amount} ${СURRENCY} - ${expense.category}</li>`;
    });

    historyNode.innerHTML = `<ol class='history-list'>${expensesListHTML}</ol> `;
};

const renderSum = (sum) => {
    totalNode.innerText = `${sum} ${СURRENCY}`;
}

const renderStatus = (sum) => {
    if (LIMIT >= sum) {
        statusNode.innerText = `${STATUS_IN_LIMIT}`;
        statusNode.setAttribute("style", "color: green;")
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (-${sum - LIMIT})`;
        statusNode.setAttribute("style", "color: red;")
    }
};

const resetExpenses = () => {
    expenses.length = 0;

    render(expenses);
}

const popupOpen = () => {
    popupNode.classList.add('popup-open');
}

const closePopup = () => {
    popupNode.classList.remove('popup-open');
}

const createNewLimit = () => {
    if (popupInputNode.value < 0) {
        return;
    }
    LIMIT = popupInputNode.value;
    popupNode.classList.remove('popup-open');
    render(expenses);
    clearInput();
}