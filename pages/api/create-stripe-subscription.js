import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  try {
    const { customerId, paymentMethodId, priceId } = req.body

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    })

    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    })

    res.status(201).json(subscription)
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    })
  }
}
