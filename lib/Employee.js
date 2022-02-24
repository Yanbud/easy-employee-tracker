class Employee {
    constructor(id, first_name, last_name, role_id, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

}

const john = new Employee(1, 'John', 'Doe', 1, 'NULL')
const mike = new Employee(2, 'Mike', 'Chan', 2, 1)
const ashley = new Employee(3, 'Ashley', 'Rodriguez', 3, 'NULL')
const kevin = new Employee(4, 'Kevin', 'Tupic', 4, 3)
const kunal = new Employee(5, 'Kunal', 'Singh', 5, 'NULL')
const malia = new Employee(6, 'Malia', 'Brown', 6, 5)
const sarah = new Employee(7, 'Sarah', 'Lourd', 7, 'NULL')
const tom = new Employee(8, 'Tom', 'Allen', 8, 7)

const allEmps = [john, mike, ashley, kevin, kunal, malia, sarah, tom]

module.exports = {
    allEmps,
    Employee
};