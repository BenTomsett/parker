const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const setup = async (req, res) => {
  const { name, email } = req.body;
  const customer = await stripe.customers.create({
    email,
    name,
  });
  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ['card'],
  });

  return res.json({ client_secret: setupIntent.client_secret });
};

module.exports = {
  setup,
};
