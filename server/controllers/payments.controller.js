const { Stripe } = require('../config/stripe');

const setup = async (req, res) => {
  const { name, email } = req.body;
  const customer = await Stripe.customers.create({
    email,
    name,
  });
  const setupIntent = await Stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ['card'],
  });

  return res.json({ client_secret: setupIntent.client_secret });
};

module.exports = {
  setup,
};
