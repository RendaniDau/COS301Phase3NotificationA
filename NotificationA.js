/**
 * Created by Rendani on 2015-03-20.
 */
 
//For database access
var mongodb = require('mongoose');
var Schema = mongodb.Schema;

//For Email functionality
var nodemailer = require('nodemailer');
var userAddress="";         //Gmail username eg name before @gmail.com
var userAddressPassword="";   //Gmail password
var recipientAddress="";   //email address of recipient
var senderAddress="";  //email address of sender
var mailSubject=""; //Notification subject
var mailMessage="";//Message to be sent

/*
*The parameter will contain the relavent information such as
*Type: 'Register', 'Deregister', 'Post', 'Delete'.
*StudentID: The student ID of the user that generated this request.
*ThreadID: The ID of the thread that was acted upon.
* OR
* StudentID of the user to follow.
*/
var notify = function(jsonObject)
{
    //Connect to the database
    mongodb.connect('mongodb://45.55.154.156:27017/Buzz');
    mongodb.connection.on('error', function (err) {
        // Do something
        console.log("error: cant connect");
        return;
    });

    //Querying database to find user(s) who need to be sent emails.
    //Testing data retrieval from random schema called Students from database Buzz.
    var questions = mongodb.model('Students', new Schema(), 'Students');
    questions.find({}, function (err, data) {
        //data.length;
        if (err == null) {
            info = data;
            console.log(info);
            sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
        }
        else {
            console.log("Not found in database.")
        }
    });
}

//Function to send email list to specified recipient
function sendNotification(inUser, inPassword, inSender, inRecipient, inNotificationType, inMessage) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: inUser,
            pass: inPassword
        }
    });

    transporter.sendMail({
        from: inSender,
        to: inRecipient,
        subject: inNotificationType,
        text: inMessage  //Messages to send
    });
    console.log('Message sent.');
}

module.exports.notify = notify;
