var test = require('C:/Users/Rendani/WebstormProjects/COS301 NotifictionA Draft/NotificationA');
var info = "";
/*
//Dummy values to test function
var jsonObj = {
    type : 'follow_Thread',
    threadID: '1',
    studentID: 'u34567890'
}

test.registerNotification(jsonObj);


var jsonOBj = {
    type: "deregister_Thread",
    threadID: '1',
    studentID: 'u34567890'
};

test.deregisterNotification(jsonOBj);


test.notify(info);

*/
var userAddress="";         //Gmail username eg name before @gmail.com
var userAddressPassword="";   //Gmail password
var recipientAddress="";   //email address of recipient
var senderAddress="301emailtest@gmail.com";  //email address of sender
var mailSubject="this is a subject"; //Notification subject
var mailMessage="this is a message";//Message to be sent

test.sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
