const { Stripe } = require('../config/stripe');
const db = require('../models');

const {User} = db;

const createSetupIntent = async (req, res) => {
  const { stripeCustomerId } = req.body;

  const setupIntent = await Stripe.setupIntents.create({
    customer: stripeCustomerId,
    payment_method_types: ['card'],
  });

  return res.json({ client_secret: setupIntent.client_secret });
};

const storePaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.body;
  const { email } = req.user.sub;

  User.update({
    paymentMethodId
  }, {
    where: { email },
  })
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    if (err.name === 'SequelizeValidationError') {
      res.status(400).send('ERR_DATA_MISSING');
    } else {
      console.error(err);
      res.status(500).send('ERR_INTERNAL_EXCEPTION');
    }
  });
}

module.exports = {
  createSetupIntent,
  storePaymentMethod
};
