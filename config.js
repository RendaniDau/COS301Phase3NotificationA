var getDatabaseAddress = function()
{
	return "mongodb://45.55.154.156:27017/Buzz";
}

var getUserAddress = function()
{
	return "301emailtest@gmail.com";
}

var getUserAddressPassword = function()
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

module.exports.getDatabaseAddress = getDatabaseAddress;
module.exports.getUserAddress = getUserAddress;
module.exports.getUserAddressPassword = getUserAddressPassword;
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
