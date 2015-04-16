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

//Acquire config file
var config = require('config.js');

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
    var conn = mongodb.createConnection(config.databaseAddress());
    conn.connection.on('error', function (err) {
        // Do something
        console.log("ERROR: Cannot connect - " + err);
        return false;
    });

    //Two tables. For those who follow threads and for those who follow users.
    if(jsonObject.type == "follow_Thread") {

        var notifications_Thread = conn.model(config.followThreadTable(),new Schema({
            notification_Following : Boolean,
            notification_ThreadID : String,
            notification_StudentID : String
        }, { versionKey:false }), config.followThreadTable() );

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
        var notification_Users = conn.model(config.followUserTable(), new Schema({
            notification_Following: Boolean,
            notification_userID: String,
            notification_StudentID: String
        }, {versionKey: false}), config.followUserTable());

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
}

var notifyDeregistration = function(jsonObject)
{
    //Connect to database
    var conn = mongodb.createConnection(config.databaseAddress());
    conn.connection.on('error', function (err) {
        // Do something
        console.log("ERROR: Cannot connect - " + err);
        return false;
    });

    //Two tables. For those who follow threads and for those who follow users.
    if(jsonObject.type == "deregister_Thread") {
        var notifications_Thread = conn.model(config.followThreadTable(), new Schema({
            notification_StudentID: String
        }), config.followThreadTable());
        notifications_Thread.remove({notification_StudentID: jsonObject.studentID,notification_ThreadID : jsonObject.threadID}, function (err) {
            if (err != null)
                console.log(err);
            else
                console.log("user has been removed from table");
        });
    }
    else if(jsonObject.type == "deregister_User"){
        var notifications_Thread = conn.model(config.followUserTable(), new Schema({
            notification_StudentID: String
        }), config.followUserTable());
        notifications_Thread.remove({notification_StudentID: jsonObject.studentID}, function (err) {
            if (err != null)
                console.log(err);
            else
                console.log("user has been removed from table");
        });
    }
    return true;
}

var notifyNewPost = function(jsonObject)
{
    //Connect to database
    var conn = mongodb.createConnection(config.databaseAddress());
    conn.connection.on('error', function (err) {
        // Do something
        console.log("ERROR: Cannot connect - " + err);
        return false;
    });

    //Querying database to find user(s) who need to be sent emails.
    //Assuming threadID of thread which has been updated will be received in jsonObj
    //Query database to find user(s) who are subscribed to the thread and send email to each
    var dataset = conn.model(config.followThreadTable(), new Schema({
        notification_Following : Boolean,
        notification_StudentID : String}), config.followThreadTable());
    dataset.find({'notification_ThreadID' : jsonObject.threadID}, function (err, data) {

        if (err == null)
        {
            info = data;
            console.log(info);
            var email = conn.model(config.userTable(), new Schema({
                std_Name : String,
                std_Surname : String,
                std_Email : String}), config.userTable());

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
    //Connect to database
    var conn = mongodb.createConnection(config.databaseAddress());
    conn.connection.on('error', function (err) {
        // Do something
        console.log("ERROR: Cannot connect - " + err);
        return false;
    });

    //Querying database to find user(s) who need to be sent emails.
    //Assuming threadID of thread which has been updated will be received in jsonObj
    //Query database to find user(s) who are subscribed to the thread and send email to each
    var dataset = conn.model(config.followThreadTable(), new Schema({
        notification_Following : Boolean,
        notification_StudentID : String}), config.followThreadTable());
    dataset.find({'notification_ThreadID' : jsonObject.threadID}, function (err, data) {

        if (err == null)
        {
            info = data;
            console.log(info);
            var email = conn.model(config.userTable(), new Schema({
                std_Name : String,
                std_Surname : String,
                std_Email : String}), config.userTable());

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
    return true;
}

var notifyMovedThread = function(jsonObject)
{
    //Connect to database
    var conn = mongodb.createConnection(config.databaseAddress());
    conn.connection.on('error', function (err) {
        // Do something
        console.log("ERROR: Cannot connect - " + err);
        return false;
    });

    //Querying database to find user(s) who need to be sent emails.
    //Assuming threadID of thread which has been updated will be received in jsonObj
    //Query database to find user(s) who are subscribed to the thread and send email to each
    var dataset = conn.model(config.followThreadTable(), new Schema({
        notification_Following : Boolean,
        notification_StudentID : String}), config.followThreadTable());
    dataset.find({'notification_ThreadID' : jsonObject.threadID}, function (err, data) {

        if (err == null)
        {
            info = data;
            console.log(info);
            var email = conn.model(config.userTable(), new Schema({
                std_Name : String,
                std_Surname : String,
                std_Email : String}), config.userTable());

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
    return true;
}

var appraisalRegister = function(jsonObj) 
{
    //Connect to database
    var conn = mongodb.createConnection(config.databaseAddress());
    conn.connection.on('error', function (err) {
        // Do something
        console.log("ERROR: Cannot connect - " + err);
        return false;
    });

    var appraisals = conn.model(config.appraisalTable(), new Schema({
        notification_StudentID: String,
        notification_AppraisalType: String
    }, {versionKey: false}), config.appraisalTable());

    new appraisals({
        notification_StudentID: jsonObj.studentID,
        notification_AppraisalType: jsonObj.appraisalType
    }).save(function (err, doc) {
            if (err != null)
                console.log(err);
            else
                console.log("User has been registered to appraisal notifications - " + doc);
        });
}

var appraisalDeregister = function(jsonObj)
{
    //Connect to database
    var conn = mongodb.createConnection(config.databaseAddress());
    conn.connection.on('error', function (err) {
        // Do something
        console.log("ERROR: Cannot connect - " + err);
        return false;
    });


    var appraisals = conn.model(config.appraisalTable(), new Schema({
        notification_StudentID : String,
        notification_AppraisalType : String
    }), config.appraisalTable());

    appraisals.remove({notification_StudentID: jsonObject.studentID,notification_AppraisalType : jsonObj.appraisalType}, function (err) {
        if (err != null)
            console.log(err);
        else
            console.log("user has been removed from table");
    });
}
/* User should be sent an email if they are registered for that particular appraisal type
 * If the user is not registered for any Appraisal type, user is sent an email for all appraisal types
*/
var appraisalNotify = function(jsonObj)
{
    //Connect to database
    var conn = mongodb.createConnection(config.databaseAddress());
    conn.connection.on('error', function (err) {
        // Do something
        console.log("ERROR: Cannot connect - " + err);
        return false;
    });

    var appraisals = conn.model(config.appraisalTable(), new Schema({
        notification_StudentID: String,
        notification_AppraisalType: String
    }), config.appraisalTable());

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
        var email = conn.model(config.userTable(), new Schema({
            std_Name: String,
            std_Surname: String,
            std_Email: String
        }), config.userTable());

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
