const jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
      jwt.verify(token, process.env.SECERT_KEY, (err, user) => {
        console.log("user", user);
        if (err) {
          console.log("eadasdadasdadsadasda rr", err);
          return res.sendStatus(403);
        }
        req.user = user;

        return next();
      });
    } catch (error) {
      console.log("asdasasadasasdas ereeer", error);
      // if (
      //     [JsonWebTokenError, TokenExpiredError].some((el) => error instanceof el)
      // ) {
      //     return res
      //         .status(401)
      //         .json({ message: "token expires please generate new one !!" });
      // }
    }
  } else {
    return res.sendStatus(401);
  }
}
module.exports = { verifytoken };



/* 
import { User } from "../models";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/auth.helper";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.headers.authorization &&
      !req.headers.authorization?.startsWith("Bearer")
    ) {
      return res.status(401).json({ message: "Please login to Access  !!!" });
    }

    const token = req.headers.authorization.split(" ")[1];

    const userIdFromToken = verifyToken(token);
    const user = await User.findByPk(userIdFromToken.userId);
    if (!user) res.status(401).json({ message: "unauthorized !!!" });
    res.locals.userData = user;
    return next();
  } catch (error) {
    console.log("middleware Error:::::", JSON.parse(JSON.stringify(error)));

    if (
      [JsonWebTokenError, TokenExpiredError].some((el) => error instanceof el)
    ) {
      return res
        .status(401)
        .json({ message: "token expires please generate new one !!" });
    }
    res.json({ message: error });
  }
};

export { authentication };

*/