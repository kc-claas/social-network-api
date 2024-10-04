import { Router } from "express";

const router = Router()

// route is /api/thoughts/

router.route('/').get().post()

router.route('/:thoughtId').get().put().delete()

router.route('/:thoughtId/reactions').post().delete()

export default router