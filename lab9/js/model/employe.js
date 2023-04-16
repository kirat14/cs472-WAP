// Import the Person class from the person.js file
import { Person } from './person.js';

// Define the Employee class that extends the Person class
export class Employee extends Person {
  constructor(name, dateOfBirth, salary, hireDate) {
    super(name, dateOfBirth);
    this.salary = salary;
    this.hireDate = hireDate;
  }

  doJob(jobTitle) {
    console.log(`${this.name} is a ${jobTitle} who earns $${this.salary.toFixed(2)}`);
  }
}
