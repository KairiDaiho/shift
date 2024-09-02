let selectedDates = [];
let selectedClassDates = [];

function goToStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => step.style.display = 'none');
    document.getElementById(`step${stepNumber}`).style.display = 'block';

    if (stepNumber === 4) {
        document.getElementById('confirmName').innerText = document.getElementById('nameInput').value;
        document.getElementById('confirmDates').innerText = selectedDates.join(", ");
        document.getElementById('confirmClassDates').innerText = selectedClassDates.join(", ");
    }
}

function selectDate(date) {
    if (!selectedDates.includes(date)) {
        selectedDates.push(date);
        selectedDates.sort((a, b) => a - b);
        document.getElementById('selectedDates').innerText = selectedDates.join(", ");
    }
}

function selectClassDate(date) {
    if (!selectedClassDates.includes(date)) {
        selectedClassDates.push(date);
        selectedClassDates.sort(); // Sorts alphabetically by default
        document.getElementById('selectedClassDates').innerText = selectedClassDates.join(", ");
    }
}

function submitData() {
    const name = document.getElementById('nameInput').value;

    const data = {
        name: name,
        dates: selectedDates.join(", "),
        classDates: selectedClassDates.join(", ")
    };

    const proxyURL = 'http://localhost:1521/submit'; // URL of your local Node.js server

    fetch(proxyURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert("Shift submission completed!");
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error: " + error.message);
    });
}




