import express from "express"
import { addToCart,removeFromCart,getCart } from "../controller/cartController.js"
import authMiddleware from "../middleware/auth.js";

const cartRoter = express.Router();

cartRoter.post("/add",authMiddleware,addToCart)
cartRoter.post("/remove",authMiddleware,removeFromCart)
cartRoter.post("/get",authMiddleware,getCart)

export default cartRoter;