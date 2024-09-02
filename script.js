let selectedDates = [];
let selectedClassDates = [];

function goToStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => step.style.display = 'none');
    document.getElementById(`step${stepNumber}`).style.display = 'block';

    if (stepNumber === 4) {
        const name = document.getElementById('nameInput').value;
        const dates = selectedDates.join(", ");
        const classDates = selectedClassDates.join(", ");

        document.getElementById('confirmName').innerText = name;
        document.getElementById('confirmDates').innerText = dates;
        document.getElementById('confirmClassDates').innerText = classDates;

        // 隠しフィールドに値を設定
        document.getElementById('hiddenName').value = name;
        document.getElementById('hiddenDates').value = dates;
        document.getElementById('hiddenClassDates').value = classDates;
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
        selectedClassDates.sort();
        document.getElementById('selectedClassDates').innerText = selectedClassDates.join(", ");
    }
}

function submitToGoogleForm() {
    const formURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSerrZk-3mfhsP0TBvJ5PT_N3FyeGbrxBgvQXTBa-XSGJQ8EOQ/formResponse'; // フォームの送信URL

    // Googleフォームの各フィールドIDを設定
    const data = new URLSearchParams();
    data.append('entry.2140755402', document.getElementById('nameInput').value); // "名前" フィールドID
    data.append('entry.1945471040', selectedDates.join(", ")); // "Study Abroad Space" フィールドIDを使用
    data.append('entry.664574912', selectedClassDates.join(", ")); // "Class1 Trial Session" フィールドIDを使用

    fetch(formURL, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
    })
    .then(response => alert("Shift submission completed!"))
    .catch(error => console.error('Error:', error));
}






