
<a name="readme-top"></a>


# OKCU Student Change Form

## **Introduction**

This project is a student's school change form for the students of **Oklahoma City University**. This program allows students to send the school change request to their respective advisor. After receiving the request advisor can approve or deny it. The change will be notified to Dean as well.

## **Built With**

- Download NodeJS, [Official Link](https://nodejs.org/en/download/)
- Download Mysql Workbench [Official Link](https://dev.mysql.com/downloads/workbench/)
- Download NPM, [Official Link]()
- Web framework for Node.js, [Express](http://expressjs.com/)
- JavaScript ORM  for Node.js, [Bookshelf](http://bookshelfjs.org/)
- SQL Query Builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, and Oracle, [Knex](http://knexjs.org/)
- JavaScript library for building user interfaces, [React](https://facebook.github.io/react/)
- Predictable state container, [Redux](http://redux.js.org/)
- Redux Form, [Redux Form](http://redux-form.com/8.3.0/)


<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

## **Project Installation**

Run the following commands in the command prompt:

``` 
 $ git clone https://github.com/abhandari07/Academic_Change_Form
 $ cd Academic_Change_Form
 $ cp .env.example .env
** Create a database (example: create database csassignment_form;)
** Change database configuration in .env (DB_CLIENT=mysql DB_HOST=localhost DB_USER=root DB_PASSWORD=test DB_NAME=csassignment_form DB_PORT=3306)
 $ npm install
 $ npm run migrate
 $ npm run build (For development) or
 $ npm run build:prod (For production)
 ```
 
 ## **Database and Migration Process**
 
Run the following command to create a migration file:

```
$ npm run migrate:make modify_student
```

After executing the above command the new migration file will be created (_server/migrations/_). There are two function *_exports.up = function(knex)_* and *_exports.down = function(knex)_*, to create table, add the table configuration in up function. 

**Example:**

```
exports.up = function(knex) {
    return knex.schema.createTable('modify_student', table => {
        table.increments('id').primary().unsigned();
        table.string('name').notNullable();
    });
};
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('academic_info');
};
```

## **How Create New API:**

1. Add new parent route in _server/routes/index.route.js_
2. Add new controller in _server/controllers_ 
3. Add new route file in _server/routes_ with appropriate http methods

## **How to Create New Page:**

1. Add new container in _client/containers_
2. Add new component in _client/components_
3. Add new varaible in _client/constants_
4. Add new routes in _client/routers_
 

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

**UML**

![alt text](https://github.com/abhandari07/Academic_Change_Form/upload/master/public/img/uml.png "Database Design")


## **Database Table Structure:**

> User Table

id|first_name|last_name|email|password|user_type|status|signature|created_at|updated_at
|-|-|-|-|-|-|-|-|-|-|
|-|-|-|-|-|-|-|-|-|-|

> Student

id|BID|catalogYear|addOnly|created_at|updated_at|student_id|date
|-|-|-|-|-|-|-|-|
|-|-|-|-|-|-|-|-|


> Academic Info

id|school_name|degree|major|minor|advisor_id|dean_id|is_advisor_approved|is_dean_approved|old_new_flag|student_id|created_at|updated_at
|-|-|-|-|-|-|-|-|-|-|-|-|-|
|-|-|-|-|-|-|-|-|-|-|-|-|-|

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

