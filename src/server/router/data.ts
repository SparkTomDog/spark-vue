import { DataController } from '@s/controller/data.js'
import { Router } from 'express'

const router = Router()
const controller = new DataController()

router.post("/create", controller.createData)
router.post("/get", controller.getData)
router.post("/update", controller.updateData)
router.post("/delete", controller.deleteData)
router.post("/remove", controller.removeData)

export default router