import express from 'express';
import User from '../models/userModel.js';
import fetch from 'node-fetch';

const router = express();

router.post("/signin", async (req, res) => {
  const { name, email, user_id } = req.body;

  try {
    let user;

    // Attempt to find user by email and name
    if (name && email) {
      user = await User.findOne({ email, username: name }).exec();
    }

    // If user not found, attempt to find by thirdPartyId
    if (!user && user_id) {
      user = await User.findOne({ thirdPartyId: user_id }).exec();
    }

    // If user still not found, create a new user
    if (!user) {
      const stripeCustomerId = null; // Replace with actual stripe customer ID logic if needed

      user = new User({
        username: name || user_id, // Use name if available, otherwise user_id
        email: email || '', // Use email if available, otherwise empty string
        picture: req.body.picture,
        thirdPartyId: user_id,
        stripeCustomerId: stripeCustomerId,
        userCredits: 50
      });

      await user.save();
    }

    // Send the user object in response
    res.status(200).send(user);

  } catch (error) {
    console.error('Error in sign-in:', error);
    res.status(500).send("Error occurred while processing sign-in.");
  }
});

router.post("/makeAdmin", async(req, res) => {
  const userId = req.body.userId;

  try{

    const user = await User.findById(userId);
      
    if (!user) {
      return res.status(404).send('User not found');
    };

    user.isAdmin = true;

    console.log('user', user);
    user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/saveCredits', async (req, res) => {
  const userId = req.body.userId;
  const creditAmount = req.body.creditAmount;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    };

    user.userCredits += creditAmount;
    user.markModified('userCredits');
    await user.save();
    
    res.status(200).send('Credits added');
  } catch (error) {
    res.status(400).send('There was a problem adding credits.');
  }
});

router.post('/subtractCredits', async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findById({_id: userId});
    if (!user) {
      return res.status(404).send('User not found');
    };

    user.userCredits -= 1;

    await user.save();
    
    res.status(200).send('Credits removed');
  } catch (error) {
    res.status(400).send('There was a problem adding credits.');
  }
});

router.post('/hostedImageBase64', async(req, res) => {
  try {
    const imageUrl = req.body.url;
    const imageURLRes = await fetch(imageUrl);
    const imageBuffer = await imageURLRes.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    res.status(200).send(base64Image);

  } catch (error){
    res.status(500).send(error.message);
  }
});

router.get("/userInfo", async(req, res) => {
  const userId = req.body.user_id;
  const user = await User.findById(userId);

  if(user){
    res.status(200).send(user);
  } else {
    res.status(400).send({msg: "User doesn't exist"});
  }
});

export default router;