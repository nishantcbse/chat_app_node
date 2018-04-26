#Chat applications 
The application has been developed using two javascript frameworks nodejs for server side services and angularjs for clientside.
To install and run the application clone the repo

```bash
git clone https://github.com/galagade/chat_app_node
```
after cloning the project follow the steps below
## Installing process

## Angularjs
make sure you have angularjs set up on your machine
using user terminal go to client directory
 ```bash
cd client
```
then use 'npm' to install modules
```bash
npm install
``` 
## NodeJs
make sure you have Node v7 and above installed on your machine
and db:migrate installed
```bash
npm install -g db-migrate
``` 

using user terminal go to server directory

 ```bash
cd server
```
then use 'npm' to install modules
```bash
npm install
``` 
create .env file and set using the following example
```txt
NODE_ENV=dev
PORT=3000
SQL_HOST=localhost
SQL_USER=root
SQL_PASSWORD=
SQL_DATABASE=jadey_chat
TEST_MODE=false
JWT_SECRET=whatyouseeiswhatyougetbouy

``` 
then run migration using 
```bash
db-migrate up
``` 

## running application
## Nodejs
 ```bash
cd server
npm start
```
## Angularjs
 ```bash
cd client
ng serve
```
## Testing application 
## Nodejs
 ```bash
cd server
npm test
```
## Angularjs
 ```bash
cd client
npm test
```
