# 18. NoSQL Challenge: Social Network API

![MIT License](https://img.shields.io/badge/license-MIT-green)

## Description

This is a RESTful API created with Express.js, a MongoDB database, and the Mongoose ODM. The database is populated with data pertaining to a mock Social Network application, and this API is built with endpoints that allow a user to perform CRUD operations on all facets of the database.

## Table of Contents

* [Installation and Setup](#installation)
* [Usage](#usage)
* [License](#license)
* [Credits](#credits)
* [Authors](#authors)
* [Questions](#questions)

<a id="installation"></a>
## Instillation and Setup

This application is replicating the back end of what would be a social network website, and is not actually deployed on the web. In order to test the API yourself, you will need to follow the instructions below to run the server from your local machine.

This application requires node.js. If you do not have node.js installed, you can download it [here](https://nodejs.org/en/). To begin the instillation process once node.js is installed, first clone this repository into your desired local directory. Next, navigate into the cloned repository and run the command `npm install` to install the required dependencies, and run the command `npm run seed` to fill the database with mock data. Lastly, it is recommended to use a program such as Insomnia to test the api once the server is running. You can download Insomnia [here](https://insomnia.rest/download).

Now the API is ready for use. Simply run `npm start` whenever you want to launch the server and start using the API routes.

## Usage

The base address when running the server is `localhost:3001/api`. This precedes all of the following routes.

### User Routes

* `GET /users` - Returns a list of all users.
* `GET /users/:id` - Returns a single user with their `_id` passed as a parameter.
* `POST /users` - Creates a new user. The request body should be formatted as follows:
  * {  
      "username": "*user name here*",
      "email": "*email here*"
    }
* `PUT /users/:id` - Updates an existing user with their `_id` passed as a parameter. The request body should be formatted the same as `POST /user`.
* `DELETE /users/:id` - Deletes a user with their `_id` passed as a parameter.
* `POST /users/:userId/friends/:friendId` - Create a friendship between two users, with the `_id` of the first user passed as `:userId` and the `_id` of the second user passed as `:friendId`.
* `DELETE /users/:userId/friends/:friendId` - Delete a friendship between two users, with the `_id` of the first user passed as `:userId` and the `_id` of the second user passed as `:friendId`.

### Thought Routes

* `GET /thoughts` - Returns a list of all thoughts.
* `GET /thoughts/:id` - Returns a single thought with the `_id` passed as a parameter.
* `POST /thoughts` - Creates a new thought with the `_id` passed as a parameter. The request body should be formatted as follows:
  * {  
      "thoughtText": "*thought text here*",
      "username": *username here*
    }
* `PUT /thoughts/:id` - Updates an existing thought with the `_id` passed as a parameter. . The request body should be formatted the same as `POST /thought`.
* `DELETE /thoughts/:id` - Deletes a thought with the `_id` passed as a parameter.

#### Reaction Routes

* `POST /thoughts/:thoughtId/reactions` - Creates a new reaction with the thought `_id` passed as a parameter. The request body should be formatted as follows:
  * {
      "reactionBody": "*reaction body here*",
      "username": "*username here*"
    }
* `DELETE /thoughts/:thoughtId/reactions/reactionId` - Creates a reaction with the thought `_id` and the reaction `_id` passed as a parameter.

### [Walkthrough Video](https://watch.screencastify.com/v/gHnEQHu9E9ICK6ijvtAB)

## License

[MIT](./LICENSE.txt)

## Credits

Technologies

* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

NPM Dependencies

* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [faker](https://www.npmjs.com/package/faker)

## Authors

Aidan Amato

## Questions

Please reach out if you have any additional questions!

* [GitHub](https://github.com/aidanamato)
* [Email](mailto:aidanamato@comcast.net)