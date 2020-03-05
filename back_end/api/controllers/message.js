import connection from '../dbs/index.js';

const GET_MESSAGE_PATH = "SELECT msg_path FROM msg_t WHERE uid = ? \
AND msg_id = ?";

const GET_EMAIL_MSGS = "SELECT msg_id, subject, from_add FROM msg_t \
WHERE uid = ?;";

//const GET_SEARCHED_EMAIL_MSGS = "SELECT msg_id, subject, from_add \
//FROM msg_t WHERE uid = ? AND subject LIKE ?%;";

export function getMessagePathQuery(req, res) {
    connection.query(GET_MESSAGE_PATH, [req.params.id,req.params.message_id], function(error, results, fields) {
        let fetched_msg_path = results[0].msg_path;
        if (error) throw error;
        fs.readFile(fetched_msg_path, 'utf8', (err, data) => {
            if (err) throw err;
            res.end(JSON.stringify(data)) 
          }); 
    });
}

export function getEmailMessagesQuery(req, res) {
    connection.query(GET_EMAIL_MSGS, [req.params.id], function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results)) 
    });
}