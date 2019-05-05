**Установка СУБД PostgreSQL**

`sudo apt-add-repository ppa:pitti/postgresql`

`sudo apt-get update`
 
`sudo apt-get install postgresql-9.2`
 
**Создание БД и Роли**

 `CREATE DATABASE shop;`
 
 `CREATE USER sanya WITH password 'sanya11';`
 
 `GRANT ALL ON DATABASE shop TO sanya;`
 
**Создание таблиц**

```
create table users(
id serial PRIMARY KEY,
name varchar NOT NULL,
email varchar NOT NULL,
password varchar NOT NULL,
phone varchar NOT NULL,
"createAt" date,
"updatedAt" date);

create table categories(
id serial PRIMARY KEY,
name varchar NOT NULL,
"createdAt" date,
"updatedAt" date);

create table products(
id serial PRIMARY KEY,
name varchar NOT NULL,
price integer NOT NULL,
description text NOT NULL,
quantity integer NOT NULL,
"categoryId" integer references categories(id),
"createdAt" date,
"updatedAt" date);

create table orders(
id serial PRIMARY KEY,
"userId" integer references users(id),
address varchar NOT NULL,
sum integer NOT NULL,
"createdAt" date,
"updatedAt" date);

create table "orderDetails"(
"orderId" integer references orders(id),
"productId" integer references products(id),
amount integer NOT NULL,
"createdAt" date,
"updatedAt" date,
PRIMARY KEY("orderId","productId"));

```

**Установка модулей**

`npm install --save pg pg-hstore express path sequelize body-parser cookie-parser pug fs `

**Запуск программы**

`node app.js`

**Зайти на сайт по ссылке**
`localhost:8000`
