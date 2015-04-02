//For database access
var mongodb = require('mongoose');
var Schema = mongodb.Schema;
var database;

//For Email functionality
var nodemailer = require('nodemailer');

var userAddress;//="301emailtest@gmail.com";         //Gmail username eg name before @gmail.com
var userAddressPassword;//="301testemail";   //Gmail password
var recipientAddress;//="gontsedau@gmail.com";   //email address of recipient
var senderAddress;//="301emailtest@gmail.com";  //email address of sender
var mailSubject;//="this is a subject"; //Notification subject
var mailMessage;//="this is a message";//Message to be sent

var subjectRegistration;
var messageRegistration;
var subjectDeregistration;
var messageDeregistration;
var subjectNewPost;
var messageNewPost;
var subjectDeletedThread;
var messageDeletedThread;
var subjectMovedThread;
var messageMovedThread;

//Read config file
var fs = require('fs');
fs.readFile('config','UTF-8', function(err, data)
{
    if(err != null)
    {
        console.log(err);
        return;
    }
    else
    {
        var datas = data.split('\n');
        database = datas[1];
        userAddress = datas[3];
        userAddressPassword = datas[5];
        senderAddress = datas[3];

        subjectRegistration = datas[7];
        messageRegistration = datas[9];
        subjectDeregistration = datas[11];
        messageDeregistration = datas[13];
        subjectNewPost = datas[15];
        messageNewPost = datas[17];
        subjectDeletedThread = datas[19];
        messageDeletedThread = datas[21];
        subjectMovedThread = datas[23];
        messageMovedThread = datas[25];
    }
});

/*
 *The parameter will contain the relavent information such as
 *Type: 'Register', 'Deregister', 'Post', 'Delete', 'Move' 'Appraisal'
 *StudentID: The student ID of the user that generated this request.
 *ThreadID: The ID of the thread that was acted upon.
 * AND
 * StudentID of the user followed.
*/


var notifyRegistration = function(jsonObject)
{
    //Connect to the database
    mongodb.connect(database);
    mongodb.connection.on('error', function (err) {
        // Do something
        console.log("ERROR: Cannot connect");
        return false;
    });

    //Two tables. For those who follow threads and for those who follow users.
    if(jsonObject.type == "follow_Thread") {

        var notifications_Thread = mongodb.model('Notifications_Thread',new Schema({
            notification_Following : Boolean,
            notification_ThreadID : String,
            notification_StudentID : String
        }, { versionKey:false }), 'Notifications_Thread' );

        new notifications_Thread({
            notification_Following : true,
            notification_ThreadID : jsonObject.threadID,
            notification_StudentID : jsonObject.studentID
        }).save(function(err, doc){
                if(err != null)
                    console.log(err);
                else
                    console.log("User has been registered to thread notifications - " + doc);
            });
    }
    else if(jsonObject.type == "follow_User") {
        var notification_Users = mongodb.model('Notification_Users', new Schema({
            notification_Following: Boolean,
            notification_userID: String,
            notification_StudentID: String
        }, {versionKey: false}), 'Notification_Users');

        new notification_Users({
            notification_Following: true,
            notification_userID: jsonObject.userID,
            notification_StudentID: jsonObject.studentID
        }).save(function (err, doc) {
                if (err != null)
                    console.log(err);
                else
                    console.log("User has been registered to user notifications - " + doc);
            });
    }

    //sendNotification();

    return true;
}

var notifyDeregistration = function(jsonObject)
{
    //Connect to database
    mongodb.connect(database);
    mongodb.connection.on('error', function (err) {
        // Do something
        console.log("error: cant connect");
        return false;
    });

    //Two tables. For those who follow threads and for those who follow users.
    if(jsonObject.type == "deregister_Thread") {
        var notifications_Thread = mongodb.model('Notifications_Thread', new Schema({
            notification_StudentID: String
        }), 'Notifications_Thread');
        notifications_Thread.remove({notification_StudentID: jsonObject.studentID,notification_ThreadID : jsonObject.threadID}, function (err) {
            if (err != null)
                console.log(err);
            else
                console.log("user has been removed from table");
        });
    }
    else if(jsonObject.type == "deregister_User"){
        var notifications_Thread = mongodb.model('Notification_Users', new Schema({
            notification_StudentID: String
        }), 'Notification_Users');
        notifications_Thread.remove({notification_StudentID: jsonObject.studentID}, function (err) {
            if (err != null)
                console.log(err);
            else
                console.log("user has been removed from table");
        });
    }

    //sendNotification();

    return true;
}

