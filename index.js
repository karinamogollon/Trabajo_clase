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
        const actionsCell = newRow.insertCell(2); 

   
        activityCell.textContent = activityName;
        gradeCell.textContent = activityGrade.toFixed(1);

  
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'btn-edit';
        editButton.onclick = function() {
            editarActividad(this);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'btn-delete';
        deleteButton.onclick = function() {
            confirmarEliminacion(activityName, this);
        };

       
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

     
        updateAverage();

        
        document.getElementById('activityForm').reset();
    });
});

let activityToDelete = null;
let rowToDelete = null;

function confirmarEliminacion(activityName, button) {
    activityToDelete = activityName;
    rowToDelete = button.closest('tr');
    document.getElementById('deleteMessage').textContent = `¿Deseas eliminar ${activityName}?`;
    document.getElementById('deleteModal').style.display = 'flex';
}

function eliminarActividad() {
    if (rowToDelete) {
        rowToDelete.remove();
        updateAverage();
    }
    document.getElementById('deleteModal').style.display = 'none';
}

function segundaConfirmacion() {
    document.getElementById('deleteModal').style.display = 'none';
    document.getElementById('secondModal').style.display = 'flex';
}

function cerrarSegundomodal() {
    document.getElementById('secondModal').style.display = 'none';
}

function editarActividad(button) {
    const row = button.closest('tr');
    const activityCell = row.cells[0];
    const gradeCell = row.cells[1];

    const newActivityName = prompt('Editar nombre de la actividad:', activityCell.textContent);
    const newGrade = parseFloat(prompt('Editar nota (0.0 - 5.0):', gradeCell.textContent));

    if (newActivityName && !isNaN(newGrade) && newGrade >= 0 && newGrade <= 5) {
        activityCell.textContent = newActivityName;
        gradeCell.textContent = newGrade.toFixed(1);
        updateAverage();
    } else {
        alert('Datos no válidos');
    }
}

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


window.onclick = function(event) {
    if (event.target == document.getElementById('deleteModal')) {
        document.getElementById('deleteModal').style.display = 'none';
    }
    if (event.target == document.getElementById('secondModal')) {
        document.getElementById('secondModal').style.display = 'none';
    }
}
