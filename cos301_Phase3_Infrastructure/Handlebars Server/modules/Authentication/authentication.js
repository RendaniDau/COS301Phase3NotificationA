/**
 * Created by Jaco-Louis on 2015/03/20.
 */

/*
 This module will be used to add, remove, update, access authorization restrictions as well as verify authorization
 */
//var csds = require('./csds');
//var connect = require('./connect');
var Authorization;

Authorization = function () {//Authorization class

};
Authorization.prototype.updateAuthorizationRestriction=function(UpdateAuthReq)//The  updateAuthorizationRestriction function
{
    var Db = require('mongodb').Db,
        MongoClient = require('mongodb').MongoClient,
        Server = require('mongodb').Server,
        assert = require('assert');


    var db = new Db('authorization', new Server('localhost', 27017));
// Establish connection to db
    db.open(function(err, db) {
        // Get a collection
        db.collection('Authentication', function (err, collection) {

            // Update the document with an atomic operator
            collection.update({_id: UpdateAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier().getServiceIdentifierMethodName()}, {$set: {Ranking: UpdateAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionMinimumStatusPoints()}});

            // Wait for a second then fetch the document
            setTimeout(function () {

                // Fetch the document that we modified
                collection.findOne({_id: (UpdateAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier().getServiceIdentifierMethodName())}, function (err, item) {
                    assert.equal(null, err);
                    assert.equal(UpdateAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier().getServiceIdentifierMethodName(), item._id);
                    assert.equal(UpdateAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionMinimumStatusPoints(), item.Ranking);
                    db.close();
                });
            }, 1000);
        })
    });
};



var mongoose = require('mongoose');
mongoose.connect('mongodb://45.55.154.156:27017/Buzz');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Connection to database was successful.");
});

//===================Simple testing using a schema example
// Create schema
var authorizationSchema = mongoose.Schema({
    name: String
})
// Add method to schema
authorizationSchema.methods.speak = function () {
    var moduleName = this.name
        ? "Module name is " + this.name
        : "I don't have a name"
    // console.log(moduleName);
}

// Compile schema into a model (class that constructs documents)
var Auth = mongoose.model('Authorization', spacesSchema)
// create object of type Space
var authTest = new Auth({ name: 'test11' });
//authTest.speak();

// Save authTest to the database each time server is started
authTest.save(function (err, authTest) {
    if (err) return console.error(err);
    //cosTest.speak();
});

// Display all in Spaces model
Auth.find(function (err, auth) {
    if (err) return console.error(err);
    //console.log(spaces);
})






///////////////////////////////Update Authorization restriction request class and functions///////////////////////////////////////////////////
var UpdateAuthorizationRestrictionRequest;
UpdateAuthorizationRestrictionRequest=function(userID,AuthorizationRestriction)
{
    var userID;
    this.userID = userID;
    var AuthorizationRestriction;
    this.AuthorizationRestriction=AuthorizationRestriction;
};
UpdateAuthorizationRestrictionRequest.prototype.getUserID=function()
{
    return this.userID;
};
UpdateAuthorizationRestrictionRequest.prototype.setUserID=function(userID)
{
    this.userID=userID;
};
UpdateAuthorizationRestrictionRequest.prototype.setAuthorizationRestriction=function(AuthorizationRestriction)
{
    this.AuthorizationRestriction=AuthorizationRestriction;
};
UpdateAuthorizationRestrictionRequest.prototype.getAuthorizationRestriction=function()
{
    return this.AuthorizationRestriction;
};
//////////////////////////////////End of Update Authorization restriction request class and functions///////////////////////////////////////////////////////
///////////////////////////////Update Authorization restriction result class and functions///////////////////////////////////////////////////
var UpdateAuthorizationRestrictionsResult=function()
{
    var  AuthorizationRestriction;
};
///////////////////////////////End of Update Authorization restriction request class and functions///////////////////////////////////////////////////


///////////////////////////////Update Authorization restriction request class and functions///////////////////////////////////////////////////
var UpdateAuthorizationRestrictionRequest;
UpdateAuthorizationRestrictionRequest=function(userID,AuthorizationRestriction)
{
    var userID;
    this.userID = userID;
    var AuthorizationRestriction;
    this.AuthorizationRestriction=AuthorizationRestriction;
};
UpdateAuthorizationRestrictionRequest.prototype.getUserID=function()
{
    return this.userID;
};
UpdateAuthorizationRestrictionRequest.prototype.setUserID=function(userID)
{
    this.userID=userID;
};
UpdateAuthorizationRestrictionRequest.prototype.setAuthorizationRestriction=function(AuthorizationRestriction)
{
    this.AuthorizationRestriction=AuthorizationRestriction;
};
UpdateAuthorizationRestrictionRequest.prototype.getAuthorizationRestriction=function()
{
    return this.AuthorizationRestriction;
};
//////////////////////////////////End of Update Authorization restriction request class and functions///////////////////////////////////////////////////////
///////////////////////////////Update Authorization restriction result class and functions///////////////////////////////////////////////////
var UpdateAuthorizationRestrictionsResult=function()
{
    var  AuthorizationRestriction;
};
///////////////////////////////End of Update Authorization restriction request class and functions///////////////////////////////////////////////////





