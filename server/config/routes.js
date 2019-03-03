const authRoutes = require('../routes/auth')
const bookRoutes = require('../routes/book')
const statsRoutes = require('../routes/stats')
const ordersRoutes = require('../routes/order')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/book', bookRoutes)
  app.use('/stats', statsRoutes)
  app.use('/orders', ordersRoutes)
}
