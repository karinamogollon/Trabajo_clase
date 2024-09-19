document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('activityForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const activityName = document.getElementById('activityName').value.trim();
        const activityGrade = parseFloat(document.getElementById('activityGrade').value);

        if (isNaN(activityGrade) || activityGrade < 0 || activityGrade > 5) {
            alert("La nota debe estar entre 0.0 y 5.0");
            return;
        }

        const tableBody = document.querySelector('#activities tbody');
        const newRow = tableBody.insertRow();
        const activityCell = newRow.insertCell(0);
        const gradeCell = newRow.insertCell(1);
        activityCell.textContent = activityName;
        gradeCell.textContent = activityGrade.toFixed(1);

        updateAverage();

        document.getElementById('activityForm').reset();
    });
});

function updateAverage() {
    const tableBody = document.querySelector('#activities tbody');
    const rows = tableBody.querySelectorAll('tr');
    let total = 0;
    let count = 0;

    rows.forEach(row => {
        const grade = parseFloat(row.cells[1].textContent);
        if (!isNaN(grade)) {
            total += grade;
            count++;
        }
    });

    const average = total / count;
    const averageResult = document.getElementById('averageResult');
    const statusResult = document.getElementById('statusResult');

    if (count > 0) {
        averageResult.textContent = `Promedio: ${average.toFixed(2)}`;
        if (average >= 3) {
            statusResult.textContent = 'Estado: Aprobado';
            averageResult.className = 'approved';
        } else {
            statusResult.textContent = 'Estado: No Aprobado';
            averageResult.className = 'not-approved';
        }
    } else {
        averageResult.textContent = 'Promedio: -';
        statusResult.textContent = 'Estado: -';
        averageResult.className = '';
    }
    
}
