import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const stripe_secret_key = process.env.STRIPE_SECRET_KEY;

    const params: Stripe.PaymentIntentCreateParams = {
      payment_method_types: ['card'],
      amount: JSON.parse(req.body).amount,
      currency: 'usd',
    };
    const payment_intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
      params
    );
    
    
    // if (records.length) {
    //   res.status(200).json(records);
    //   res.end();
    // } else {
    //   res.status(404);
    //   res.end();
    // }
  } catch {
    res.status(500);
  }
};
