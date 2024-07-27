/*
let summaryBtn=document.querySelector("#summaryBtn");
let expenseBtn=document.querySelector("#expensesBtn");
let incomeBtn=document.querySelector("#incomeBtn");


summaryBtn.addEventListener("click",()=>{
    window.location.href="index.html";
});

expenseBtn.addEventListener("click",()=>{
    window.location.href="expense.html";
});

incomeBtn.addEventListener("click",()=>{
    window.location.href="income.html";
});
*/

document.addEventListener('DOMContentLoaded', function() {
    loadIncomeData();
});

document.getElementById('incomeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const source = document.getElementById('source').value;
    const income = document.getElementById('income').value;

    // Create a new row for the income entry
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${source}</td>
        <td>${income}</td>
        <td>
            <button class="btn btn-outline-danger btn-sm" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    // Append the new row to the table body
    document.querySelector('#incomeTable tbody').appendChild(newRow);

    // Save the updated data to localStorage
    saveIncomeData();

    // Clear the form
    document.getElementById('incomeForm').reset();
});

function deleteRow(button) {
    button.closest('tr').remove();
    saveIncomeData();
}

function saveIncomeData() {
    const rows = document.querySelectorAll('#incomeTable tbody tr');
    const incomeData = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            source: cells[0].textContent,
            income: cells[1].textContent
        };
    });
    localStorage.setItem('incomeData', JSON.stringify(incomeData));
}

function loadIncomeData() {
    const incomeData = JSON.parse(localStorage.getItem('incomeData')) || [];
    const tbody = document.querySelector('#incomeTable tbody');
    incomeData.forEach(data => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${data.source}</td>
            <td>${data.income}</td>
            <td>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteRow(this)">Delete</button>
            </td>
        `;
        tbody.appendChild(newRow);
    });
}
