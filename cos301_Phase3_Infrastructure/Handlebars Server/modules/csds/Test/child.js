/**
 * Created by collins on 2015/03/24.
 */
var ldap = require('ldapjs');
var assert = require('assert');
var client;
var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
var message;
var type;
var userObject;
var found = false;

console.log('Child initializing..');

process.on('message', function(message) {
    if(message.Type === 'findUser')
    {
        findUser(message.username, message.password);
    }
});

process.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
});

function setDnTest(string)
{
    dn = string;
}

var dn = 'this should be something else';
function findUser(username,password)
{
    client = ldap.createClient({url: 'ldap://reaper.up.ac.za:'});
    var opts = {
        filter: 'uid='+username,
        scope: 'sub'
    };

    console.log('searching for user: '+username);
    client.search(base, opts, function (err, res)
    {
        assert.ifError(err);

        res.on('searchEntry', function (entry)
         {
            userObject = JSON.parse(JSON.stringify(entry.object));

            var user = JSON.parse(JSON.stringify(entry.object));
            if(typeof entry.object.dn == "string")
            {
                //window.dn =entry.object.dn;
                setDnTest(entry.object.dn);
                found = true;
            }

             if(found) {
             // console.log('User '+username+' found');
             // console.log('User object: '+(JSON.parse(JSON.stringify(entry.object))));
             //bind as user
             //auth(entry.object.dn,password,output);
             //console.log(tmp);
             //findUserModules(username);

                 Data = {'status': 'ok','data':dn};
                 process.send(Data);
                 return true;
             }
         });

         res.on('end', function (result) {});

    });
    client.unbind(function(err) {
        assert.ifError(err);
    });
}
