var databaseAddress = function()
{
	return "mongodb://45.55.154.156:27017/Buzz";
}

var userAddress = function()
{
	return "301emailtest@gmail.com";
}

var userAddressPassword = function()
{
	return "new301testemail";
}

var subjectRegistration = function()
{
	return "Successful registration.";
}

var messageRegistration = function()
{
	return "You have been registered to a thread.";
}

var subjectDeregistration = function()
{
	return "Successful registration.";
}

var messageDeregistration = function()
{
	return "You have been deregistered from a thread.";
}

var subjectNewPost = function()
{
	return "A new post.";
}

var messageNewPost = function()
{
	return "A new post has happened.";
}

var subjectDeletedThread = function()
{
	return "Thread deleted.";
}

var messageDeletedThread = function()
{
	return "The thread you are following has been deleted.";
}

var subjectMovedThread = function()
{
	return "";
}

var messageMovedThread = function()
{
	return "This thread has been moved.";
}

var subjectNewAppraisal = function()
{
	return "A New Appraisal.";
}

var messageNewAppraisal = function()
{
	return "You have a new appraisal.";
}

var followThreadTable = function()
{
	return "Notifications_Thread";
}

var followUserTable = function()
{
	return "Notification_Users";
}

var appraisalTable = function()
{
	return "Notifications_Appraisal";
}

var usersTable = function()
{
	return "Students";
}

module.exports.databaseAddress = databaseAddress;
module.exports.userAddress = userAddress;
module.exports.userAddressPassword = userAddressPassword;
module.exports.subjectRegistration = subjectRegistration;
module.exports.messageRegistration = messageRegistration;
module.exports.subjectDeregistration = subjectDeregistration;
module.exports.messageDeregistration = messageDeregistration;
module.exports.subjectNewPost = subjectNewPost;
module.exports.messageNewPost = messageNewPost;
module.exports.subjectDeletedThread = subjectDeletedThread;
module.exports.messageDeletedThread = messageDeletedThread;
module.exports.subjectMovedThread = subjectMovedThread;
module.exports.messageMovedThread = messageMovedThread;
module.exports.subjectNewAppraisal = subjectNewAppraisal;
module.exports.messageNewAppraisal = messageNewAppraisal;
module.exports.followThreadTable = followThreadTable;
module.exports.followUserTable = followUserTable;
module.exports.appraisalTable = appraisalTable;
module.exports.usersTable = usersTable;
