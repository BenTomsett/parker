const Stripe = require('stripe')(process.env.STRIPE_API_KEY);

module.exports = {
  Stripe
};
