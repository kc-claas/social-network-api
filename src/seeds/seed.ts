import {User, Thought} from "../models/index.js";
import db from "../config/connection.js";



try {
    await db()

    await User.create({username: "MrExample", email: "example@email.com"})

    const thought = await Thought.create({thoughtText: "Is this a test?", username: "MrExample"})

    await User.findOneAndUpdate({username: "MrExample"}, {$addToSet: {thoughts: thought._id}}, {new: true, runValidators: true})

    const thought2 = await Thought.create({thoughtText: "Think I'm gonna delete this one", username: "MrExample"})

    await User.findOneAndUpdate({username: "MrExample"}, {$addToSet: {thoughts: thought2._id}}, {new: true, runValidators: true})

    const user2 = await User.create({username: "InvisibleFriend", email: "Invisible@email.com"})

    await User.findOneAndUpdate({username: "MrExample"}, {$addToSet: {friends: user2._id}}, {new: true, runValidators: true})

    await Thought.findOneAndUpdate({_id: thought._id}, {$addToSet: {reactions: {reactionBody: "I think so...", username: user2.username}}})

    console.log("database seeded")
    process.exit(0)
} catch(error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}


