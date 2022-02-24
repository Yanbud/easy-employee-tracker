class Role {
    constructor(id, title, salary, department_id) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }
}

const salesLead = new Role(1, 'Sales Lead', 100000, 1)
const salesperson = new Role(2, 'Salesperson', 80000, 1)
const leadEng = new Role(3, 'Lead Engineer', 150000, 2)
const softwareEng = new Role(4, 'Software Engineer', 120000, 2)
const accountMan = new Role(5, 'Account Manager', 160000, 3)
const accountant = new Role(6, 'Accountant', 125000, 3)
const legalLead = new Role(7, 'Legal Team Lead', 250000, 4)
const lawyer = new Role(8, 'Lawyer', 190000, 4)

const allRoles = [salesLead, salesperson, leadEng, softwareEng, accountMan, accountant, legalLead, lawyer]

module.exports = {
    allRoles,
    Role
};