const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Min length password - 6 symbols').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body

      // Check validator on errors
      const errors = validationResult(req)
      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Вы ввели некорректные данные'
        })
      }

      // Check on already exist account
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь уже существует' })
      }

      // Hash password & chreate user
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      // Save user in DB & response
      await user.save()
      res.status(201).json({ message: 'Пользователь успешно зарегестрирован' })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Incorrect email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Password field is Empty').exists()
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body

      // Check validator on errors
      const errors = validationResult(req)
      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Вы ввели некорректные данные'
        })
      }

      // Check user on DB
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      // Check user password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Некорректный пароль' })
      }

      // Create auth token
      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h'
      })
      res.json({ token })
    } catch (e) {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
)

module.exports = router