///////////////////////////////RemoveAuthorizationRestrictionResult class and functions///////////////////////////////////////////////////
var RemoveAuthorizationRestrictionsResult=function()
{
    var  AuthorizationRestriction;
};
///////////////////////////////End of RemoveAuthorizationRestrictionResult///////////////////////////////////////////////////


Authorization.prototype.removeAuthorizationRestriction=function(RemoveAuthorizationReq)//The  removeAuthorizationRestriction function
{
    //var isAuthRequest=new IsAuthorisedRequest();
    var isAuthResult=new IsAuthorisedResult();
    if(isAuthResult(RemoveAuthorizationReq)){
        RemoveAuthorizationReq.getAuthorizationRestriction().getServiceRestriction().setServiceRestrictionStatusPoints(0);
        var uRestriction = new Authorization();
        uRestriction.updateAuthorizationRestriction(RemoveAuthorizationReq);
    }
    return new RemoveAuthorizationRestrictionsResult();
    // the spec says that there is no need to return anything for remove
};
///////////////////////////////RemoveAuthorizationRestrictionResult class and functions//////////////////////////
var RemoveAuthorizationRestrictionsResult;
RemoveAuthorizationRestrictionsResult = function () {
    var AuthorizationRestriction;
};
//////////////////////End of RemoveAuthorizationRestrictionResult class and functions//////////////////////////

//////////////////////////////RemoveAuthorizationRestrictionRequest class and functions//////////////////////////////////////////

var RemoveAuthorizationRestrictionRequest;
RemoveAuthorizationRestrictionRequest=function(userID,_AuthorizationRestriction)
{
    var userID;
    this.userID = userID;
    var AuthorizationRestriction;
    this.AuthorizationRestriction=_AuthorizationRestriction;
};
RemoveAuthorizationRestrictionRequest.prototype.getUserID=function()
{
    return this.userID;
};
RemoveAuthorizationRestrictionRequest.prototype.setUserID=function(_userID)
{
    this.userID=_userID;
};
RemoveAuthorizationRestrictionRequest.prototype.setAuthorizationRestriction=function(_AuthorizationRestriction)
{
    this.AuthorizationRestriction=_AuthorizationRestriction;
};
RemoveAuthorizationRestrictionRequest.prototype.getAuthorizationRestriction=function()
{
    return this.AuthorizationRestriction;
};

///////////////////////////////End of RemoveAuthorizationRestriction request class and functions///////////////////////////////////////////////

//////////////////////////////AddAuthorizationRestrictionRequest class and functions////////////////////////////////////

var AddAuthorizationRestrictionRequest;
AddAuthorizationRestrictionRequest = function()
{
    var AuthorizationRestriction;
    this.AuthorizationRestriction=_AuthorizationRestriction;
}

AddAuthorizationRestrictionRequest.prototype.setAuthorizationRestriction=function(_AuthorizationRestriction)
{
    this.AuthorizationRestriction=_AuthorizationRestriction;
};
AddAuthorizationRestrictionRequest.prototype.getAuthorizationRestriction=function()
{
    return this.AuthorizationRestriction;
};
//////////////////////////////End of AddAuthorizationRestrictionRequest class and functions/////////////////////////////
//////////////////////////////AddAuthorizationRestriction class and functions///////////////////////////////////////////
Authorization.prototype.addAuthorizationRestriction=function(AddAuthorizationReq)
{
    var isAuthResult = new IsAuthorisedResult();
    if(isAuthResult(AddAuthorizationReq)){
        var auth = new Authorization;
        auth.updateAuthorizationRestriction(AddAuthorizationReq);
    }
    return new AddAuthorizationRestrictionsResult();
};
///////////////////////////////End of AddAuthorizationRestriction class and functions///////////////////////////////////
///////////////////////////////AddAuthorizationRestrictionResult class and functions////////////////////////////////////
var AddAuthorizationRestrictionsResult;
AddAuthorizationRestrictionsResult = function ()
{
    var AuthorizationRestriction;
};
//////////////////////End of AddAuthorizationRestrictionResult class and functions//////////////////////////

///////////////////////////////Authorization restriction class and functions///////////////////////////////////////////////////
var AuthorizationRestriction=function(serviceRestriction)//used by everyone
{
    var ServiceRestriction;
    this.ServiceRestriction=serviceRestriction;
};
AuthorizationRestriction.prototype.setServiceRestriction=function(ServiceRestriction)

{
    this.ServiceRestriction=ServiceRestriction;
};
AuthorizationRestriction.prototype.getServiceRestriction=function()
{
    return this.ServiceRestriction;
};

