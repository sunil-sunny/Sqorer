const mongoose = require("mongoose");
const express = require('@feathersjs/express');
const router = express.Router();
const path = require('path');
const shortid = require('shortid');
const User = require("../../models/user");
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
	key_id: 'rzp_test_FpOlvVi14JShQ6',
	key_secret: 'OqV7dxqWgV7Nfp08glurhrMf'
})

router.post('/verification', (req, res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

router.post('/razorpay/:user', async (req, res) => {
	const payment_capture = 1;
	const amount = 5;
	const currency = 'USD';

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options);
		const user = await User.findById(req.params.user);

		const date  = new Date();

		user.set({isPremium: true, lastDatePaid: date});

		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

router.post("/razorpay/:id", async (req, res) => {
	const payment_capture = 1;
	const amount = batch.standardfee;
	const currency = "INR";
  
	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture,
	};
  
	try {
		const response = await razorpay.orders.create(options);
		console.log(response);
		return res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
			amountPaid: response.amount_paid,
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			success: false,
		});
	}
});

module.exports = router;