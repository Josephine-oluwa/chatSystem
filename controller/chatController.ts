import express, {Request, Response} from "express"
import authModel from "../model/authModel"
import chatModel from "../model/chatModel"


export const createChat = async (req: Request, res: Response) => {
    try {
        const {authID, friendID} = req.params

        const user = await authModel.findById(authID)
        const friend = await authModel.findById(friendID)

        const findUserFriend = user?.friend.some((el:any) => el === friendID);

        const findFriendFriend = friend?.friend.some((el:any) => el === authID);

        if(findFriendFriend && findUserFriend) {
            const chat = await chatModel.create({
                member: [authID, friendID]
            })
            return res.status(201).json({
                message: "chat created",
                data: chat,
              });
        } else {
            return res.status(404).json({
                message: "You are not friends",
              });
           
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}


export const findOneChat = async (req: Request, res: Response) => {
    try {
        const {authID, friendID} = req.params

        const chat = await chatModel.findOne({
            member: {
                $all: [authID, friendID]
            }
        })
       return res.status(200).json({
        message: "chat created", 
        data: chat
       })
    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}


export const findChat = async (req: Request, res: Response) => {
    try {
        const authID = req.params;

        const chat = await chatModel.find({
            member: {
                $in: [authID]
            }
        })
        return res.status(201).json({
           message: "chat created" ,
           data: chat
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}