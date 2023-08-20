## frontend

#### Technologies used

- **`React`** for creating UI. _`Documentation`_ [React](https://reactjs.org/)</br>
- **`React Router`** for routing. _`Documentation`_ [React Router](https://reactrouter.com/en/main)</br>
- **`Typescript`** for type safety. _`Documentation`_ [TypeScript](https://www.typescriptlang.org/)</br>
- **`axios`** for making HTTP requests. _`Documentation`_ [axios](https://axios-http.com/)</br>
- **`TailwindCSS`** for writing CSS. _`Documentation`_ [TailwindCSS](https://tailwindcss.com/)
- **`React Hook Form`** is React library used to creating forms. _`Documentation`_ [React Hook Form](https://react-hook-form.com/)
- **`Redux`** for state management. _`Documentation`_ [Redux](https://react-redux.js.org/)

#### Installation

Use `npm install` to install all dependencies.</br>

#### Usage

Use `npm start` to start server.</br>

Open your browser and navigate to http://localhost:3000/

## backend

#### Technologies used

- **`ExpressJS`** for creating HTTP server. _`Documentation`_ [ExpressJS](https://expressjs.com/)</br>
- **`Mongoose`** is Object Data Modeling (ODM) library for MongoDB. _`Documentation`_ [Mongoose](https://mongoosejs.com/)</br>
- **`jsonwebtoken`** for decoding, verifing and generating JSON Web Token. _`Documentation`_ [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md)</br>
- **`Bcrypt`** for hashing passwords. _`Documentation`_ [bcryptJS](https://github.com/kelektiv/node.bcrypt.js/blob/master/README.md)
- **`MongoDB`** using as database. _`Documentation`_ [MongoDB](https://www.mongodb.com/)

#### Scripts

Use `npm build` to build server for deployment.</br>
Use `npm start` to start server.</br>
Use `npm run start:dev` to start server in development mode.</br>

#### Installation

Use `npm install` to install all dependencies.</br>

#### Env File

At the root folder create .env file</br>
_Copy and paste below provided info_

> PORT='3001'</br>
> MONGO_DB_URI='mongodb+srv://juozukaskakekre:jngTx6qteW1MxM5C@nfq-task.uw60q0y.mongodb.net/?retryWrites=true&w=majority'</br>
> SECRET_KEY='$2b$08$HdJQyQ7ulcwwmYqzswEZqu'</br>
> JWT_SECRET_KEY='YqzswEZq'

#### Usage

Use `npm start` to start server.</br>

> Terminal should show

```
Server started on PORT: 3001
```
