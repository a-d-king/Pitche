const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (req.body.field === 'email') {
      await User.update({email: req.body.value}, {where: {id: req.params.id}})
    }
    if (req.body.field === 'password') {
      await User.update(
        {password: req.body.value},
        {where: {id: req.params.id}}
      )
    }
    const newUserInfo = await User.findByPk(req.params.id)
    res.json(newUserInfo)
  } catch (err) {
    next(err)
  }
})

// PUT /api/users/:id/tutorial
router.put('/:id/tutorial', async (req, res, next) => {
  try {
    const {id} = req.params
    await User.update(
      {tutorialCompleted: true},
      {
        where: {
          id
        }
      }
    )
    const newUserInfo = await User.findByPk(req.params.id)
    res.json(newUserInfo)
  } catch (err) {
    next(err)
  }
})

// PUT /api/users/:id/imageUrl
router.put('/:id/imageUrl', async (req, res, next) => {
  try {
    const {id} = req.params
    const {imageUrl} = req.body
    await User.update(
      {imgUrl: imageUrl},
      {
        where: {
          id
        }
      }
    )
    const newUserInfo = await User.findByPk(req.params.id)
    res.json(newUserInfo)
  } catch (err) {
    next(err)
  }
})
