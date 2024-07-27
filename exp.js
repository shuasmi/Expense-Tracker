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

document.addEventListener('DOMContentLoaded', function() {
    loadExpData();
});
*/

/*
document.getElementById('expForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;

    // Create a new row for the income entry
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${category}</td>
        <td>${amount}</td>
        <td>
            <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    // Append the new row to the table body
    document.querySelector('#expTable tbody').appendChild(newRow);

    // Save the updated data to localStorage
    saveExpData();

    // Clear the form
    document.getElementById('expForm').reset();
});
*/
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

// exp.js

document.getElementById('expForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;

    // Create a new row for the expense entry
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${category}</td>
        <td>${amount}</td>
        <td>
            <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    // Append the new row to the table body
    document.querySelector('#expTable tbody').appendChild(newRow);

    // Save the updated data to localStorage
    saveExpData();

    // Clear the form
    document.getElementById('expForm').reset();
});



