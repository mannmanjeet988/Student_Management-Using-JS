//console.log("happy")

//array of students
const students = [
    { ID: 1, name: 'Alice', age: 21, gpa: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, gpa: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, gpa: 'C', degree: 'Arts', email: 'charlie@example.com' }
  ];

// Get DOM elements
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');

// Add event listener to form submission
studentForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const studentId = document.getElementById('studentId').value;
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const grade = document.getElementById('gpa').value;
  const degree = document.getElementById('degree').value;
  const email = document.getElementById('email').value;

  // Check if it's an edit or add operation
  if (studentId) {
    // Edit existing student
    const existingStudent = students.find(student => student.ID === parseInt(studentId));
    if (existingStudent) {
      existingStudent.name = name;
      existingStudent.age = age;
      existingStudent.gpa = gpa;
      existingStudent.degree = degree;
      existingStudent.email = email;
    }
  } else {
    // Add new student
    const newStudent = {
      ID: students.length + 1,
      name: name,
      age: parseInt(age),
      gpa: gpa,
      degree: degree,
      email: email
    };
    students.push(newStudent);
    console.log(students);
  }

  // Clear form inputs
  studentForm.reset();

  // Render table
  renderTable();
});

// Function to render the data in table
function renderTable() {
  // Clear table body
  studentTableBody.innerHTML = '';

  // Iterate over students array and create table rows
  students.forEach(student => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = student.ID;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = student.name;
    row.appendChild(nameCell);

    const ageCell = document.createElement('td');
    ageCell.textContent = student.age;
    row.appendChild(ageCell);

    const gradeCell = document.createElement('td');
    gradeCell.textContent = student.grade;
    row.appendChild(gradeCell);

    const degreeCell = document.createElement('td');
    degreeCell.textContent = student.degree;
    row.appendChild(degreeCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = student.email;
    row.appendChild(emailCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      fillFormWithStudentData(student);
    });
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteStudent(student);
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    studentTableBody.appendChild(row);
  });
}

// DATA EDITION FUNCTION---------->
// Function to fill the form with student data for editing
function fillFormWithStudentData(student) {
  document.getElementById('studentId').value = student.ID;
  document.getElementById('name').value = student.name;
  document.getElementById('age').value = student.age;
  document.getElementById('gpa').value = student.gpa;
  document.getElementById('degree').value = student.degree;
  document.getElementById('email').value = student.email;

  // Change button text to 'Edit Student'
  document.getElementById('submitButton').textContent = 'Edit Student';
}


//DELETE-------->
// Function to delete a student
function deleteStudent(student) {
    const studentIndex = students.findIndex(s => s.ID === student.ID);
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      renderTable();
    }
  }

//SEARCHING------->
  // To search a particular student
document.getElementById('searchInput').addEventListener('keyup',event=>{
    const studentInfo=document.getElementById('searchInput').value.toLowerCase();
// searchInput.addEventListener('keyup',function(event){
    //const studentInfo = event.target.value.toLowerCase();
     const filteredStudents= students.filter((student)=>{
        return (
            student.name.toLowerCase().includes(studentInfo) ||
            student.degree.toLowerCase().includes(studentInfo) ||
            student.email.toLowerCase().includes(studentInfo)    
          );
    });
    renderTableWithFilteredData(filteredStudents);
});


function renderTableWithFilteredData(students){
    studentTableBody.innerHTML = '';

  // Iterate over students array and create table rows
  students.forEach(student => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = student.ID;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = student.name;
    row.appendChild(nameCell);

    const ageCell = document.createElement('td');
    ageCell.textContent = student.age;
    row.appendChild(ageCell);

    const gradeCell = document.createElement('td');
    gradeCell.textContent = student.grade;
    row.appendChild(gradeCell);

    const degreeCell = document.createElement('td');
    degreeCell.textContent = student.degree;
    row.appendChild(degreeCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = student.email;
    row.appendChild(emailCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      fillFormWithStudentData(student);
    });
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteStudent(student);
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    studentTableBody.appendChild(row);
  });
}
