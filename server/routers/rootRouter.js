const requestController = require('../controllers/requestController')
const coachController = require('../controllers/coachController')
const authController = require('../controllers/authController')
const { Router } = require('express')
const router = Router()

/* ===***=== */
router.get('/getRequests', authController.isAuth, requestController.getRequests)
router.delete('/deleteRequestById/:id', authController.isAuth, requestController.deleteRequestById)
router.post('/createRequest', requestController.createRequest)

/* ===***=== */
router.get('/getCoaches', coachController.getCoaches)
router.delete('/deleteCoachById/:id', authController.isAuth,
  authController.hasPermission('admin'), coachController.deleteCoachById)

/* ===***=== */
router.post('/createCoach', authController.createCoach)
router.post('/loginCoach', authController.loginCoach)
router.post('/logout', authController.isAuth, authController.logout)


router.get('/loadAuthUser', authController.loadAuthUser)

module.exports = router