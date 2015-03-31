/**
 * Created by Jaco-Louis on 2015/03/17.
 */
/*
    This module will be used to create and close various Buzz Spaces
 */
/**
 * Created by Jaco-Louis on 2015/03/17.
 */

/*
 This module will be used to create and close various Buzz Spaces
 */

var mongoose = require('mongoose');
var sp = require('../Database/connect.js');
// Schema
var spacesSchema = mongoose.Schema({
    name: String,
    academicYear: String,
    isOpen: String,
    moduleID: String,
    adminUsers : Array
})
// Add method to schema
spacesSchema.methods.speak = function () {
    var moduleName = this.name
        ? "Module name is " + this.name
        : "I don't have a name"
    //console.log(moduleName);
}

// Compile schema into a model (class that constructs documents)
var Space = mongoose.model('Spaces', spacesSchema)
// end schema

function isAuthorized(userId, moduleId) { return true; };

exports.closeBuzzSpace = function (userId, moduleId) {
    var obj = {};
    // check if space exists
    Space.findOne({moduleID:moduleId}, function (err, result) {
        if (err) {
            throw new Error("NoSuchBuzzSpaceException");
        } else {
            // check if user is an admin for buzz space
            if (isAuthorized(userId, moduleId)) {
                if(result == null)
                {
                    // Module does not exist
                    console.log("Did not found space that should be closed");
                }
                else
                {
                    //else module exists, update
                    console.log("Found space that should be closed");
                    result.isOpen = false;

                    result.save(function (err) {
                        //res.send(result);
                    });

                }

            } else {
                throw new Error("NotAuthorizedException");
            }
            obj = result;
        }
    });

    return obj;
};


exports.createBuzzSpace = function (academicYear,isOpen,moduleID,name,adminUsers) {
    var newBuzzSpace = new Space({academicYear:academicYear,isOpen:isOpen,moduleID:moduleID,name:name,adminUsers:adminUsers});
    //check if the module exists
    Space.findOne({moduleID:moduleID}, function (err,result) {
        if (result == null) {
            console.log("Buzz space not yet created, able to insert");
            newBuzzSpace.save(function (err, cosTest) {
                if (err) return console.error(err);

                Space.find(function (err, spaces) {
                    if (err) return console.error(err);
                    //console.log(spaces);
                })
            });
        }
        else{
            console.log("Buzz space already exists");

            Space.find(function (err, spaces) {
                if (err) return console.error(err);
                //console.log(spaces);
            })
            newBuzzSpace = result;
        }

    })

    return newBuzzSpace;
};

exports.assignAdministrator = function (academicYear,isOpen,moduleID,name,adminUsers,newAdmin, userId) {
    //check if the module exists
    Space.findOne({'moduleID':moduleID},function (err,result) {
        if (result == null) {
            //throw new Error("NoSuchBuzzSpaceException");
            console.log("Could not find buzz space to close");
        } else {
            console.log("Found module to assign admin to");
            // check if user is an admin for buzz space
            if (isAuthorized(userId, moduleID)) {
                result.adminUsers.push(newAdmin);

                result.save(function (err) {
                    //res.send(result);
                });
            } else {
                throw new Error("NotAuthorizedException");
            }
        }
    })

    return adminUsers;
};

exports.removeAdministrator = function (userId, moduleID, adminToRemove) {

    var obj = {};
    Space.findOne({'moduleID':moduleID},function (err,result) {
        if (result == null) {
            //throw new Error("NoSuchBuzzSpaceException");
            console.log("Could not find buzz space to remove admin from");
        } else {
            console.log("Found module to remove admin from");
            // check if user is an admin for buzz space
            if (isAuthorized(userId, moduleID)) {

                // *******************************************
                // Outline of how to find an admin, please fix
                // *******************************************
                var index = result.adminUsers.indexOf(adminToRemove);

                if (index > -1) {
                    result.adminUsers.splice(index, 1);
                }
                if (index == -1) {
                    console.log("Could not find administrator to remove on the buzz space.");
                }
                // *******************************************
                // End of outline
                // *******************************************

                result.save(function (err) {
                    //res.send(result);
                });
            } else {
                throw new Error("NotAuthorizedException");
            }
        }
        obj = result;
    })

    return obj;
};