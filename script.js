
let getID = (id) => { return document.getElementById(id) };

let students = [];
let editIndex = -1;

let addTable = () => {
    let table = getID('student-list');
    table.innerHTML = '';

    if (students.length === 0) {
        table.innerHTML = `<tr><td colspan="5" class="fw-bold bg-secondary-subtle">No records</td></tr>`;
        return;
    }

    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        let newTable = document.createElement('tr');

        newTable.innerHTML = `
                <td>${i + 1}</td>
                <td>${student.first}</td>
                <td>${student.last}</td>
                <td>${student.age}</td>
                <td>
                    <button onclick="editStudent(${i});" class=" btn btn-md btn-outline-warning edit">Edit</button>
                    <button onclick="deleteStudent(${i});" class=" btn btn-md btn-outline-danger delete">Delete</button>    
                </td>
            `
        table.append(newTable);
    }
}

let editStudent = (i) => {
    let student = students[i];
    getID('firstName').value = student.first;
    getID('lastName').value = student.last;
    getID('age').value = student.age;

    editIndex = i;

    addTable();
};

let deleteStudent = (i) => {
    students.splice(i, 1);
    addTable();
}

addTable();

let formFunction = () => {
    let firstName = getID('firstName').value.trim();
    let lastName = getID('lastName').value.trim();
    let age = getID('age').value.trim();

    let alert = getID('alert');

    let student = {
        first: firstName,
        last: lastName,
        age: age
    }

    if (!firstName || !lastName || !age) {
        alert.classList.remove('d-none');

        setTimeout(function () {
            alert.classList.add('d-none')
        }, 1500);
        return;
    }

    alert.classList.add('d-none');

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    addTable();

    getID('firstName').value = '';
    getID('lastName').value = '';
    getID('age').value = '';
}
