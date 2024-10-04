import { Schema, Types, Document, ObjectId } from "mongoose";

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: parseDate
        }    
    },{
        id: false,
        toJSON: {getters: true}

    }
)

function parseDate(date: Date){
    return new Date(date)
}


export default reactionSchema