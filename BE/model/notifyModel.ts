import { Document, Schema, model} from "mongoose"

interface iChat {
    notice:  {}
}

interface iChatData extends iChat, Document {}

const notifyModel = new Schema (
    {
        notice : {
            type: {}
        } ,
    }, {timestamps: true}
)

export default model<iChatData>("notify", notifyModel)