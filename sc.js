let summaryBtn = document.querySelector("#summaryBtn");
let expenseBtn = document.querySelector("#expensesBtn");
let incomeBtn = document.querySelector("#incomeBtn");

summaryBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});

expenseBtn.addEventListener("click", () => {
    window.location.href = "expense.html";
});

incomeBtn.addEventListener("click", () => {
    window.location.href = "income.html";
});

document.addEventListener('DOMContentLoaded', function() {
    loadExpData();
});

function deleteRow(button) {
    button.closest('tr').remove();
    saveExpData();
}

function saveExpData() {
    const rows = document.querySelectorAll('#expTable tbody tr');
    const expData = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            category: cells[0].textContent,
            amount: cells[1].textContent
        };
    });
    localStorage.setItem('expData', JSON.stringify(expData));
}

function loadExpData() {
    const expData = JSON.parse(localStorage.getItem('expData')) || [];
    const tbody = document.querySelector('#expTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    expData.forEach(data => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${data.category}</td>
            <td>${data.amount}</td>
            <td>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteRow(this)">Delete</button>
            </td>
        `;
        tbody.appendChild(newRow);
    });
}


//displaying savings
// Example functions to calculate total income and total expenses
function calculateTotalIncome() {
    let totalIncome = 0;
    document.querySelectorAll('#incomeTable tbody tr').forEach(row => {
        totalIncome += parseFloat(row.cells[1].textContent);
    });
    return totalIncome;
}

function calculateTotalExpenses() {
    let totalExpenses = 0;
    document.querySelectorAll('#expTable tbody tr').forEach(row => {
        totalExpenses += parseFloat(row.cells[1].textContent);
    });
    return totalExpenses;
}

// Function to update total savings
function updateTotalSavings() {
    const totalIncome = calculateTotalIncome();
    const totalExpenses = calculateTotalExpenses();
    const totalSavings = totalIncome - totalExpenses;

    document.getElementById('box3').innerHTML = `<h6 id="box3Title"><b>Total Savings: ${totalSavings.toFixed(2)}</b></h6>`;
}

// Example of how to update total savings when incomes or expenses change
document.querySelectorAll('#incomeTable, #expTable').forEach(table => {
    table.addEventListener('input', updateTotalSavings);
});

// Initial update when the page loads
document.addEventListener('DOMContentLoaded', updateTotalSavings);

