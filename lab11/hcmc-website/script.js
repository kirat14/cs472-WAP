const form = document.forms["addPatientForm"];
var tableBody = document.getElementsByClassName("table")[0];

form.addEventListener("submit",
    function (event) {
        event.preventDefault(); // Prevent default form submission behavior
        const patientIdNumber = form.elements['patientIdNumber'].value;
        const firstName = form.elements['firstName'].value;
        const middleInitials = form.elements['middleInitials'].value;
        const lastName = form.elements['lastName'].value;
        const dateOfBirth = form.elements['dateOfBirth'].value;
        const department = form.elements['ddlDepartment'].value;
        const isOutPatient = form.elements['radioIsOutPatient'].value;

        var row = tableBody.insertRow();
        for (var j = 0; j < 7; j++) {
            row.insertCell();
        }

        var cell = row.cells[0];
        cell.innerHTML = patientIdNumber;

        cell = row.cells[1];
        cell.innerHTML = firstName;

        cell = row.cells[2];
        cell.innerHTML = middleInitials;

        cell = row.cells[3];
        cell.innerHTML = lastName;

        cell = row.cells[4];
        cell.innerHTML = dateOfBirth;

        cell = row.cells[5];
        cell.innerHTML = department;

        cell = row.cells[6];
        cell.innerHTML = isOutPatient;
});


/* Show eldery */
const showElderyCheckbox = document.getElementById("chkElderlyPatients");

function calculateAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


callBackEldery = function(event){
    if (this.checked) {
      let age, row;
      for (let i = 0; i < tableBody.rows.length; i++) {
        row = tableBody.rows[i];
          if(row.cells[0].tagName == 'TH')
            continue;
        age = calculateAge(row.cells[4].innerText);
        if(age < 65)
          row.style.display = "none";
        
      }
    }
    else
      Array.from(tableBody.rows).forEach(row => {
        if(row.style.display == "none")
          row.style.display = "table-row";
      });
  };
showElderyCheckbox.addEventListener('change', callBackEldery);

/* Show out patients */
const showOutPatients = document.getElementById("chkShowOutPatients");

callBackOutPatients = function(event){
  if (this.checked) {
    let age, row;
    for (let i = 0; i < tableBody.rows.length; i++) {
      row = tableBody.rows[i];
      if(row.cells[0].tagName == 'TH')
            continue;
      if(row.cells[6].innerText === "No")
        row.style.display = "none";
    }
  }
  else
    Array.from(tableBody.rows).forEach(row => {
        if(row.style.display == "none")
          row.style.display = "table-row";
      });
};
showOutPatients.addEventListener('change', callBackOutPatients);
