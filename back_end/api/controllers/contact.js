import connection from '../dbs/index.js';
//const GET_CONTACT_INFO = "SELECT first_name, last_name, email_addr" +
//"FROM address_bk_t WHERE uid = (SELECT uid FROM user_t WHERE " +
//"first_name = ? AND last_name = ?);";

const GET_CONTACTS = "SELECT uid, first_name, last_name, email_addr \
FROM address_bk_t \
WHERE uid = ?;";

const GET_CONTACT = "SELECT uid, first_name, last_name, email_addr \
FROM address_bk_t WHERE uid = ? AND email_addr = ?;";

const ENTER_CONTACT = "INSERT INTO address_bk_t (uid, first_name, \
last_name, email_addr) SELECT ?,?,?,? WHERE NOT EXISTS (SELECT 1 \
FROM address_bk_t WHERE email_addr = ?);";

const UPDATE_CONTACT = "UPDATE address_bk_t SET first_name=?, \
last_name=?, email_addr=? WHERE email_addr = ? AND uid = ?;";

const DELETE_CONTACT = "DELETE FROM address_bk_t WHERE \
email_addr = ? AND uid = ?;";


export function enterContactQuery(req, res) {
    connection.query(ENTER_CONTACT, [req.body.uid, req.body.first_name, req.body.last_name, req.body.email_addr, req.body.email_addr], function(error, results, fields) { //change this
        if (error) throw error;
        res.end(JSON.stringify(results)) 
    })
}

export function getContactsQuery(req, res) {
    connection.query(GET_CONTACTS, [req.params.id], function(error, results, fields) {
        if (error) throw error;

        res.end(JSON.stringify(results)) 
    })
}

export function getContactQuery(req, res) {
    connection.query(GET_CONTACT, [req.params.id, req.params.email], function(error, results, fields) {
        let fetched_result = results[0];
        if (error) throw error;

        res.end(JSON.stringify(fetched_result)) 
    })
}

export function updateContactQuery(req, res) {
    connection.query(UPDATE_CONTACT, [req.body.first_name, req.body.last_name, req.body.email_addr, req.params.email, req.params.id], function(error, results, fields) { //change this
        if (error) throw error;
        res.end(JSON.stringify(results)) 
    })
}

export function deleteContactQuery(req, res) {
    connection.query(DELETE_CONTACT, [req.params.email, req.params.id], function(error, results, fields) { //change this
        if (error) throw error;
        res.end(JSON.stringify(results)) 
    })
}