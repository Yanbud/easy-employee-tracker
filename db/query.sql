DELETE FROM department where id >4;
DELETE FROM role where id >8;
DELETE FROM employee where id >8;

ALTER TABLE department AUTO_INCREMENT=1;
ALTER TABLE role AUTO_INCREMENT=1;
ALTER TABLE employee AUTO_INCREMENT=1;
