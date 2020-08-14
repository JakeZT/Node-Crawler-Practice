
const nodemailer = require('nodemailer');
const path=require ('path');
// build Object
let transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  service: 'Gmail', // Use the built-in transport to send mail View the support list：https://nodemailer.com/smtp/well-known/
  port: 465, // SMTP port
  secureConnection: true, // Open secure link：using SSL
  auth: {
    user: 'Your Own Email Address',
    //!!! Set smtp authorization code
    pass: 'Your Own Pass',
  }
});

let mailOptions = {
  from: '"Jake\'s " <Your Own Email Address>', // sender address
  to: 'tzhan139@uottawa.ca', // list of receivers
  subject: 'The application webpage has been updated, please operate in time', // Subject line
  text: 'The application webpage has been updated, please operate in time', // plain text body
  // html: '<b>Hello world?</b>' // html body
  attachments: [
    {   // utf-8 string as an attachment
      //!!! cannot send js files as the security problems
      filename: 'jake.txt',
      // content: 
      path: path.resolve(__dirname, 'jake.txt'),
    },
    {
      filename: 'ZenQcode.png',
      path: path.resolve(__dirname, 'test.png'),
    }
  ]
};


// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent successfully', info.messageId);
});