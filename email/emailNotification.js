var nodemailer = require('nodemailer');
var inSender="Buzz Notification System";

//Function to send email list to specified recipient
module.exports = {
    sendNotification: function (inUser, inPassword, inRecipient, inNotificationType, inMessage)
    {

        var smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: inUser,
                pass: inPassword
            }
        });

        smtpTransport.sendMail({
            from: inSender,
            to: inRecipient,
            subject: inNotificationType,
            text: inMessage  //Messages to send
        }, 
        function (error, response)
        {
            if (error)
            {
                console.log(error);
            }
            else
            {
                console.log("Message sent: " + response.message);
            }
        });

    }
};
