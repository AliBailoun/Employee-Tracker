INSERT INTO department (department_name)
VALUES ("IT"),
       ("Business Development"),
       ("Marketing"),
       ("Accounting and Finances");

INSERT INTO roles (title, salary, department_id)
VALUES ("Supervisor", 210000, 1),
       ("Senior Developer", 200000, 1), 
       ("Junior Developer", 90000, 2), 
       ("Hiring Interviewer", 80000, 2), 
       ("Data Scientist", 100000, 3), 
       ("System Adminsartor", 115000.01, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ali", "Bailoun", 1, 1),
       ("Frank", "Castle", 2, 1), 
       ("Black", "Adam", 3, 2), 
       ("Christopher", "Columbus", 4, 2), 
       ("Arthur", "Pendragon",5, 3), 
       ("Luke", "Evans", 6, 3);
        