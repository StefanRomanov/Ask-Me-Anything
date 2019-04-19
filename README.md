# Ask Me Anything

“Ask Me Anything” is simple web application for asking and answering questions. The application is built as a SPA using Angular 7 and Bootstrap 4. It uses Express.js and Node.js for the server side. The data is stored using PostgreSQL.

## Installation

Run `npm install` in both 'front-end' and 'back-end' folders.Front-end runs by default on `http://localhost:4200/`.


# Functionality overview

The application supports three roles : Root, Admin and User. The first registered user is authomatically given the Root role. All other users after that are given the User role. Root and Admins can assign roles within the application, while the Root role can never be changed.

## Anonymous users
  - Can login, register, access all Queries filtered by title and/or tag.
## User Login
  - Login in using username and password of already registered user. Usernames are unique identifier.
## User Register
  - Register a new user by providing email, password and username. 
## User Logout
  - Logouts from the application. 

## Queries
  - There are three ways of listing Queries in the application: All queries, by spefic tag or queries posted by the currently logged in user.  
  - Search by title and/or tag.
  - Anonymous cannot access queries of specific user
  - Results can be ordered by score or by date of posting.

## Ask a question

  - Accessible for logged in Users, but not for Admins and Root.
  - Creates new Query with the entered title, tags and description.

## Query Details
  - Shows query details
  - Anonymous, users and admins can see the content of the Query as well as all answers.
  - Answers can be ordered by score or by date posted.
  - All logged in users, including admin and root, can post answers

### Vote

  - From the details page logged in users can up-vote or down-vote Query or Answer. Votes can be changed at any time.
  - Users cannot vote for their own posts.   
  - Votes affect the score of the user by one point, which is reflected by the number next to the author's username.

### Edit

  - From the details page logged in users can edit their own Query or Answer.
  - Admins and Root cannot edit posts which are not theirs.

### Delete

  - From the details page Admin and Root can delete the specific Query or any of its answers. 
  - Delete does not affect the score of the author.
  - Delete of a Query removes all of it's answers as well.

### Close

  - From the details page Admin and Root can close and open the specific Query.
  - When Query is closed, posting answers is disabled.
  - Admin and Root can open the Query, which enables answering again.

## Manage users
  
  - Admins and Root can change role of users.
  - Root role cannot be changed.
  - Rights are granted or taken away immediately

  
### Used Tools
```
- Front end
  - Angular
  - Bootstrap
- Back end
  - Node.js, Express.js
  - PostgreSQL
```
