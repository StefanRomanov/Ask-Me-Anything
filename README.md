# Ask Me Anything

A simple app for asking and answering questions, inspired by Stackoverflow, Quora and others. The application is built as a SPA using Angular 7. It uses Express.js back end. The data is stored using PostgreSQL.

## Installation

Run `npm install` in both 'front-end' and 'back-end' folders.Front-end runs by default on `http://localhost:4200/`.


## Functionality overview

The application supports three roles : Root, Admin and User. The first registered user is authomatically given the Root role. All other users after that are given the User role. Root and Admins can assign roles within the application, while the Root role can never be changed.
