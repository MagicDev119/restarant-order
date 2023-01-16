import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51MMp2yF1SAnooAw0NcsrZdKHwFnmqQ7Z3DOQIpVuEwAvirnl6jwqrnt0o6hlRJrh2pJB3zj78qb3vNmJqIH67BdM00gUIjUcdf", {
  apiVersion: '2022-11-15'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const params: Stripe.PaymentIntentCreateParams = {
      metadata: {integration_check: 'accept_a_payment'},
      amount: JSON.parse(req.body).amount * 100,
      currency: 'usd',
    };
    const payment_intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
      params
    );
    res.status(200).json(payment_intent);
  } catch (e) {
    res.status(500);
  }
};
