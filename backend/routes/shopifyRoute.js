import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

const router = express();
dotenv.config();

router.get('/auth', (req, res) => {
  const shop = req.query.shop;
  const state = Math.random().toString(36).substring(2);
  const redirectUri = `${process.env.HOST}`;
  const scope = process.env.SHOPIFY_SCOPES;
  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${scope}&state=${state}&redirect_uri=${redirectUri}`;

  res.redirect(authUrl);
});

router.post('/auth/callback', async(req, res) => {

  console.log('req', req);
  const { shop, code, state } = req.query;
    const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
    const accessTokenPayload = {
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    };

    try {
      const response = await axios.post(accessTokenRequestUrl, accessTokenPayload);
      const accessToken = response.data.access_token;
      console.log('accessToken', accessToken);
      // Store the access token securely and associate it with the user's shop
      res.redirect(`${process.env.HOST}/your-products`); // Redirect to the app home page or dashboard
    } catch (error) {
      res.status(500).send("Error in OAuth callback");
    }
});

export default router;