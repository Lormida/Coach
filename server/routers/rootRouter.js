const requestController = require('../controllers/requestController')

const { Router } = require('express')
const router = Router()

router.get('/getRequests', requestController.getRequests)
router.post('/createRequest', requestController.createRequest)
router.delete('/deleteRequestById/:id', requestController.deleteRequestById)

module.exports = router