const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 499,
      currency: 'usd',
      description: '$4.99 for 5 emails',
      source: req.body.id,
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};