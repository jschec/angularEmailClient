import MailParser from 'mailparser';
import inspect from 'util';
import fs from 'fs';
//var Imap = require('imap'),
//inspect = require('util').inspect;
//var fs = require('fs'), fileStream;
// Process message called by configImap
export function processMessage(msg, seqno) {
    var parser = new MailParser();
    parser.on("headers", function(headers) {
        var subject = JSON.stringify(headers.get('subject'));
        var trimmedStr = subject.substr(1);
        subject = trimmedStr.slice(0, -1);
        subject = subject.replace(/[^a-zA-Z ]/g, "")
        var str =  JSON.stringify(headers.get('from'));
        var arr = str.split(",");
        arr = arr[0].split(":");
        trimmedStr = arr[2].substr(1);
        var fromStr = trimmedStr.slice(0, -1);
        connection.query("INSERT INTO msg_t (uid, msg_id, msg_path, from_add, subject) SELECT " + uid + "," + seqno + ", 'messages/msg-" + seqno + "-body.html', '"+ fromStr +"', '" + subject + "' WHERE NOT EXISTS (SELECT 1 FROM msg_t WHERE msg_id = " + seqno + " AND uid = " + uid + ")");
    });

    parser.on('data', data => {
        if (data.type === 'text') {
        
            // write message text to file
            fs.writeFile('messages/msg-' + seqno + '-body.html', data.html, 'utf8', (err) => {  
                // throws an error, you could also catch it here
                if (err) throw err;
            });
        }
     });

    msg.on("body", function(stream) {
        stream.on("data", function(chunk) {
            parser.write(chunk.toString("utf8"));
        });
    });

    msg.once("end", function() {
        parser.end();
    });
}


export function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

// open email inbox and process messages
export function configImap(imap)
{
    
    imap.once('ready', function() {
        openInbox(function(err, box) {
            var msgCntr = 0;
            var inboxObj = [{
                'ID': 1,
                'body': 2,
            }];

            if (err) throw err;

            // retrieve messages from inbox
            imap.search([ 'UNSEEN', ['SINCE', 'Jun 17, 2019'] ], function(err, results) {
                if (err) throw err;

                var f = imap.fetch(results, { bodies: "" });
                //f.on("message", processMessage);

                f.on('message', function(msg, seqno) {
                    inboxObj[msgCntr].ID = seqno;
                    
                    var prefix = '(#' + seqno + ')' ;

                    // process email message
                    // store to file
                    processMessage(msg, seqno);

                    msg.on('body', function(chunk) {
                    });

                    msg.on('body', function(stream, info) {
                    });
                    
                    msg.once('attributes', function(attrs) {
                    });

                    msg.once('end', function() {
                    });
                });
                
                f.once('error', function(err) {
                });
                f.once('end', function() {
                    imap.end();
                });
            });
        });
    });

    imap.once('error', function(err) {
        console.log(err);
    });
    imap.once('end', function() {
        console.log('Connection ended');
    });
    imap.connect();
}