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
        const dateCell = document.querySelector(`td[onclick="selectDate('${date}')"]`);
        
        if (selectedDates.includes(date)) {
            // 選択解除
            selectedDates = selectedDates.filter(d => d !== date);
            dateCell.style.backgroundColor = ''; // 背景色を元に戻す
        } else {
            // 日付を選択
            selectedDates.push(date);
            selectedDates.sort((a, b) => new Date(a) - new Date(b));
            dateCell.style.backgroundColor = '#ff0000'; // 選択した日付の背景色を変更
        }
        document.getElementById('selectedDates').innerText = selectedDates.join(", ");
    }

    window.selectClassDate = function (date) {
        const dateButton = document.querySelector(`button[onclick="selectClassDate('${date}')"]`);

        if (selectedClassDates.includes(date)) {
            // 選択解除
            selectedClassDates = selectedClassDates.filter(d => d !== date);
            dateButton.style.backgroundColor = '#004080'; // 元の背景色に戻す
        } else {
            // 日付を選択
            selectedClassDates.push(date);
            selectedClassDates.sort((a, b) => new Date(a) - new Date(b));
            dateButton.style.backgroundColor = '#ff0000'; // 選択した日付の背景色を変更
        }
        document.getElementById('selectedClassDates').innerText = selectedClassDates.join(", ");
    }

    window.handleSubmit = function (event) {
        event.preventDefault(); // フォームのデフォルトの送信をキャンセル
        document.getElementById('googleForm').submit(); // フォームを送信
    }

    window.showCompletionMessage = function () {
        document.querySelectorAll('.step').forEach(step => step.style.display = 'none');
        document.getElementById('completionMessage').style.display = 'block';
    }
});

