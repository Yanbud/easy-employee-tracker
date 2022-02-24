class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
const sales = new Department(1, 'Sales')
const engineering = new Department(2, 'Engineering')
const finance = new Department(3, 'Finance')
const legal = new Department(4, 'Legal')
const allDepts = [sales, engineering, finance, legal]

module.exports = {
    allDepts,
    Department
};