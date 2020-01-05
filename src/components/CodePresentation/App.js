import React from 'react'
import Snippet from './Snippet'
// Images/Assets
import Logos from '../../assets/images/svgLogos/logos'
// Styling
import './Common.css'

export default function App(props) {
  // this component is generic, basic app.js setup so it is always the same.
  const appBody = `// Libraries
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const graphqlHttp = require("express-graphql");
const app = express();
// Constants
const NODE_PORT = 4500;
const MONGO_PORT = 4501;
// GraphQL Resolvers and Schema
const graphqlResolvers = require("./graphql/resolvers/resolvers");
const graphqlSchema = require("./graphql/schema/schema");

app.use(bodyParser.json());

// Middleware to combat CORS errors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
    return res.sendStatus(200);
    }
    next();
});

// use defined schemas and resolvers
app.use(
    "/graphql", // this can be any URL you choose
    graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
    })
);
mongoose
    .connect(<ENTER YOUR MONGODB CONNECTION STRING HERE>)
    .then(() => {
    app.listen(MONGO_PORT);
    console.log("Successfully Connected.");
    console.log(chalk.yellow("Mongoose Listening On PORT:" + MONGO_PORT));
    })
    .catch(err => {
    console.log("Ooops! Error: " + err);
    });

app.listen(NODE_PORT);

console.log("NodeJS Listening On PORT: " + NODE_PORT);
`

  return (
    <div>
      <div className="codePresHeader">
        {Logos.nodeJS}
        <h2>
          <strong>App.js</strong> - NodeJS
        </h2>
      </div>

      <Snippet>{appBody}</Snippet>
    </div>
  )
}
