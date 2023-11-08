import express from "express"
import { createAuth,  findAllAuth,  findOneAuth, makeFriends, unFriend} from "../controller/authController"


const Router = express.Router()

Router.route("/create-auth").post(createAuth)
Router.route("/find-one-auth/:authID").get(findOneAuth)
Router.route("/find-all-auth").get(findAllAuth)
Router.route("/un-friend/:authID/:friendID").patch(unFriend)
Router.route("/make-friend/:authID/:friendID").patch(makeFriends)

export default Router