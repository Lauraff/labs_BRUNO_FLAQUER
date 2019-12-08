# Lab 4: Unit testing & Middlewares

## Introduction

The objective of the first part of this lab is to discover the unit testing of simple functions by using mocha and chai. The objective of the second part is to discover middleware and how to use it to do authentification and access to requests.

## Installation instructions

If you want to use this project you should clone the git repository, then type the command "npm install" before running the program using "npm run dev" or "npm run start".To test the unit tests use the command "npm test"


## Explanation of Unit testing

command to test the project (in the folder): 
npm test

To test the functions of the project:

### To test get:
	1) Tests if the array of metrics in the leveldb is empty

### To test the Save function: 
	1) Tests if the data is saved in the db after created and pushed a metric 

	2)Tests if the data is well updated


### To test DELETE:
	1) Tests if the data is well deleted after a delete

	2)  Tests if the system does not fail if we try to delete a non existing data

## Explanation of Unit testing

command to test the project (in the folder): 
npm test

To test the functions of the project:

### To test get:
	1) Tests if the the array of metrics in the leveldb is empty

### To test the Save function: 
	1) Tests if the data is saved in the db after created and pushed a metric 

	2)Tests if the data is well updated


### To test DELETE:
	1) Tests if the data is well deleted after a delete

	2)  Tests if the system does not fail if we try to delete a non existing data


## Explanation of Middleware

We use Middleware to get authentification: session, account,...

### AuthCheck

AuthCheck is useful to check if a user has the authorization to access to a page or a feature (if he/she is logged or not)

## List of contributors

Bruno Charlene and Flaquer Laura