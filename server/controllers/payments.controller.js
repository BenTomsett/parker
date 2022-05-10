const { Stripe } = require('../config/stripe');
const db = require('../models');

const { User } = db;

const createSetupIntent = async (req, res) => {
  const email = req.user.sub;
  const user = await User.findOne({
    where: { email },
  });

  if (!user || !user.stripeCustomerId) {
    return res.status(500).send('ERR_INTERNAL_EXCEPTION');
  }

  const setupIntent = await Stripe.setupIntents.create({
    customer: user.stripeCustomerId,
    payment_method_types: ['card'],
  });

  return res.status(201).json({ client_secret: setupIntent.client_secret });
};

const storePaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.body;
  const email = req.user.sub;
  const user = await User.findOne({
    where: { email }
  });
  user.set({
    paymentMethodId,
  });
  await user.save();
  res.status(200).send();
};

module.exports = {
  createSetupIntent,
  storePaymentMethod,
};
