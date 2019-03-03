const authRoutes = require('../routes/auth')
const destinationRoutes = require('../routes/destination')
const statsRoutes = require('../routes/stats')
const ordersRoutes = require('../routes/order')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/destination', destinationRoutes)
  app.use('/stats', statsRoutes)
  app.use('/orders', ordersRoutes)
}
