const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server");
const { Article } = require("../../models");
const auth = require("../../utils/auth");

const { validateArticleInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async articles() {
      try {
        return await Article.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error(error);
      }
    },
    async article(_, { id }) {
      try {
        
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new UserInputError("id is not valid");
      }

        const response = await Article.findById(id);
        if (response) {
          return response;
        } else {
          throw new Error("article not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async CreateArticle(_, { CreateArticleInput }, context) {
      const user = auth(context);

      const { errors, valid } = validateArticleInput(CreateArticleInput);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const save = await Article.create({
        article: CreateArticleInput.article,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const response = await save.save();

      context.pubsub.publish("NEW_ARTICLE", {
        newArticle: response,
      });

      return response;
    },
    async DeleteArticle(_, { DeleteArticleInput }, context) {
      const user = auth(context);

      const article = await Article.findOne({
        _id: DeleteArticleInput.id,
        username: user.username,
      });

      if (!article) {
        throw new UserInputError("Errors", "article not found");
      }

      const response = await Article.deleteOne({
        _id: DeleteArticleInput.id,
      });

      return article;
    },

    async LikeArticle(_, { LikeArticleInput }, context) {
      const user = auth(context);

      const article = await Article.findById(LikeArticleInput.id);

      if (!article) {
        throw new Error("article not found");
      }

      if (article.likes.find((like) => like.username === user.username)) {
        article.likes = article.likes.filter(
          (like) => like.username !== user.username
        );
      } else {
        article.likes.push({
          username: user.username,
          createdAt: new Date().toISOString(),
        });
      }

      await article.save();
      return article;
    },
  },
  Article: {
    likeCount(parent) {
      return parent.likes.length;
    },
    commentCount(parent) {
      return parent.comments.length;
    },
  },
  Subscription: {
    newArticle: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_ARTICLE"),
    },
  },
};
