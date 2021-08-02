import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.SRIPE_API_KEY);
  }

  return stripePromise;
};

export default getStripe;
