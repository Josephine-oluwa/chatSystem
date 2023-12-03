import  {Request, Response} from "express"
import authModel from "../model/authModel"


export const createAuth =async (req: Request, res: Response )=> {
    try {
        const {email, userName, password}  = req.body

        const auth = await authModel.create({
            email, userName, password 
        })

        return res.status(201).json({
            message: "successfully created auth",
            data: auth
        })
    } catch (error: any) {
        return res.status(404).json({
            message: "error while creating auth"
        })
    }
}



export const findOneAuth =async (req: Request, res: Response )=> {
    try {
             const {authID} = req.params

        const auth = await authModel.findById(authID)
        return res.status(200).json({
            message: "successfully found one auth",
            data: auth
        })
    } catch (error: any) {
        return res.status(404).json({
            message: "error while creating auth"
        })
    }
}
export const signInAuth =async (req: Request, res: Response )=> {
    try {
             const {email, password} = req.params

        const auth = await authModel.findOne({email})
        return res.status(200).json({
            message: "successfully signed up",
            data: auth
        })
    } catch (error: any) {
        return res.status(404).json({
            message: "error while creating auth"
        })
    }
}


export const findAllAuth =async (req: Request, res: Response )=> {
    try {

        const user = await authModel.find()

        return res.status(201).json({
            message: "successfully found all auth",
            data: user
        })
    } catch (error: any) {
        return res.status(404).json({
            message: "error while creating auth"
        })
    }
}



export const makeFriends = async (req: Request, res: Response )=> {
   try {
    const {authID, friendID} = req.params
    const auth:any = await authModel.findById(authID)
    const friend = await authModel.findById(friendID)

    if (auth && friend) {
        if (auth.friend.some((el:string) => el === friendID)) {
            return res.status(404).json({
                message: "you are already friends now"
            })
        } else {
            let authPush = [...auth.friend, authID]

            let friendPush = [...friend.friend, authID];

            const makeFri = await authModel.findByIdAndUpdate(
                authID,
                {
                    friend: authPush,
                }, {new: true}
            );

            const newAuth = await authModel.findByIdAndUpdate(
                friendID,
                {
                    friend : friendPush
                }, 
                {new: true}
            )
            return res.status(200).json({
                message: "you are now friends",
                data: {makeFri, newAuth}
            })
        }
    } else {
        return res.status(404).json({
          message: "Error"  
        })
    }
   } catch (error) {
    return res.status(404).json({
        message: "Error"  
      })
   }
}





export const unFriend =async (req: Request, res: Response )=> {
    try {
        const {authID, friendID} = req.params
                const auth:any = await authModel.findById(authID)
                const friend = await authModel.findById(friendID)

                if(auth && friend) {
                    const makeFri = await authModel.findByIdAndUpdate(
                        authID,
                        {
                            friend: auth.friend((el: any) => el !== friendID)
                        },
                        {new: true}
                    )
                    const newAuth = await authModel.findByIdAndUpdate(
                        friendID,
                        {
                            friend: friend.friend.filter((el:any) => el !== authID)
                        },
                        {new: true}
                    );

                    return res.status(201).json({
                        message: "you are now friend",
                        data: {makeFri, newAuth}
                    })
                } else {
                    return res.status(201).json({
                        message: "something went wrong",
                       
                    })  
                }
                
            } catch (error) {
                return res.status(404).json({
                    message: "successful"
                })
            }}
