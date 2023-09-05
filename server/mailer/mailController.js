  const nodemailer = require("nodemailer");
  const newsletterModel = require("../models/newsletterModel");
  const { v4: uuidv4 } = require("uuid");
  const fs = require("fs");
const {google} = require("googleapis")
  const CLIENT_ID = '214192467211-b25uht5oipaa73laoahfshvvs7kv3rp1.apps.googleusercontent.com';
  const CLIENT_SECRET ='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';
  const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
  const REFRESH_TOKEN = '1//04KltGrgKGJ0iCgYIARAAGAQSNwF-L9IrbGQ3Moy7whRwyevlj3SyKxQ8ITS0aJftf9BBn-6dNLGWyzfEbVVUgc5WErNv2UfxgLA';
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
  oAuth2Client.setCredentials({refresh_token: REFRESH_TOEKEN});
  

  const sendMail = async() => {
    const accessToken = await oAuth2Client.getAccessToken
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noreply.espnews@gmail.com",
        pass: "mafia200190200",
        clientId :CLIENT_ID,
        clientSecret :CLIENT_SECRET,
        refreshToken : REFRESH_TOEKEN,
        accessToken : accessToken
      },
    });
    
  }


  module.exports.sendConfirmEmailfromServer = async (req, res) => {
    const { email } = req.body;

    //Generate confirmationToken =
    const confirmationToken = uuidv4();

    //Save the email and confrimation token in the database
    const newslettermodel = new newsletterModel({ email, confirmationToken });
    await newslettermodel.save();

    //Send confirmation email with the link containing the token
    const confirmationLink = `http://localhost:5000/espcharts/confirm/${confirmationToken}`;
    sendConfirmEmail(email, confirmationLink);

    res.json({ messaage: "Subscription successfull" });
  };


  module.exports.confirmToken = async (req, res) => {
    const { token } = req.params;

    const subscriber = await newsletterModel.findOne({
      confirmationToken: token,
    });

    //Find the subscriber by the confirmation token in the database
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found " });
    }

    subscriber.isSubscribed = true;
    subscriber.confirmationToken = null;
    await subscriber.save();

    return res.redirect("http://localhost:3000");
  };

  module.exports.getAllEmails = async (req, res) => {
    try {
      const subscribers = await newsletterModel.find({});
      res.status(200).json(subscribers);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  module.exports.paginatedEmails = async (req, res) => {
    try {
      const {page,limit} = req.query;
      const skip = (parseInt(page)-1) * parseInt(limit);
      const emails = await newsletterModel.find().skip(skip).limit(limit);
      if (emails.length == 0) {
        return res.status(404).json({ message: "No emails found" });
      }
      res.status(200).json(emails);
    } catch (error) {
      res.status(500).json({ message:error.message });
    }
  }

  module.exports.deleteUnsubscribed = async (req, res) => {
    try {
      const result = await newsletterModel.deleteMany({ isSubscribed: false });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  module.exports.deleteEmail = async(req,res) => {
    try {
      const {id} = req.params;
      const result = await newsletterModel.findByIdAndDelete(id);
      res.status(200).json(result);
    
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } 

  module.exports.sendNewsletter = async (req, res) => {
    const { emails, subject, message } = req.body;


    sendNewsletter(emails, subject,message);

    res.json({ messaage: "Subscription successfull" });
  };


  function sendNewsletter(emails,subject,message){
    const newsletterOptions= {
      from: "espchnews@hotmail.com",
      to: emails,
      subject: subject,
      text: message
    }
    transport.sendMail(newsletterOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    
  }

  function sendConfirmEmail(email, confirmationLink) {
    const mailOptions = {
      from: "espchnews@hotmail.com",
      to: email,
      subject: "Confirm Your ESPCHARTS Newsletter Subscription",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>ESPCharts Newsletter Subscription</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f2f2f2;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: transparent; /* Remove background color */
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                  border-radius: 10px;
              }
      
              .header {
                  text-align: center;
                  margin-bottom: 20px;
                  color: #000000; /* Change text color to black */
                  font-weight: bold; /* Add bold font weight */
              }
      
              .logo {
                  width: 100px;
                  height: auto;
                  display: block;
                  margin: 0 auto; /* Center the logo */
              }
      
              .content {
                  margin-bottom: 20px;
                  color: #000000; /* Change text color to black */
                  text-align: center; /* Center-align content */
              }
      
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 4px;
              }
      
              .footer {
                  text-align: center;
                  color: #000000; /* Change text color to black */
                  font-size: 14px;
              }
      
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>Confirm Your ESPCharts Newsletter Subscription</h2>
              </div> zd 
              <div class="content">
                  <p>Thank you for subscribing to the ESPCharts newsletter!</p>
                  <p>To confirm your subscription, please click the button below:</p>
                  <a class="button" href="${confirmationLink}">Confirm Subscription</a>
              </div>
              <div class="footer">
                  <p>If you have any questions or need assistance, please contact us.</p>
                  <p>Follow us on <a href="http://bit.ly/47praYe">YouTube</a> for the latest updates!</p>
                  <p>If you do not wish to receive newsletters from us, please ignore this email.</p>
              </div>
          </div>
      </body>
      </html>
      
      `,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
