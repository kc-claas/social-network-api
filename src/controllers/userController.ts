import { Request, Response } from "express"
import { User, Thought } from "../models/index.js"

// get route for all users

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}


// post route for creating user

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get route for single user

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId})
            .populate({path: "thoughts"})
            .populate({path: "friends"})
        if (!user) {res.status(400).json({messsage: "User not found"})}
        res.json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

// put route for single user

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, { runValidators: true, new: true })
        if (!user) {res.status(400).json({message: "User not found"})}
        res.json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete route for single user

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.userId})
        if (!user) {res.status(400).json({message: "User not found"})}
        
        await Thought.deleteMany({_id: {$in: user?.thoughts}})
        res.json({message: "User deleted"})
        
    } catch (error) {
        res.status(500).json(error)
    }
}

// post route for single user adding new friend

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, { runValidators: true, new: true })
        if (!user) {res.status(400).json({message: "User not found"})}

        res.json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete route for single user removing friend

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, { runValidators: true, new: true })
        if (!user) {res.status(400).json({message: "User not found"})}

        res.json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}