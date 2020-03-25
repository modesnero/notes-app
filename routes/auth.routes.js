const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const authRouter = Router()

authRouter.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Min length password - 6 symbols').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data'
        })
      }

      const { email, password } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      const hashedPassword = bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()
      res.status(201).json({ message: 'User has been created' })
    } catch (e) {
      res.status(500).json({ message: 'Server Error' })
    }
  }
)

authRouter.post(
  '/login',
  [
    check('email', 'Incorrect email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Password field is Empty').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login data'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' })
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h'
      })

      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Server Error' })
    }
  }
)

module.exports = authRouter
