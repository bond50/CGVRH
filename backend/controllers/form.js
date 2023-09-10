const sgMail = require("@sendgrid/mail"); // SENDGRID_API_KEY


const {
    SENDGRID_API_KEY,
    MEDSUPEMAIL,
    EMAIL_TO,
    ARNEST_EMAIL,
    EMAIL_FROM,
    ICT_EMAIL
} = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const createEmailHTML = ({subjectLine, message, name, email}) => `
   <!DOCTYPE html>
<html lang="en">
<head>
    <title>${subjectLine}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 700px;
            margin: auto;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
       
        .content {
            padding: 20px;
            background-color: #f9f9f9;
        }
        .footer {
            display: flex;
            justify-content: space-between;
            
        }
        .header, .footer {
    background: #F2CF07; /* Fallback color */
    background: linear-gradient(45deg,#55D284,#F2CF07);
    padding: 20px;
    text-align: center;
    color: white;
}

    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${subjectLine}</h1>
        </div>
        <div class="content">
            <p>${message}</p>
        </div>
        <div class="footer">
            <img src="https://res.cloudinary.com/dwtcilinl/image/upload/v1694280044/vc150_prhdqk.png" alt="Logo" style="width: 100px;">
            <p><em>This email was sent by '${name}' from our website https://vihigahospital.go.ke/contact.</em></p>
        </div>
    </div>
</body>
</html>


`;

exports.contactForm = async (req, res) => {
    try {
        const {email, name, message, subjectLine} = req.body;
        const logoURL = "https://res.cloudinary.com/dwtcilinl/image/upload/v1694280044/vc150_prhdqk.png";

        const emailData = {
            personalizations: [
                {
                    to: [{email: EMAIL_TO}],
                    subject: subjectLine || `Urgent Inquiry: ${name}`
                },{
                    to: [{email: ICT_EMAIL}],
                    subject: subjectLine || `Urgent Inquiry: ${name}`
                },
                {
                    to: [{email: ARNEST_EMAIL}],
                    subject: subjectLine || `Urgent Inquiry: ${name}`
                }, {
                    to: [{email: MEDSUPEMAIL}],
                    subject: subjectLine || `Urgent Inquiry: ${name}`
                }
            ],
            from: `${name} <${EMAIL_FROM}>`,
            replyTo: email,
            text: `New inquiry received. Immediate action is advised.\n\nMessage:\n${message}`,
            html: createEmailHTML({subjectLine, logoURL, message, name, email})
        };

        await sgMail.send(emailData);

        return res.json({
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Email could not be sent',
        });
    }
};


exports.contactBlogAuthorForm = async (req, res) => {
    try {
        const {authorEmail, email, name, message, subjectLine} = req.body;
        const logoURL = "https://res.cloudinary.com/dwtcilinl/image/upload/v1694280044/vc150_prhdqk.png"; // Replace with the actual URL from your database

        const emailData = {

             personalizations: [
                {
                    to: [{email: authorEmail}],
                    subject: subjectLine || `Urgent Inquiry: ${name}`
                },{
                    to: [{email: ICT_EMAIL}],
                    subject: subjectLine || `Urgent Inquiry: ${name}`
                },


            ],
            from: `${name} <${EMAIL_FROM}>`,
            replyTo: email,
            subject: subjectLine || `Message from ${name}`,
            text: `Email received from contact form \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
            html: createEmailHTML({subjectLine, logoURL, message, name, email})
        };

        await sgMail.send(emailData);

        return res.json({
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Email could not be sent',
        });
    }
};

