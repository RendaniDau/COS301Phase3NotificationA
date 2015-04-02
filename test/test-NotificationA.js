//This file makes use of nodeunit for the testing
var NotificationA = require('../NotificationA');
var info1 = {"type": "follow_Thread", "threadID": "1", "studentID": "u34567890"};
var info2 = {"type": "follow_Thread", "threadID": "1", "studentID": "u34567890"};
var info3 = {"threadID": "1", "studentID": "u34567890"};
var info4 = {"studentID": "1", "studentID": "u34567890"};

exports['notifyRegistration'] = function(test)
{
    test.expect(2);
	test.equal(NotificationA.notifyRegistration(info1), true);
    test.equal(NotificationA.notifyRegistration(info2), true);
    test.throws(function () { NotificationA.notifyRegistration(); });
    test.throws(function () { NotificationA.notifyRegistration(null); });
    test.throws(function () { NotificationA.notifyRegistration(true); });
    test.throws(function () { NotificationA.notifyRegistration([]); });
    test.throws(function () { NotificationA.notifyRegistration({}); });
    test.throws(function () { NotificationA.notifyRegistration('asdf'); });
    test.throws(function () { NotificationA.notifyRegistration('123'); });
    test.done();
	test.done();
}

exports['notifyDeregistration'] = function(test)
{
    test.expect(2);
    test.equal(NotificationA.notifyDeregistration(info1), true);
    test.equal(NotificationA.notifyDeregistration(info2), true);
    test.throws(function () { NotificationA.notifyDeregistration(); });
    test.throws(function () { NotificationA.notifyDeregistration(null); });
    test.throws(function () { NotificationA.notifyDeregistration(true); });
    test.throws(function () { NotificationA.notifyDeregistration([]); });
    test.throws(function () { NotificationA.notifyDeregistration({}); });
    test.throws(function () { NotificationA.notifyDeregistration('asdf'); });
    test.throws(function () { NotificationA.notifyDeregistration('123'); });
    test.done();
}

exports['notifyNewPost'] = function(test)
{
    test.expect(2);
    test.equal(NotificationA.notifyNewPost(info3), true);
    test.equal(NotificationA.notifyNewPost(info4), true);
    test.throws(function () { NotificationA.notifyNewPost(); });
    test.throws(function () { NotificationA.notifyNewPost(null); });
    test.throws(function () { NotificationA.notifyNewPost(true); });
    test.throws(function () { NotificationA.notifyNewPost([]); });
    test.throws(function () { NotificationA.notifyNewPost({}); });
    test.throws(function () { NotificationA.notifyNewPost('asdf'); });
    test.throws(function () { NotificationA.notifyNewPost('123'); });
    test.done();
}

exports['notifyDeletedThread'] = function(test)
{
    test.expect(2);
    test.equal(NotificationA.notifyDeletedThread(info3), true);
    test.equal(NotificationA.notifyDeletedThread(info4), true);
    test.throws(function () { NotificationA.notifyDeletedThread(); });
    test.throws(function () { NotificationA.notifyDeletedThread(null); });
    test.throws(function () { NotificationA.notifyDeletedThread(true); });
    test.throws(function () { NotificationA.notifyDeletedThread([]); });
    test.throws(function () { NotificationA.notifyDeletedThread({}); });
    test.throws(function () { NotificationA.notifyDeletedThread('asdf'); });
    test.throws(function () { NotificationA.notifyDeletedThread('123'); });
    test.done();
}

exports['notifyMovedThread'] = function(test)
{
    test.expect(2);
    test.equal(NotificationA.notifyMovedThread(info3), true);
    test.equal(NotificationA.notifyMovedThread(info4), true);
    test.throws(function () { NotificationA.notifyMovedThread(); });
    test.throws(function () { NotificationA.notifyMovedThread(null); });
    test.throws(function () { NotificationA.notifyMovedThread(true); });
    test.throws(function () { NotificationA.notifyMovedThread([]); });
    test.throws(function () { NotificationA.notifyMovedThread({}); });
    test.throws(function () { NotificationA.notifyMovedThread('asdf'); });
    test.throws(function () { NotificationA.notifyMovedThread('123'); });
    test.done();
}

exports['appraisalNotify'] = function(test)
{
    test.expect(2);
    test.equal(NotificationA.appraisalNotify(info3), true);
    test.equal(NotificationA.appraisalNotify(info4), true);
    test.throws(function () { NotificationA.appraisalNotify(); });
    test.throws(function () { NotificationA.appraisalNotify(null); });
    test.throws(function () { NotificationA.appraisalNotify(true); });
    test.throws(function () { NotificationA.appraisalNotify([]); });
    test.throws(function () { NotificationA.appraisalNotify({}); });
    test.throws(function () { NotificationA.appraisalNotify('asdf'); });
    test.throws(function () { NotificationA.appraisalNotify('123'); });
    test.done();
}

exports['sendNotification'] = function(test)
{
    test.expect(2);
    test.equal(NotificationA.sendNotification("", "", "", "", ""), true);
    test.equal(NotificationA.sendNotification("", "", "", "", ""), true);
    test.done();
}