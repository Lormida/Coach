const requestController = require('../controllers/requestController')
const coachController = require('../controllers/coachController')

const { Router } = require('express')
const router = Router()

/* ===***=== */
router.get('/getRequests', requestController.getRequests)
router.post('/createRequest', requestController.createRequest)
router.delete('/deleteRequestById/:id', requestController.deleteRequestById)
/* ===***=== */
router.get('/getCoaches', coachController.getCoaches)
router.post('/createCoach', coachController.createCoach)
router.delete('/deleteCoachById/:id', coachController.deleteCoachById)

module.exports = router