const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
var cors = require("cors");
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/register", (req, res) => {
  const { fullNames, email } = req.body;
  console.log(email);

  const successMessage =
    "Registration successful. Check your email for confirmation.";

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "nodejsservertesting@gmail.com",
      pass: "xghh jgji nhpu soni",
    },
  });

  const confirmationLink = `http://localhost:${port}/confirm?email=${email}`;
  const htmlTemplate = `
  <p>Dear ${fullNames},</p>
  <p>Thank you for joining our team. We are excited to have you on board.</p>
  <p>Please confirm your email by clicking this link: ${confirmationLink}</p>
  <p>Best regards,</p>
  <p>Your Company</p>
`;

  const mailOptions = {
    from: "nodejsservertesting@gmail.com",
    to: email,
    subject: "Welcome to our company!",
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email sending failed:", error);
    } else {
      console.log("Email sent:", info.response);
      res.send(successMessage);
    }
  });
});

app.get("/confirm", (req, res) => {
  const email = req.query.email;

  const confirmedEmails = {};

  if (confirmedEmails[email]) {
    res.send("Email already confirmed.");
  } else {
    confirmedEmails[email] = true;
    res.send("Confirmation successful");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
