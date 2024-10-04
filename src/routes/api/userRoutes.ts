import { Router } from "express";

const router = Router()

// route is /api/users/

router.route('/').get().post()

router.route('/:userId').get().put().delete()

router.route('/:userId/friends/:friendID').post().delete()



export default router