// Import the Employee class from the employee.js file
import { Employee } from './model/employee.js';
const User = require('./models/Person');

// Initialize an array of Person objects
const persons = [
    new Person('Ana Smith', new Date('1998-12-15')),
    new Person('Bob Jones', new Date('1945-11-16')),
    new Person('Carlos Slim Helu', new Date('1976-09-24'))
  ];

// Test the array by printing the contents to the console
for (let person of persons) {
    console.log(person.toString());
  }

// Create a new Employee object named Jim Hanson
const jimHanson = new Employee('Jim Hanson', new Date('1985-05-20'), 245990.00, new Date('2020-02-10'));

// Call the doJob() method on the Jim Hanson object
jimHanson.doJob('Software Engineer');

