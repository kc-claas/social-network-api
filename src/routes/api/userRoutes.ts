import { Router } from "express";
import { addFriend, createUser, deleteUser, getAllUsers, getSingleUser, removeFriend, updateUser } from "../../controllers/userController.js";

const router = Router()

// route is /api/users/

router.route('/').get(getAllUsers).post(createUser)

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)



export default router