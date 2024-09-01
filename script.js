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
        selectedDates.sort((a, b) => a - b); // 日付を昇順でソート
        document.getElementById('selectedDates').innerText = selectedDates.join(", ");
    }
}

function selectClassDate(date) {
    if (!selectedClassDates.includes(date)) {
        selectedClassDates.push(date);
        selectedClassDates.sort(); // 文字列としてソート (日付は文字列形式なので直接ソートします)
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

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwN4JArCaC_e4z3x1A6JDbjcUk7Cl1pXJnDaU71ecbhh4LVNlvc5z3nNnWu4PJ6WG-k/exec';

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors' // CORSを回避するために追加
    })
    .then(response => {
        alert("Shift submission completed! (Note: Response cannot be checked due to 'no-cors' mode)");
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error: " + error.message);
    });
}



