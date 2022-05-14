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

  if(user.paymentMethodId){
    await Stripe.paymentMethods.detach(user.paymentMethodId);
  }

  user.set({
    paymentMethodId,
  });
  await user.save();
  res.status(200).send();
};

const getPaymentMethod = async (req, res) => {
  console.log("*!*!*!*!*!*! made it to method");
  const {userId} = req.user;
  const user = await User.findByPk(userId);
  const paymentMethods = await Stripe.customers.listPaymentMethods(
    user.stripeCustomerId,
    { type: 'card' }
  );

  console.log(paymentMethods);

  res.status(200).json(paymentMethods.data[0]);
}

module.exports = {
  createSetupIntent,
  storePaymentMethod,
  getPaymentMethod
};
