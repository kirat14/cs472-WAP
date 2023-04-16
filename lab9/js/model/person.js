class Person {
    constructor(name, dateOfBirth) {
      this.name = name;
      this.dateOfBirth = dateOfBirth;
    }
  
    getName() {
      return this.name;
    }
  
    setName(name) {
      this.name = name;
    }
  
    getDateOfBirth() {
      return this.dateOfBirth;
    }
  
    setDateOfBirth(dateOfBirth) {
      this.dateOfBirth = dateOfBirth;
    }
  
    toString() {
      return `{ Name: ${this.name}, DateOfBirth: ${this.dateOfBirth} }`;
    }
  }

module.exports = Person;