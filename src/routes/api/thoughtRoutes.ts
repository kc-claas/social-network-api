import { Router } from "express";
import { addReaction, createThought, deleteThought, getAllThoughts, getSingleThought, removeReaction, updateThought } from "../../controllers/thoughtController.js";

const router = Router()

// route is /api/thoughts/

router.route('/').get(getAllThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction)

export default router