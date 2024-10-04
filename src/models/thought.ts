import { Schema, model, Document } from "mongoose";
import reactionSchema from "./reaction.js";

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof reactionSchema[];
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            maxlength:280,
            minlength:1,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: parseDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },{
        toJSON: { virtuals: true, getters: true},
        id: false
    }
)



function parseDate(date: Date){
    return new Date(date)
}

thoughtSchema.virtual("reactionCount").get(function (){
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

export default Thought