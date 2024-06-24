import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

const router = express();
dotenv.config();

router.post('/mockupGen', async(req, res) => {

  const nr = req.body.nr;
  const templateWidth = req.body.templateWidth;
  const templateHeight = req.body.templateHeight;
  const image = req.body.image;
  const imagePlacementLayer = req.body.imagePlacementLayerId;
  const imageHeight = req.body.imageHeight;
  const imageWidth = req.body.imageWidth;
  
  const url = `https://api.mediamodifier.com/v2/mockup/render`;

  const requestOptions = {
    method: 'POST',
    headers : {
      api_key: `${process.env.MEDIA_MODIFIER_ACCESS_KEY}`,
    },
    redirect: 'follow'
  };


  // const x = (templateWidth / 2) - (imageWidth / 2);
  // the y would be the coordinate that is the difference
  // between the heights of template and image right?
  // difference divided by 2 to account for even space on either side

  const x = 0;
  // const y = (templateHeight / 2) - (imageWidth / 2);
  const y = 0;


  // This works as it, but not for portrait crop

  const data = {
    "nr": nr,
    "layer_inputs": [
      {
        "id": imagePlacementLayer,
        "data": image,
        "crop": {
          // Need to figure out best way to calculate this
          "x": x,
          "y": y,
          "width": imageWidth,
          "height": imageHeight
        },
        "checked": true
      },
      {
        "id": "ea18e8f6-1e41-4a5e-bbe2-a469e2fea45d",
        "checked": true,
        "color": {
          "red": 254,
          "green": 186,
          "blue": 227
        }
      }
    ]
  };

  axios.post(url, data, requestOptions)
  .then(response => {
    res.send(response?.data);
  })
  .catch(error => {
    console.error('Error: ', error);
    res.status(error.response.status).send(error.response.data);
  });

  // res.send({url: 'https://res.cloudinary.com/djrbfvpit/image/upload/v1689106142/tkgessyma6ok2cdumukd.jpg'});

});

export default router;