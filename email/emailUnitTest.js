/**
 * Unit Testing file for the emailNotification that will test
 * multiple aspects of the emailNotification to make sure that
 * is it reliable and working correctly. 
 * 
 */
var test = require('./emailNotification.js');

var userAddress="301emailtest";         //Gmail username eg name before @gmail.com
var userAddressPassword="new301testemail";   //Gmail password
var recipientAddress="301emailtest@gmail.com";   //email address of recipient
var senderAddress="301emailtest@gmail.com";  //email address of sender

/**
 * Unit Test 1
 * Testing different notification types
 */
console.log("Unit Test 1 execution");
var mailSubject="Notification Test1"; //Notification subject
var mailMessage="Unit Test 1";//Message to be sent
test.sendNotification(userAddress,userAddressPassword,recipientAddress, mailSubject, mailMessage);
/**
 * Email is sent without error
 */

var mailSubject="Notification Test2"; //Notification subject
var mailMessage="Unit Test 1";//Message to be sent
test.sendNotification(userAddress,userAddressPassword,recipientAddress, mailSubject, mailMessage);
/**
 * Email is sent without error
 */

var mailSubject="Notification Test3"; //Notification subject
var mailMessage="Unit Test 1";//Message to be sent
test.sendNotification(userAddress,userAddressPassword,recipientAddress, mailSubject, mailMessage);
/**
 * Email is sent without error
 */
console.log("Unit Test 1 Done");
/**
 * Unit Test 2
 * Testing different message types
 */
console.log("Unit Test 2 execution");
var mailSubject="Unit Test 2"; //Notification subject
var mailMessage="Message Test1";//Message to be sent
test.sendNotification(userAddress,userAddressPassword,recipientAddress, mailSubject, mailMessage);
/**
 * Email is sent without error
 */

var mailSubject="Unit Test 2"; //Notification subject
var mailMessage="Message Test2";//Message to be sent
test.sendNotification(userAddress,userAddressPassword,recipientAddress, mailSubject, mailMessage);
/**
 * Email is sent without error
 */

var mailSubject="Unit Test 2"; //Notification subject
var mailMessage="Message Test3";//Message to be sent
test.sendNotification(userAddress,userAddressPassword,recipientAddress, mailSubject, mailMessage);
/**
 * Email is sent without error
 */
console.log("Unit Test 2 Done");

/**
 * Unit Test 3
 * Testing different users addresses
 */
console.log("Unit Test 3 execution");
//Correct userAddress
var mailSubject="Unit Test 3"; //Notification subject
var mailMessage="Message Correct userAddress";//Message to be sent
test.sendNotification(userAddress,userAddressPassword,recipientAddress, mailSubject, mailMessage);
/**
 * Email is sent without error
 */

//Incorrect userAddress
var mailSubject="Unit Test 3"; //Notification subject
var mailMessage="Message Incorrect userAddress";//Message to be sent
test.sendNotification("userAddress",userAddressPassword,recipientAddress, mailSubject, mailMessage);
/**
 * Throws [Error: Invalid login]
 * This is a correct error
 */

//Incorrect userAddress
var mailSubject="Unit Test 3"; //Notification subject
var mailMessage="Message Incorrect userAddress";//Message to be sent
test.sendNotification("wrongAgain",userAddressPassword,recipientAddress, mailSubject, mailMessage);
console.log("Unit Test 3 Done");
/**
 * Throws [Error: Invalid login]
 * This is a correct error
 */

/**
 * Unit Test 4
 * Testing different recipient addresses
 */

console.log("Unit Test 4 execution");
//Correct userAddress
var mailSubject="Unit Test 4"; //Notification subject
var mailMessage="Message Correct recipientAddress";//Message to be sent
test.sendNotification(userAddress,userAddressPassword,recipientAddress, mailSubject, mailMessage);
/**
 * Email is sent without error
 */

//Incorrect userAddress
var mailSubject="Unit Test 4"; //Notification subject
var mailMessage="Message Incorrect recipientAddress";//Message to be sent
test.sendNotification(userAddress,userAddressPassword,"recipientAddress", mailSubject, mailMessage);
/**
 * Throws [Error: No recipient defined]
 * This is a correct error
 */

//Incorrect userAddress
var mailSubject="Unit Test 4"; //Notification subject
var mailMessage="Message Incorrect recipientAddress";//Message to be sent
test.sendNotification(userAddress,userAddressPassword,"recipientAddress2", mailSubject, mailMessage);
console.log("Unit Test 4 Done");
/**
 * Throws [Error: No recipient defined]
 * This is a correct error
 */