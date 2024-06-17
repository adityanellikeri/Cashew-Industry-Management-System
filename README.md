# Cashew Industry Management System (CIMS)

This project initiates the development of CIMS, a web-based solution for the cashew industry. CIMS automates attendance, wage, PF, bonus calculations, and stock management to improve efficiency, accuracy, and compliance, transforming industry operations and fostering enhanced transparency and productivity.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)

## Features

- Automated attendance management
- Wage calculation
- Provident Fund (PF) management
- Bonus calculations
- Stock management

## Technologies Used

- Frontend: React, HTML, CSS (Bootstrap)
- Backend: Node.js, Express
- Database: MySQL

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/adityanellikeri/Cashew-Industry-Management-System.git
   cd Cashew-Industry-Management-System

2. Install the necessary packages for both frontend and backend:
   ```sh
   npm install express react react-dom react-router-dom axios papaparse

3. Install XAMPP for the backend:
   
   - Download and install XAMPP from the official website.
   - Start Apache and Mysql server and go to "http://localhost/phpmyadmin/".
   - Create a new database named "employeecasheworg".
   - Now click on import from topbar and upload the 'employeecasheworg.sql' provided in code section.
   
## Project Structure

The project consists of two main folders:

EmployeeCashew: Contains frontend components.
Server: Contains backend components.

## Usage

### Starting the Backend Server

1. Open a terminal and navigate to the `Server` folder:
   ```sh
   cd Server

2. Install server dependencies:
   ```sh
   npm install

3. Start the server:
   ```sh
   npm start

### Starting the Frontend

1. Open a terminal and navigate to the `EmployeeCashew` folder:
   ```sh
   cd Server

2. Insall the server dependencies:
   ```sh
   npm install

3. Start the server:
   ```sh
   npm run dev

