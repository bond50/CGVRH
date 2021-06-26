 const sgMail = require("@sendgrid/mail"); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = (req, res) => {
  const { email, name, message } = req.body;

  const emailData = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_TO,
    subject: `Contact form - ${process.env.APP_NAME}`,
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
            <h4>Email received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
  
            <p><strong>This email may contain sensetive information</strong></p>
            <p>https://vcrh.com</p>
        `,
  };

  sgMail.send(emailData).then((sent) => {
    return res.json({
      success: true,
    });
  });
};

// exports.contactForm = (req, res) => {
//   var nodemailer = require("nodemailer");
//
//   var transporter = nodemailer.createTransport({
//     service: process.env.MAIL_SERVICE,
//     auth: {
//       user: process.env.EMAIL_TO,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
//
//   const { email, name, message } = req.body;
//   // console.log(req.body);
//
//   const mailOptions = {
//     to: process.env.EMAIL_TO,
//     from: email,
//     subject: `HOSPITAL WEBSITE- ${process.env.APP_NAME}`,
//     text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
//     html: `
//             <h4>Email received from contact form:</h4>
//             <p>Sender name: ${name}</p>
//             <p>Sender email: ${email}</p>
//             <p>Sender message: ${message}</p>
//             <hr />
//             <p>This email may contain sensitive information</p>
//             <p>https://vcrh.com</p>
//         `,
//   };
//
//   transporter.sendMail(mailOptions, function (err, info) {
//     if (err) console.log(err);
//     else {
//       return res.json({
//         success: true,
//       });
//     }
//   });
// };


exports.contactBlogAuthorForm = (req, res) => {
  const { authorEmail, email, name, message } = req.body;
  // console.log(req.body);

  let mailList = [authorEmail, process.env.EMAIL_TO];

  const emailData = {

    to: mailList,
     from: process.env.EMAIL_TO,
    subject: `${name} messaged you from ${process.env.APP_NAME}`,
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
            <h4>Message received from:</h4>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://vcrh.com</p>
        `,
  };

  sgMail.send(emailData).then((sent) => {
    return res.json({
      success: true,

    });
  });
};
