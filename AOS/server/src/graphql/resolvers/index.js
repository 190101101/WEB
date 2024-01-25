const article = require("./article");
const user = require("./user");
const comment = require("./comment");

module.exports = {
  Query: { ...article.Query, ...user.Query },
  Mutation: {...user.Mutation, ...article.Mutation, ...comment.Mutation },
};