var notifyNewPost = function(jsonObject)
{
    //Connect to the database
    mongodb.connect(database);
    mongodb.connection.on('error', function (err) {
        console.log("error: cant connect");
        return;
    });

    //Querying database to find user(s) who need to be sent emails.
    //Assuming threadID of thread which has been updated will be received in jsonObj
    //Query database to find user(s) who are subscribed to the thread and send email to each
    var questions = mongodb.model('Notifications_Thread', new Schema({
        notification_Following : Boolean,
        notification_StudentID : String}), 'Notifications_Thread');
    questions.find({'notification_ThreadID' : '0'}, function (err, data) {

        if (err == null)
        {
            info = data;
            console.log(info);
            var email = mongodb.model('Students', new Schema({
                std_Name : String,
                std_Surname : String,
                std_Email : String}), 'Students');

            //Iterate through the results returned to get the student's details (Email, Name, Surname)
            //And send the notification email
            /*for(var i = 0; i < info.length; i++)
            {
                email.findOne({std_StudentNumber : info[i].notification_StudentID}, function(err, data){
                    if(err != null)
                    {
                        console.log(data);
                    }
                    else
                    {
                        //Assign recipient address here from results of query
                        recipientAddress = data.std_Email;
                        sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
                    }
                });
            }*/
        }
        else
        {
            console.log("Not found in database.")
            return false;
        }
    });
    return true;
}

var notifyDeletedThread = function(jsonObject)
{
    //Connect to the database
    mongodb.connect(database);
    mongodb.connection.on('error', function (err) {
        console.log("error: cant connect");
        return;
    });

    //Querying database to find user(s) who need to be sent emails.
    //Assuming threadID of thread which has been updated will be received in jsonObj
    //Query database to find user(s) who are subscribed to the thread and send email to each
    var questions = mongodb.model('Notifications_Thread', new Schema({
        notification_Following : Boolean,
        notification_StudentID : String}), 'Notifications_Thread');
    questions.find({'notification_ThreadID' : '0'}, function (err, data) {

        if (err == null)
        {
            info = data;
            console.log(info);
            var email = mongodb.model('Students', new Schema({
                std_Name : String,
                std_Surname : String,
                std_Email : String}), 'Students');

            //Iterate through the results returned to get the student's details (Email, Name, Surname)
            //And send the notification email
            /*for(var i = 0; i < info.length; i++)
             {
             email.findOne({std_StudentNumber : info[i].notification_StudentID}, function(err, data){
             if(err != null)
             {
             console.log(data);
             }
             else
             {
             //Assign recipient address here from results of query
             recipientAddress = data.std_Email;
             sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
             }
             });
             }*/
        }
        else
        {
            console.log("Not found in database.")
            return false;
        }
    });
    return true;
}

var notifyMovedThread = function(jsonObject)
{
    //Connect to the database
    mongodb.connect(database);
    mongodb.connection.on('error', function (err) {
        console.log("error: cant connect");
        return;
    });

    //Querying database to find user(s) who need to be sent emails.
    //Assuming threadID of thread which has been updated will be received in jsonObj
    //Query database to find user(s) who are subscribed to the thread and send email to each
    var questions = mongodb.model('Notifications_Thread', new Schema({
        notification_Following : Boolean,
        notification_StudentID : String}), 'Notifications_Thread');
    questions.find({'notification_ThreadID' : '0'}, function (err, data) {

        if (err == null)
        {
            info = data;
            console.log(info);
            var email = mongodb.model('Students', new Schema({
                std_Name : String,
                std_Surname : String,
                std_Email : String}), 'Students');

            //Iterate through the results returned to get the student's details (Email, Name, Surname)
            //And send the notification email
            /*for(var i = 0; i < info.length; i++)
             {
             email.findOne({std_StudentNumber : info[i].notification_StudentID}, function(err, data){
             if(err != null)
             {
             console.log(data);
             }
             else
             {
             //Assign recipient address here from results of query
             recipientAddress = data.std_Email;
             sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
             }
             });
             }*/
        }
        else
        {
            console.log("Not found in database.")
            return false;
        }
    });
    return true;
}

var appraisalNotify = function(jsonObject)
{
    //sendNotification();
    return true;
}

//Function to send email list to specified recipient
var sendNotification = function(inUser, inPassword, inRecipient, inNotificationType, inMessage)
{
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: inUser,
            pass: inPassword
        }
    });

    smtpTransport.sendMail({
            from: inUser,
            to: inRecipient,
            subject: inNotificationType,
            text: inMessage,  //Messages to send
            html:'<head><title>'+inNotificationType+'</title></head><body>Good day '+inRecipient+',<br><br>'+inMessage+'<br><br>Thank you,<br><br>The Buzz System</body>'

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

module.exports.notifyRegistration = notifyRegistration;
module.exports.notifyDeregistration = notifyDeregistration;
module.exports.notifyNewPost = notifyNewPost;
module.exports.notifyDeletedThread = notifyDeletedThread;
module.exports.notifyMovedThread = notifyMovedThread;
module.exports.appraisalNotify = appraisalNotify;
module.exports.sendNotification = sendNotification;