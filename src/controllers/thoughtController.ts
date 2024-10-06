import { Request, Response } from "express"
import { User, Thought } from "../models/index.js"

// get route for all thoughts

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find()
        res.json(thoughts)
        
    } catch (error) {
        res.status(500).json(error)
    }
}


// post route for creating thought

export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body)
        const user = await User.findOneAndUpdate({username: newThought.username}, {$addToSet: {thoughts: newThought._id}}, { runValidators: true, new: true })

        if (!user) {res.status(400).json({message: "User not found"})}
        res.json(newThought)

    } catch (error) {
        res.status(500).json(error)
    }
}

// get route for single thought

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId})
        if (!thought) {res.status(400).json({message: "Thought not found"})}
        res.json(thought)

    } catch (error) {
        res.status(500).json(error)
    }
}

// put route for single thought

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, { runValidators: true, new: true })
        if (!thought) {res.status(400).json({message: "Thought not found"})}
        res.json(thought)

    } catch (error) {
        res.status(500).json(error)
    }
}

// delete route for single thought

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId})
        if (!thought) {res.status(400).json({message: "Thought not found"})}
        res.json({messsage: "Thought deleted"})

    } catch (error) {
        res.status(500).json(error)
    }
}

// post route for single thought adding new reaction

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions: req.body}}, { runValidators: true, new: true })
        if (!thought) {res.status(400).json({message: "Thought not found"})}
        res.json(thought)

    } catch (error) {
        res.status(500).json(error)
    }
}

// delete route for single thought removing reaction

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.body.reactionId}}}, { runValidators: true, new: true })
        if (!thought) {res.status(400).json({message: "Thought not found"})}
        res.json({message: "Reaction deleted"})

    } catch (error) {
        res.status(500).json(error)
    }
}