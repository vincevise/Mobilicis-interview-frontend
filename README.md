# Mobilicis-interview-frontend

https://user-images.githubusercontent.com/88813613/234343505-8662471b-3ffd-45a7-aa28-ec0d94640821.mp4

This app was created as a part of interview task

<a href="https://dreamy-cassata-48cd76.netlify.app"/>LIVE DEMO</a>



backend repo : https://github.com/vincevise/Mobilicis-interview-task

### Task Brief

Create a “Node.js” Application using Express Framework and MongoDB Database and Connect it to your Frontend Application (Which can be developed using either React or Nextjs)


You must fetch the following data using the API and display it on the frontend in a table format:

1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
2. Male Users which have phone price greater than 10,000.
3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
5. Show the data of top 10 cities which have the highest number of users and their average income.

### About / Solution
 The frontend of the application is built using React and styled with Tailwind CSS. I have implemented the suggested filter queries as filter chips, allowing users to click on the filters to display the data in a table format below. Additionally, I have also added a range slider for filtering by income and phone price. Furthermore, I have utilized the React-Table library, which provides an efficient way to create tables and can be easily customized to meet specific requirements.

On the backend, I used Node.js and Express server, along with MongoDB for the database. This task helped me gain proficiency in working with the React-Table library and performing aggregation queries using Mongoose in MongoDB.




