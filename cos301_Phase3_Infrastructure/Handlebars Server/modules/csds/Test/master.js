/**
 * Created by collins on 2015/03/24.
 */
var cluster = require('cluster');
var childScript = __dirname + '/child.js';
var csds = new Object();
var results = null;

console.log('Master initializing..');
cluster.setupMaster({ exec: childScript });
proc = cluster.fork();

proc.on('message', function(message) {
    if(message.status === 'ok')
    {
        console.log('DN after find: '+message.data)
        results = message.data;
        //process.send({'status':200, 'data':'Login successfull'});
    }
});

csds.login = function(username,password)
{
    data = {'Type':'findUser','username' :username,'password':password};

    proc.send(data);

    while(results === null)
    {
        setTimeout(function() {}, 5000);
    }
}

module.exports = csds;
