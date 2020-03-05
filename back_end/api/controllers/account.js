import connection from '../dbs/index.js';

const GET_ACCOUNTS = "SELECT uid, email_addr, SMTP, IMAP, imap_port, \
smtp_port, pwd FROM account_t WHERE uid = ?;";

const UPDATE_ACCOUNT = "UPDATE account_t SET email_addr = ?, \
SMTP = ?, IMAP = ?, smtp_port = ?, imap_port = ? WHERE uid = ?;";

export function getAccountsQuery(req, res) {
    connection.query(GET_ACCOUNTS, [req.params.id], function(error, results, fields) {
        let fetched_results = results[0];
        if (error) throw error;
        res.end(JSON.stringify(fetched_results)) 
    });
}

export function updateAccountQuery(req, res) {
    connection.query(UPDATE_ACCOUNT, [req.body.email_addr, req.body.SMTP, req.body.IMAP, req.body.smtp_port, req.body.imap_port, req.body.uid], function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results))
    });
}