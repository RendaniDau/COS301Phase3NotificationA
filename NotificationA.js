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
var subjectNewAppraisal;
var messageNewAppraisal;

//Read config file
var fs = require('fs');
function init(callback) {
    fs.readFile('config', 'UTF-8', function (err, data) {
        if (err != null) {
            console.log(err);
            return;
        }
        else {
            console.log("reading from file");
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
            subjectNewAppraisal = datas[27];
            messageNewAppraisal = datas[29];
        }
        callback();
    });
}

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
    init(function(){
        //Connect to the database
        mongodb.connect(database);
        mongodb.connection.on('error', function (err) {
            // Do something
            console.log("ERROR: Cannot connect - " + err);
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
                    else {
                        console.log("User has been registered to thread notifications - " + doc);
                        return true;
                    }
                    //process.exit();
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
        return true;
        //sendNotification();
    });
}

var notifyDeregistration = function(jsonObject)
{
    init(function(){
        //Connect to database
        mongodb.connect(database);
        mongodb.connection.on('error', function (err) {
            // Do something
            console.log("ERROR: Cannot connect - " + err);
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
    });
    return true;
}

var notifyNewPost = function(jsonObject)
{
    init(function(){
        //Connect to database
        mongodb.connect(database);
        mongodb.connection.on('error', function (err) {
            // Do something
            console.log("ERROR: Cannot connect - " + err);
            return false;
        });

        //Querying database to find user(s) who need to be sent emails.
        //Assuming threadID of thread which has been updated will be received in jsonObj
        //Query database to find user(s) who are subscribed to the thread and send email to each
        var dataset = mongodb.model('Notifications_Thread', new Schema({
            notification_Following : Boolean,
            notification_StudentID : String}), 'Notifications_Thread');
        dataset.find({'notification_ThreadID' : jsonObject.threadID}, function (err, data) {

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
    });
    return true;
}

var notifyDeletedThread = function(jsonObject)
{
    init(function(){
        //Connect to database
        mongodb.connect(database);
        mongodb.connection.on('error', function (err) {
            // Do something
            console.log("ERROR: Cannot connect - " + err);
            return false;
        });

        //Querying database to find user(s) who need to be sent emails.
        //Assuming threadID of thread which has been updated will be received in jsonObj
        //Query database to find user(s) who are subscribed to the thread and send email to each
        var dataset = mongodb.model('Notifications_Thread', new Schema({
            notification_Following : Boolean,
            notification_StudentID : String}), 'Notifications_Thread');
        dataset.find({'notification_ThreadID' : jsonObject.threadID}, function (err, data) {

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
                 if(err == null)
                 {
                 console.log(err);
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
    });
    return true;
}

var notifyMovedThread = function(jsonObject)
{
    init(function(){
        //Connect to database
        mongodb.connect(database);
        mongodb.connection.on('error', function (err) {
            // Do something
            console.log("ERROR: Cannot connect - " + err);
            return false;
        });

        //Querying database to find user(s) who need to be sent emails.
        //Assuming threadID of thread which has been updated will be received in jsonObj
        //Query database to find user(s) who are subscribed to the thread and send email to each
        var dataset = mongodb.model('Notifications_Thread', new Schema({
            notification_Following : Boolean,
            notification_StudentID : String}), 'Notifications_Thread');
        dataset.find({'notification_ThreadID' : jsonObject.threadID}, function (err, data) {

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
                 if(err == null)
                 {
                 console.log(err);
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
    });
    return true;
}

var appraisalRegister = function(jsonObj) {
    init(function () {
        //Connect to database
        mongodb.connect(database);
        mongodb.connection.on('error', function (err) {
            // Do something
            console.log("ERROR: Cannot connect - " + err);
            return false;
        });

        var appraisals = mongodb.model('Notifications_Appraisal', new Schema({
            notification_StudentID: String,
            notification_AppraisalType: String
        }, {versionKey: false}), 'Notifications_Appraisal');

        new appraisals({
            notification_StudentID: jsonObj.studentID,
            notification_AppraisalType: jsonObj.appraisalType
        }).save(function (err, doc) {
                if (err != null)
                    console.log(err);
                else
                    console.log("User has been registered to appraisal notifications - " + doc);
            });
    });
}

var appraisalDeregister = function(jsonObj){
    init(function(){
        //Connect to database
        mongodb.connect(database);
        mongodb.connection.on('error', function (err) {
            // Do something
            console.log("ERROR: Cannot connect - " + err);
            return false;
        });


        var appraisals = mongodb.model('Notifications_Appraisal', new Schema({
            notification_StudentID : String,
            notification_AppraisalType : String
        }), 'Notifications_Appraisal');

        appraisals.remove({notification_StudentID: jsonObject.studentID,notification_AppraisalType : jsonObj.appraisalType}, function (err) {
            if (err != null)
                console.log(err);
            else
                console.log("user has been removed from table");
        });
    });
}
/* User should be sent an email if they are registered for that particular appraisal type
 * If the user is not registered for any Appraisal type, user is sent an email for all appraisal types
*/
var appraisalNotify = function(jsonObj)
{
    init(function() {
        //Connect to database
        mongodb.connect(database);
        mongodb.connection.on('error', function (err) {
            // Do something
            console.log("ERROR: Cannot connect - " + err);
            return false;
        });

        var appraisals = mongodb.model('Notifications_Appraisal', new Schema({
            notification_StudentID: String,
            notification_AppraisalType: String
        }), 'Notifications_Appraisal');

        //Query database to see if user is registered for particular appraisal type
        appraisals.find({notification_StudentID: jsonObj.studentID}, function (err, data) {
            if (err != null) {
                console.log(err);
            }
            else {
                var info = data;
                //If info is NOT NULL, then the user is registered for some appraisal type
                if (info != null) {
                    //Iterate through the all the appraisal types user is registered for
                    //to see if they are registered for the current appraisal type
                    //If they are, send email notification
                    //If not, return
                    for (var i = 0; i < info.length; i++) {
                        if (info[i].notification_AppraisalType == jsonObj.appraisalType) {
                            send();
                            break;
                        }
                    }
                }
                else {
                    //If info IS NULL, then the user is not registered for any appraisal type
                    //By default user should receive notification for ALL appraisal types
                    send();
                }
            }
        })

        //Send the email
        function send() {
            var email = mongodb.model('Students', new Schema({
                std_Name: String,
                std_Surname: String,
                std_Email: String
            }), 'Students');

            email.findOne({std_StudentNumber: jsonObj.studentID}, function (err, data) {
                if (err != null) {
                    console.log(err);
                }
                else {
                    //Assign recipient address here from results of query
                    recipientAddress = data.std_Email;
                    console.log(recipientAddress);
                    //sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, subjectNewAppraisal, messageNewAppraisal);
                }
            });
        }
    });
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
                return false;
            }
            else
            {
                console.log("Message sent: " + response.message);
                return true;
            }
        });
}

module.exports.notifyRegistration = notifyRegistration;
module.exports.notifyDeregistration = notifyDeregistration;
module.exports.notifyNewPost = notifyNewPost;
module.exports.notifyDeletedThread = notifyDeletedThread;
module.exports.notifyMovedThread = notifyMovedThread;
module.exports.appraisalNotify = appraisalNotify;
module.exports.appraisalRegister = appraisalRegister;
module.exports.appraisalDeregister = appraisalDeregister;
module.exports.sendNotification = sendNotification;