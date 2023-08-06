const nodemailer = require("nodemailer");
const newsletterModel = require("../models/newsletterModel");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const transport = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "espcharts@outlook.com",
    pass: "mafia200190200",
  },
});

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


module.exports.sendNewsletter = asyn (req,res) => {
  const { email } = req.params;
  const {htmlText} = req.body;

   nm
}

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

function sendConfirmEmail(email, confirmationLink) {
  const mailOptions = {
    from: "espcharts@outlook.com",
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
            background-color: #8a55d7; /* Purple color */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
            color: #ffffff; /* White color */
        }
        
        .logo {
            width: 100px;
            height: auto;
        }
        
        .content {
            margin-bottom: 20px;
            color: #ffffff; /* White color */
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
            color: #ffffff; /* White color */
            font-size: 14px;
        }
        
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>Confirm Your ESPCharts Newsletter Subscription</h2>
              </div>
                  <p>Thank you for subscribing to the ESPCharts newsletter!</p>
                  <p>To confirm your subscription, please click the button below:</p>
                  <a class="button" href="${confirmationLink}">Confirm Subscription</a>
              </div>
              <div class="footer">
                  <p>If you have any questions or need assistance, please contact us.</p>
                  <p>Follow us on <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">YouTube</a> for the latest updates!</p>
                  <p>If you no do not wish to get newsletters from us please ignore this e-mail</p>
              </div>
          </div>
          </div >
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
