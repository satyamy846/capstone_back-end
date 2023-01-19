const logger = require("./logger");
const User = require("../models/users");
const Community = require("../models/communities");
const jwt = require("jsonwebtoken");
const config = require("./config");
const Comment = require("../models/comments");
const Reply = require("../models/replies");
const Posts = require("../models/posts");
const { sortQueryHandler } = require("./queryHandler");

const errorHandler = (error,request, response,next) => {
    logger.error(error);
    switch (error.name) {
    case "CastError":
    case "ValidationError":
    case "TypeError":
    case "MongoServerError":
    case "MulterError":
        response.status(400).json({ error: error.message });
        break;
    case "credentialError":
        response.status(400).json({
            error: error.message || "Invalid Credentials. Please Try again",
        });
        break;
    case "notFoundError":
        response.status(404).json({ error: "No Resource Error" });
        break;
    case "unauthorizedAccessError":
    case "jsonWebTokenError":
    case "TokenExpiredError":
        response.status(401).json({ error: error.message });
        break;
    default:
        response.status(500).json({error:"internal error"});
    }
    next();
};

const unknownEndPointHandler = (request, response) => {
    
    response.status(404).json({ error: "Unknown Endpoint" });
};

const tokenExtractor = (request, response, next) => {
    const auth = request.get("authorization");

    request.token =
        auth && auth.toLowerCase().startsWith("bearer ")
            ? auth.substring(7)
            : null;
    next();
};

const userExtractor = async (request, response, next) => {
    const decodedToken =
        request.token != null ? jwt.verify(request.token, config.SECRET) : null;
    if (!request.token || !decodedToken) {
        throw {
            name: "jsonWebTokenError",
            message: "Access to resource denied",
        };
    }
    const user = await User.findById(decodedToken.id);
    request.user = user;
    next();
};

const extractor = async (request, model, modelName) => {
    const id = request.params.id || request.body[modelName];
    const objectOfModel = await model.findById(id);
    if (!objectOfModel) {
        throw { name: "notFoundError" };
    } else if (
        request.method !== "POST" &&
        objectOfModel.user.toString() !== request.user._id.toString()
    ) {
        throw {
            name: "unauthorizedAccessError",
            message: "Access to resource denied",
        };
    }
    return objectOfModel;
};

const communityExtractor = async (request, response, next) => {
    request.community = await extractor(request, Community, "community");
    next();
};
const postExtractor = async (request, response, next) => {
    request.post = await extractor(request, Posts, "post");
    next();
};

const commentExtracter = async (request, response, next) => {
    request.comment = await extractor(request, Comment, "comment");
    next();
};

const replyExtractor = async (request, response, next) => {
    request.reply = await extractor(request, Reply, "reply");
    next();
};

const paginationHelper = (request, response, next) => {
    request.body.offset = !parseInt(request.query.offset)?0:Number(request.query.offset);
    request.body.limit =
        !parseInt(request.query.limit) ||
            request.query.limit > 10 ||
            request.query.limit < 0
            ? 10
            : Number(request.query.limit);
    request.body.sortBy = sortQueryHandler(request.query.sortBy);
    next();
};


module.exports = {
    errorHandler,
    unknownEndPointHandler,
    tokenExtractor,
    userExtractor,
    communityExtractor,
    postExtractor,
    commentExtracter,
    replyExtractor,
    paginationHelper,
};