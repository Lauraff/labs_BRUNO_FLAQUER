# Lab 3: Storage

## Introduction

The objective of this lab is to discover the storage of data by using leveDB as well as how to test our code with postman.

## Installation instructions

If you want to use this project you should clone the git repository, then type the command "npm install" before running the program using "npm run dev" or "npm run start".

## Examples of use

command to run the project (in the folder): 
npm run dev

If you go to the url adress: 
http://localhost:8080 our application will be displayed.

To test the use of the levelDB database, you can use "Postman".

- To test POST: 
	1) Enter the data you wish to add in the "body" tag
		ex: [
  			{ "timestamp":"1384686660001", "value":"21" },
  			{ "timestamp":"1384686660002", "value":"22" }
	
		]
	2) Select "POST" and type in the url followed by the id number of your choice
     		ex: http://localhost:8080/metrics/1

- To test GET:
	1) To get all data: SELECT "GET" and type in the url
		ex: http://localhost:8080/metrics/

	2) To get data from one id: SELECT "GET" and type in the url followed by the id number of your choice
		ex: http://localhost:8080/metrics/1

- To test DELETE:
	1) To delete data from one id: SELECT "DELETE" and type in the url followed by the id number of your choice
		ex: http://localhost:8080/metrics/1

	2) To delete data from one key: SELECT "GET" and type in the url followed by the id number and timestamp of your choice 
		ex: http://localhost:8080/metrics/1/1384686660001


## List of contributors

Bruno Charlene and Flaquer Laura