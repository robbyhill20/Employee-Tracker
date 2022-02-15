use employees;

INSERT INTO department
    (name)

VALUES
    ('Compliance'),
    ('Engineering'),
    ('Human Resources'),
    ('Marketing');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Compliance Manager', 200000, 1),
    ('Compliance Liasion', 80000, 1),
    ('Director of Engineering', 2500000, 2),
    ('Engineer', 120000, 2),
    ('HR Director', 160000, 3),
    ('HR Rep', 100000, 3),
    ('Marketing Director', 275000, 4),
    ('Marketing Strategist ', 160000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Cory', 'Complies', 1, NULL),
    ('Larry', 'Liasion', 2, 1),
    ('Dottie', 'Director', 3, NULL),
    ('Edgar', 'Engineer', 4, 3),
    ('Harry', 'Resourceful', 5, NULL),
    ('Robert', 'Rep', 6, 5),
    ('Mary', 'Markets', 7, NULL),
    ('Stu', 'Rategy', 8, 7);
