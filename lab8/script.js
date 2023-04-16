/* Q1 using object literal */
const student = {
    firstName : 'John',
    lastName : 'Doe',
    grades : [40, 39],

    inputNewGrade : function(newGrade) {
        this.grades.push(newGrade);
    },

    computeAverageGrade : function() {
        const sum = this.grades.reduce((acc, x) => {
            return acc + x;
        }, 0);
        return sum / this.grades.length;
    }
};

let student1 = Object.create(student);
student1.firstName = 'Gustav';
student1.lastName = 'Purpleson';
student1.grades = [36, 35];

let student2 = Object.create(student);
student2.firstName = 'Penny';
student2.lastName = 'Tool';
student2.grades = [33, 34];

let student3 = Object.create(student);
student3.firstName = 'Phillip';
student3.lastName = 'Anthropy';
student3.grades = [37, 34];

let students = [student1, student2, student3];

students.forEach(student => {
    console.log(student.computeAverageGrade());
});


/* Q2 using Constructor Function */

function Student(firstName, lastName, grades){
    this.firstName = firstName,
    this.lastName = lastName,
    this.grades = grades,
    this.inputNewGrade = function (newGrade) {
        this.grades.push(newGrade);
    },
    this.computeAverageGrade = function () {
        const sum = this.grades.reduce((acc, x) => {
            return acc + x;
        }, 0);
        return sum / this.grades.length;
    }
}

/* Q3 Sort method */
Student.prototype.sort = function(){ return this.grades.sort((a, b) => a - b)}; // For ascending sort
