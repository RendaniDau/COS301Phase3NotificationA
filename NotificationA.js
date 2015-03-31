//For database access
var mongodb = require('mongoose');
var Schema = mongodb.Schema;

//For Email functionality
var nodemailer = require('nodemailer');

var userAddress="301emailtest@gmail.com";         //Gmail username eg name before @gmail.com
var userAddressPassword="301testemail";   //Gmail password
var recipientAddress="gontsedau@gmail.com";   //email address of recipient
var senderAddress="301emailtest@gmail.com";  //email address of sender
var mailSubject="this is a subject"; //Notification subject
var mailMessage="this is a message";//Message to be sent

/*
 *The parameter will contain the relavent information such as
 *Type: 'Register', 'Deregister', 'Post', 'Delete', 'Move' 'Appraisal'
 *StudentID: The student ID of the user that generated this request.
 *ThreadID: The ID of the thread that was acted upon.
 * AND
 * StudentID of the user followed.
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
    //Assuming threadID of thread which has been updated will be received in jsonObj
    //Query database to find user(s) who are subscribed to the thread and send email to each

    var questions = mongodb.model('Notifications_Thread', new Schema({notification_Following : Boolean, notification_StudentID : String}), 'Notifications_Thread');
    questions.find({'notification_ThreadID' : '0'}, function (err, data) {

        if (err == null) {
            info = data;
            console.log(info);
            var email = mongodb.model('Students', new Schema({std_Name : String, std_Surname : String, std_Email : String}), 'Students');




            //Iterate through the results returned to get the student's details (Email, Name, Surname)
            //And send the notification email
           // for(var i = 0; i < info.length; i++){
                //email.findOne({std_StudentNumber : info[i].notification_StudentID}, function(err, data){
                  //  console.log(data);

                    //Assign recipient address here from results of query
                    //recipientAddress = data.std_Email;
                   // sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
                //});
            //}
        }
        else {
            console.log("Not found in database.")
        }
    });
}

/* Function will check which type of notification the user is registering for: User, or Thread
 * userID or ThreadID user is trying to follow will be retrieved from JSON object
 * user's id will be retrieved from JSON object
 * These details will then be added to database
 */
var registerNotification = function(jsonObject){
    var ObjectID = Schema.ObjectId;

    //Connect to the database
    mongodb.connect('mongodb://45.55.154.156:27017/Buzz');
    mongodb.connection.on('error', function (err) {
        // Do something
        console.log("error: cant connect");
        return;
    });




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
                    console.log("User has been registered to thread notifications" + doc);
            });
    }
    else if(jsonObject.type == "follow_User")
    {
        var notification_Users = mongodb.model('Notification_Users', new Schema({
            notification_Following : Boolean,
            notification_userID : String,
            notification_StudentID : String
        }, { versionKey:false }), 'Notification_Users');

        new notification_Users({
            notification_Following : true,
            notification_userID : jsonObject.userID,
            notification_StudentID : jsonObject.studentID
        }).save(function(err, doc){
                if(err != null)
                    console.log(err);
                else
                    console.log("User has been registered to user notifications" + doc);
            });
    }
}

var deregisterNotification = function(jsonObject){
    //Connect to the database
    mongodb.connect('mongodb://45.55.154.156:27017/Buzz');
    mongodb.connection.on('error', function (err) {
        // Do something
        console.log("error: cant connect");
        return;
    });


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
}


var appraisalNotify = function(jsonObject){

}



//Function to send email list to specified recipient
var sendNotification = function(inUser, inPassword, inSender, inRecipient, inNotificationType, inMessage) {

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
    }, function(error){
        if(error == null)
            console.log('Message sent.');
        else
            console.log(error);
    });
}

module.exports.notify = notify;
module.exports.appraisalNotify = appraisalNotify;
module.exports.registerNotification = registerNotification;
module.exports.deregisterNotification = deregisterNotification;
module.exports.sendNotification = sendNotification;