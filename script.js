document.addEventListener('DOMContentLoaded', function () {
    let selectedDates = [];
    let selectedClassDates = [];

    window.goToStep = function (stepNumber) {
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

    window.selectDate = function (date) {
        if (!selectedDates.includes(date)) {
            selectedDates.push(date);
            selectedDates.sort((a, b) => new Date(a) - new Date(b));
            document.getElementById('selectedDates').innerText = selectedDates.join(", ");
        }
    }

    window.selectClassDate = function (date) {
        if (!selectedClassDates.includes(date)) {
            selectedClassDates.push(date);
            selectedClassDates.sort((a, b) => new Date(a) - new Date(b));
            document.getElementById('selectedClassDates').innerText = selectedClassDates.join(", ");
        }
    }
});







