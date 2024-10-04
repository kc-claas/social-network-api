import { Schema, model, Document, ObjectId } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
       username: {
        type: String,
        unique: true,
        required: true,
        trim: true
       },
       email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/
       },
       thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
       friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
       }] 
    },{
        toJSON: {virtuals: true, getters: true},
        id: false
    }

)

userSchema.virtual("friendCount").get(function (){
    return this.friends.length
})

const User = model('User', userSchema)


export default User