{
    this.ServiceRestriction=ServiceRestriction;
};
AuthorizationRestriction.prototype.getServiceRestriction=function()
{
    return this.ServiceRestriction;
};
///////////////////////////////End of Authorization restriction class and functions///////////////////////////////////////////////////
///////////////////////////////Service restriction class and functions///////////////////////////////////////////////////
var ServiceRestriction=function(minimumStatusPoints,serviceIdentifier)//used by everyone
{
    var minimumStatusPoints;
    this.minimumStatusPoints=minimumStatusPoints;
    var ServiceIdentifier;
    this.ServiceIdentifier=serviceIdentifier;
};
ServiceRestriction.prototype.setServiceRestrictionStatusPoints=function(minimumStatusPoints)
{
    this.minimumStatusPoints=minimumStatusPoints;
};
ServiceRestriction.prototype.setServiceRestrictionStatusPoints=function(minimumStatusPoints)
{
    this.minimumStatusPoints=minimumStatusPoints;
};

ServiceRestriction.prototype.setServiceRestrictionServiceIdentifier=function(serviceIdentifier)
{
    this.ServiceIdentifier=serviceIdentifier;
};

ServiceRestriction.prototype.getServiceRestrictionMinimumStatusPoints=function() {
    return this.minimumStatusPoints;
};
ServiceRestriction.prototype.getServiceRestrictionServiceIdentifier=function() {
    return this.ServiceIdentifier;
};
///////////////////////////////End of Service restriction class and functions///////////////////////////////////////////////////
///////////////////////////////Service Identifier class and functions///////////////////////////////////////////////////
var ServiceIdentifier=function(fullyQualifiedInterfaceName,methodName)//used by everyone
{
    var fullyQualifiedInterfaceName;
    var methodName;
    this.fullyQualifiedInterfaceName=fullyQualifiedInterfaceName;
    this.methodName=methodName;
};
ServiceIdentifier.prototype.setServiceIdentifierMethodName=function(methodName)
{
    this.methodName=methodName;
};
ServiceIdentifier.prototype.setServiceIdentifierInterfaceName=function(fullyQualifiedInterfaceName)
{
    this.fullyQualifiedInterfaceName=fullyQualifiedInterfaceName;
};
ServiceIdentifier.prototype.getServiceIdentifierMethodName=function()
{
    return this.methodName;
};
ServiceIdentifier.prototype.getServiceIdentifierInterfaceName=function()
{
    return this.fullyQualifiedInterfaceName;
};
///////////////////////////////End of Service Identifier class and functions//////////////////////////////////////////////////

////////////////////////////test////////////////////////////////////
var sIdentifier=new ServiceIdentifier("Authorization","updateAuthorizationRestriction");
var serviceRestriction=new ServiceRestriction(2,sIdentifier);
var authRestriction=new AuthorizationRestriction(serviceRestriction);
var updateAuth=new UpdateAuthorizationRestrictionRequest("u12118282",authRestriction);
var auth=new Authorization;
auth.updateAuthorizationRestriction(updateAuth);
/////////////////////////test end//////////////////////////////////

////////////////////////////test add////////////////////////////////////
var sIdentifier=new ServiceIdentifier("Authorization","addAuthorizationRestriction");
var serviceRestriction=new ServiceRestriction(4,sIdentifier);
var authRestriction=new AuthorizationRestriction(serviceRestriction);
var addAuth=new AddAuthorizationRestrictionRequest("u13397134",authRestriction);
var auth=new Authorization;
auth.addAuthorizationRestriction(addAuth);
/////////////////////////test add end//////////////////////////////////

////////////////////////////test remove////////////////////////////////////
var rSIdentifier =new ServiceIdentifier("Authorization","removeAuthorizationRestriction");
var rServiceRestriction =new ServiceRestriction(5,rSIdentifier);
var rAuthRestriction;
rAuthRestriction = new AuthorizationRestriction(rServiceRestriction);
var removeAuth;
removeAuth = new RemoveAuthorizationRestrictionRequest("u12230830", authRestriction);
var rAuth;
rAuth = new Authorization;
rAuth.removeAuthorizationRestriction(removeAuth);
/////////////////////////test remove end//////////////////////////////////

//**************************getAuthorizationRestriction***************************//
Authorization.prototype.getAuthorizationRestriction = function(getAuthReq)
{
    var getAuthorizationRequestResult;//this holds the returned (cursor) object which is going to be decoded to get the rest of the information.

    var Db = require('mongodb').Db,
        MongoClient = require('mongodb').MongoClient,
        Server = require('mongodb').Server,
        assert = require('assert');

    var db = new Db('authorization', new Server('localhost', 27017));
    // Establish connection to db
    db.open(function(err, db)
    {
        // Get a collection
        db.collection('Authentication', function (err, collection)
        {
            // Fetch the requested restriction object according to the request.
            getAuthorizationRequestResult = collection.find(
                {
                    "serviceName" : getAuthReq.getAuthorizationRestriction().getServiceRestriction().getServiceRestrictionServiceIdentifier().getServiceIdentifierMethodName()
                })
        })
    })

    return getAuthorizationRequestResult;
}
//***********************************end************************************//

