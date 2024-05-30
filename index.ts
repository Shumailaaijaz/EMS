
import inquirer from "inquirer";

const employees: {id: number, name: string, salary: number}[] = [];

const addEmployee = async() => {
    const numOfEmployees = await inquirer.prompt([
        {
            name: 'num',
            type: 'number',
            message: 'How many employees do yu want to add?'
        }
    ]);
    for(let i=0; i<numOfEmployees.num; i++){
        const answers = await inquirer.prompt([
            {
                name: 'id',
                type: 'number',
                message: 'Enter employee ID'
            },
            {
                name: 'name',
                type: 'input',
                message: 'Enter employee name'
            },
            {
                name: 'salary',
                type: 'number',
                message: 'Enter employee salary'
            }
        ]);
        let newEmployee: {id: number, name: string, salary: number} ={
            id: answers.id,
            name: answers.name,
            salary: answers.salary
        };
        employees.push(newEmployee);
    }
}

const listOfEmployees = async() => {
    if(employees.length > 0){
        console.table(employees);
    } else {
        console.log("No employees in the list");
    }
}

const editEmployee = async() => {
    const answer = await inquirer.prompt([
        {
            name: 'id',
            type: 'number',
            message: 'Enter employee id'
        }
    ]);

    const employee = employees.find(emp => emp.id === answer.id); //element
    if(employee){
        const updateEmployee = await inquirer.prompt([
            {
                name: 'name',
                type: 'input',
                message: `Enter new name for employee (current: ${employee.name}`
            },
            {
                name: 'salary',
                type: 'number',
                message: `Enter new salary for employee (current: ${employee.salary}`
            }
        ]);
        employee.name = updateEmployee.name;
        employee.salary = updateEmployee.salary;
        console.log(`employee details updated successfully`);
        console.table(employee);
    } else {
        console.log("Employee with the given ID does not exist");
    }
}

const deleteEmployee = async() => {
    const answer = await inquirer.prompt([
        {
            name: 'id',
            type: 'number',
            message: 'Enter employee id'
        }
    ]);
    const employee = employees.findIndex(emp => emp.id === answer.id); // to find index
    if(employee != -1){
        employees.splice(employee, 1);
        console.log(`Employee with id ${answer.id} removed successfully`);
    } else {
        console.log(`Employee with ID ${answer.id} not found.`);

}

const findEmployee = async() => {
    const answer = await inquirer.prompt([
        {
            name: 'id',
            type: 'number',
            message: 'Enter employee id'
        }
    ]);
    const employee = employees.find(emp => emp.id === answer.id); // to find element
    if(employee){
        console.table(employee);
    } else {
        console.log(`Employee with ID ${answer.id} not found.`);
    }
}

const filterBySalary = async() => {
    const answer = await inquirer.prompt([
        {
            name: 'salary',
            type: 'number',
            message: 'Enter salary'
        }
    ]);
    const filteredEmployees = employees.filter(emp => emp.salary >= answer.salary);
    if(filteredEmployees.length > 0){
        console.table(filteredEmployees);
    } else {
        console.log("No employee with salary greater than or equal to this.");
    }
}

const filterByName = async() => {
    const answer = await inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter name'
        }
    ]);
    const filteredEmployees = employees.filter(emp => emp.name.includes(answer.name));
    if(filteredEmployees.length > 0){
        console.table(filteredEmployees);
    } else {
        console.log("No employee with salary greater than or equal to this.");
    }
}

const mainMenu = async() => {
    while(true){
        const answer = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "What do you want to do?",
                choices: ['Add employee', 'Edit employee', 'View employees list', 'Delete employee', 'Find employee', 'Filter by name', 'Filter by salary', 'Exit']
            }
        ]);
        if(answer.action == 'Add employee'){
            await addEmployee();
           
         } else if(answer.action == 'Edit employee'){
            await editEmployee();
          
        } else if(answer.action == 'View employees list'){
            await listOfEmployees();
          
        } else if(answer.action == 'Delete employee'){
            await deleteEmployee();
           
        } else if(answer.action == 'Find employee'){
            await findEmployee();
           
        } else if(answer.action == 'Filter by name'){
            await filterByName();
            
        } else if(answer.action == 'Filter by salary'){
            await filterBySalary();
            
        }  else if(answer.action == 'Exit') {
            console.log("Exiting the application");
            // process.exit();
            break;
        } 
    }
}

mainMenu();
