import {Document, Schema, model, } from "mongoose"

interface iChat {
    member: Array<string>
}

interface iChatData extends iChat, Document {}

const chatModel = new Schema (

    {
        member : {
            type: Array<String>
        }
    },
    {timestamps: true}
)
export default model<iChatData>("chat", chatModel)