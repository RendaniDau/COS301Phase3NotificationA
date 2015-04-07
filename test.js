var test = require('C:/Users/Rendani/WebstormProjects/COS301 NotifictionA Draft/NotificationA');
var info = "";
/*
//Dummy values to test functions

//registerNotification Function**********************************
var jsonObj = {
    type : 'follow_Thread',
    threadID: '1',
    studentID: 'u34567890'
}

test.registerNotification(jsonObj);

//deregisterNotification Function*********************************
var jsonOBj = {
    type: "deregister_Thread",
    threadID: '1',
    studentID: 'u34567890'
};

test.deregisterNotification(jsonOBj);

//NotifyNewPost Function******************************************
var jsonObj = {
	threadID : '0'
}
test.notify(jsonObj);

//notifyDeleteThread Function*************************************
var jsonObj = {
	threadID : '0'
}
test.notifyDeletedThread(jsonObj);

//notifyMoveThread Function****************************************
var jsonObj = {
	threadID : '0'
}
test.notifyMovedThread(jsonObj);

//appraisalRegister Function***************************************
var jsonObj = {
	appraisalType : 'Funny',
	studentID : 'u34567890'
}
test.appraisalRegister(jsonObj);

//appraisalDeregister Function**************************************
var jsonObj = {
	appraisalType : 'Funny',
	studentID : 'u34567890'
}
test.appraisalDeregister(jsonObj);

//appraisalNotify Function*******************************************
var jsonObj = {
	appraisalType : 'Funny',
	studentID : u34567890
}
test.appraisalNotify(jsonObj);
*/
var userAddress="";         //Gmail username eg name before @gmail.com
var userAddressPassword="";   //Gmail password
var recipientAddress="";   //email address of recipient
var senderAddress="301emailtest@gmail.com";  //email address of sender
var mailSubject="this is a subject"; //Notification subject
var mailMessage="this is a message";//Message to be sent

test.sendNotification(userAddress, userAddressPassword, senderAddress, recipientAddress, mailSubject, mailMessage);
