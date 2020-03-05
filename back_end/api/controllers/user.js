import connection from '../dbs/index.js';
import Imap from 'imap';
//const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
import { configImap } from '../functions/index.js';

const VALIDATE_USER = "SELECT uid, email_addr, SMTP, IMAP, pwd, \
imap_port, smtp_port FROM account_t WHERE uid = (SELECT uid FROM \
user_t WHERE user_name = ? AND password = ?);";

const ENTER_USER = "INSERT INTO user_t (uid, first_name, last_name, \
phone, password, user_name) SELECT MAX(uid)+1,?, ?,?,?,? FROM user_t \
WHERE NOT EXISTS (SELECT 1 FROM user_t WHERE first_name = ? AND \
last_name = ?); ";
  
//const UPDATE_USER = "UPDATE user_t SET phone = ?, password = ?, \
//user_name = ? WHERE first_name = ? AND last_name = ?;";

const ENTER_ACCOUNT = "INSERT INTO account_t (uid, email_addr, \
    SMTP, IMAP, pwd, imap_port, smtp_port) SELECT (SELECT uid FROM user_t \
    WHERE first_name = ? AND last_name = ?),?,?,?,?,?,? \
    WHERE NOT EXISTS (SELECT 1 FROM account_t WHERE email_addr = ?);";

export function registerUserQuery(req, res) {
    connection.query(ENTER_USER, [req.body.first_name, req.body.last_name, req.body.phone, req.body.password, req.body.user_name, req.body.first_name, req.body.last_name], function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results))
    }) 
    
    connection.query(ENTER_ACCOUNT, [req.body.first_name, req.body.last_name, req.body.email_addr, req.body.SMTP, req.body.IMAP, req.body.pwd, req.body.imap_port, req.body.smtp_port, req.body.email_addr], function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results))
    })
}

export function validateUserQuery(req, res) {
    connection.query(VALIDATE_USER, [req.body.user_name, req.body.password], function(error, results, fields) {
        if (error) throw error;
        let fetched_results = results[0];


        if (fetched_results) {
            // create new IMAP object
            let imap = new Imap({
                user: fetched_results.email_addr, //emailAdd
                password: fetched_results.pwd, //pw
                host: fetched_results.IMAP, //imapAddr
                port: fetched_results.imap_port, //imapPort
                tls: false,
                tlsOptions: { rejectUnauthorized: false }
            });

            // retrieve and process messages
            configImap(imap);
        }
        res.end(JSON.stringify(fetched_results))
    })  
};

export function sendNewEmalQuery(req, res) {
    connection.query(VALIDATE_USER, [req.body.user_name, req.body.password], function(error, results, fields) {
        if (error) throw error;
        let fetched_results = results[0];


        if (fetched_results) {
            // create new IMAP object
            let transporter = nodemailer.createTransport({
                //host: req.body.SMTP,
                host: fetched_results.SMTP,
                port: fetched_results.smtp_port,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: fetched_results.email_addr, // generated ethereal user
                    pass: fetched_results.pwd // generated ethereal password
                }
            });
            console.log("post send mail");
            // send mail with defined transport object
            transporter.sendMail({
                from: fetched_results.email_addr, // sender address
                to: req.body.recipient, // list of receivers
                subject: req.body.subject, // Subject line
                text: req.body.email_msg, // plain text body
                html: "<b>" + req.body.email_msg + "</b>" // html body
            });
        }
        res.end(JSON.stringify(fetched_results))
    })  
};
