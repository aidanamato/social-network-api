# 18. NoSQL Challenge: Social Network API

![MIT License](https://img.shields.io/badge/license-MIT-green)

## Description

This is a RESTful API created with express.js, a MongoDb database, and the Mongoose ODM. The database is populated with data pertaining to a mock Social Network application, and this API is built with endpoints that allow a user to perform CRUD operations on all facets of the database.

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

* `GET /user` - Returns a list of all users.
* `GET /user/:id` - Returns a single user with their `_id` passed as a parameter.
* `POST /user` - Creates a new user. The request body should be formatted as follows:
  * {  
      "username": "*user name here*" ,
      "email": "*email here*" 
    }
* `PUT /user/:id` - Updates an existing user with their `_id` passed as a parameter. The request body should be formatted the same as `POST /user`.
* `DELETE /user/:id` - Deletes a user with their `_id` passed as a parameter.
* `POST /user/:userId/friends/:friendId` - Updates a user's friend list, with the `_id` of the first user passed as `:userId` and the `_id` of the second user passed as `:friendId`.

### Product Routes

* `GET /products` - Returns a list of all products.
* `GET /products/:id` - Returns a single product with the id passed as a parameter.
* `POST /products` - Creates a new Product with the id passed as a parameter. The request body should be formatted as follows:
  * {  
      "product_name": "*product name here*"  
      "price": *product price here*,  
      "stock": *product stock here*,  
      "category_id": *id of category to which product belongs*,  
      -Optional-  
      tagIds: [*array of tag id's to which product belongs*]  
    }
* `PUT /products/:id` - Updates an existing product. The request body should be formatted the same as `POST /products`.
* `DELETE /products/:id` - Deletes a product with the id passed as a parameter.

### Tag Routes

* `GET /tags` - Returns a list of all tags.
* `GET /tags/:id` - Returns a single tag with the id passed as a parameter.
* `POST /tags` - Creates a new tag with the id passed as a parameter. The request body should be formatted as follows:
  * {  
    "tag_name": "*tag name here*"  
  }
* `PUT /tags/:id` - Updates an existing tag. The request body should be formatted the same as `POST /tags`.
* `DELETE /tags/:id` - Deletes a tag with the id passed as a parameter.

### [Walkthrough Video](https://watch.screencastify.com/v/ZQDiURHNmwazRrl0FlzY)

## License

[MIT](./LICENSE.txt)

## Credits

Starter Code

* [UCF Coding Bootcamp](https://github.com/coding-boot-camp/fantastic-umbrella)

Technologies

* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)

NPM Dependencies

* [Express](https://www.npmjs.com/package/express)
* [Sequelize](https://sequelize.org/)
* [Node MySQL 2](https://www.npmjs.com/package/mysql2?__cf_chl_captcha_tk__=pmd_D_9ZYQ1MY_s2zyp9_cyigjzi9F6rp.HQGrKz3R3K9gA-1632161698-0-gqNtZGzNAuWjcnBszQfR)
* [dotenv](https://www.npmjs.com/package/dotenv)

## Authors

Aidan Amato

## Questions

Please reach out if you have any additional questions!

* [GitHub](https://github.com/aidanamato)
* [Email](mailto:aidanamato@comcast.net)