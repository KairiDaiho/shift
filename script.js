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
        if (selectedDates.includes(date)) {
            // 選択解除
            selectedDates = selectedDates.filter(d => d !== date);
        } else {
            // 日付を選択
            selectedDates.push(date);
            selectedDates.sort((a, b) => new Date(a) - new Date(b));
        }
        document.getElementById('selectedDates').innerText = selectedDates.join(", ");
    }

    window.selectClassDate = function (date) {
        if (selectedClassDates.includes(date)) {
            // 選択解除
            selectedClassDates = selectedClassDates.filter(d => d !== date);
        } else {
            // 日付を選択
            selectedClassDates.push(date);
            selectedClassDates.sort((a, b) => new Date(a) - new Date(b));
        }
        document.getElementById('selectedClassDates').innerText = selectedClassDates.join(", ");
    }

    window.handleSubmit = function (event) {
        event.preventDefault(); // フォームのデフォルトの送信をキャンセル

        const formURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSerrZk-3mfhsP0TBvJ5PT_N3FyeGbrxBgvQXTBa-XSGJQ8EOQ/formResponse'; // フォームの送信URL
        const xhr = new XMLHttpRequest();
        const formData = new FormData(document.getElementById('googleForm'));

        xhr.open('POST', formURL);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 0) {
                document.querySelectorAll('.step').forEach(step => step.style.display = 'none');
                document.getElementById('completionMessage').style.display = 'block';
            }
        };

        xhr.send(new URLSearchParams(formData).toString());
    }
});








