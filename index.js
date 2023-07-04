//console.log("happy")

//ARRAY OF STUDENTS----->
let students =  JSON.parse(localStorage.getItem('students')) || [
    { ID: 1, name: 'Alice', age: 21, gpa: 9.2, degree: 'Btech', email: 'alice@example.com' }
  ];

// Get DOM elements
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');

// Add event listener to form submission
studentForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Calculate the maximum ID from existing students
  const maxID = Math.max(...students.map(student => student.ID));

  // GET FORM VALUES----->
  const studentId = document.getElementById('studentId').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;
  const gpa = document.getElementById('gpa').value;
  const degree = document.getElementById('degree').value;

  // Check if it's an edit or add operation
  if (studentId) {
    // Edit existing student
    const existingStudent = students.find(student => student.ID === parseInt(studentId));
    if (existingStudent) {
      existingStudent.name = name;
      existingStudent.email = email;
      existingStudent.age = age;
      existingStudent.gpa = gpa;
      existingStudent.degree = degree;   
    }
    saveStudentsToLocalStorage();
  }
   else {
    // Add new student
    const newStudent = {
      ID: maxID + 1,
      name: name,
      email: email,
      age: parseInt(age),
      gpa: gpa,
      degree: degree,
    };
    students.push(newStudent);
    console.log(students);
    saveStudentsToLocalStorage();
  }
  // Clear form inputs
  studentForm.reset();

  // Render table
  renderTable();
});


function saveStudentsToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
  }


// FUNCTION TO RENDER DATA IN TABLE
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

    const emailCell = document.createElement('td');
    emailCell.textContent = student.email;
    row.appendChild(emailCell);

    const ageCell = document.createElement('td');
    ageCell.textContent = student.age;
    row.appendChild(ageCell);

    const gpaCell = document.createElement('td');
    gpaCell.textContent = student.gpa;
    row.appendChild(gpaCell);

    const degreeCell = document.createElement('td');
    degreeCell.textContent = student.degree;
    row.appendChild(degreeCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.innerHTML = `<img src="./assets/edit 1.png" width="20px"  style="margin:0px 5px; background-color: #111111;">`;
    editButton.addEventListener('click', function() {
      fillFormWithStudentData(student);
      saveStudentsToLocalStorage();
    });
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    // deleteButton.textContent = 'Delete';
    deleteButton.innerHTML = `<img src="./assets/trash.png" width="20px"  style="margin:0px 5px; background-color: #111111;">`;
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
  document.getElementById('email').value = student.email;
  document.getElementById('age').value = student.age;
  document.getElementById('gpa').value = student.gpa;
  document.getElementById('degree').value = student.degree;
 
  // Change button text to 'Edit Student'
  document.getElementById('submitButton').textContent = 'Edit Student';
}


//DELETE-------->
// Function to delete a student
function deleteStudent(student) {
    const studentIndex = students.findIndex(s => s.ID === student.ID);
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      saveStudentsToLocalStorage();
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

    const emailCell = document.createElement('td');
    emailCell.textContent = student.email;
    row.appendChild(emailCell);

    const ageCell = document.createElement('td');
    ageCell.textContent = student.age;
    row.appendChild(ageCell);

    const gpaCell = document.createElement('td');
    gpaCell.textContent = student.gpa;
    row.appendChild(gpaCell);

    const degreeCell = document.createElement('td');
    degreeCell.textContent = student.degree;
    row.appendChild(degreeCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.innerHTML = `<img src="./assets/edit 1.png" width="20px"  style="margin:0px 5px; background-color: #111111;">`;
    editButton.addEventListener('click', function() {
      fillFormWithStudentData(student);
      saveStudentsToLocalStorage();
    });
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<img src="./assets/trash.png" width="20px"  style="margin:0px 5px; background-color: #111111;">`;
    deleteButton.addEventListener('click', function() {
      deleteStudent(student);
      
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    studentTableBody.appendChild(row);
  });
}
