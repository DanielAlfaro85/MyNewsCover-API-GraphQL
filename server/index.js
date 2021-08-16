const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphQLschema } = require('./schemas/NewsSchema.js')
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/Ultimate-project");

const News = require("./models/newsModel");

// functions

const getNews = () => {
  return News.find(function (err, news) {
    if (err) {
      return "There was an error"
    }
    return news;
  })
};

const createProduct = async (req) => {
  const product = new Product();

  product.quantity = req.quantity;
  product.name = req.name;
  product.price = req.price;


  const guardar = await product.save();

  if(guardar){
    return product;
  }else{
    return "Error";
  }
}

// expose in the root element the different entry points of the
// graphQL service
const root = {
  //Queries
  news: () => getNews(),

  //Mutations
  createProduct: (req) => createProduct(req)
};

// instance the expressJS app
const app = express();
// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

//one single endpoint different than REST
app.use('/graphql', graphqlHTTP({
  schema: graphQLschema,
  rootValue: root,
  graphiql: true, 
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));


