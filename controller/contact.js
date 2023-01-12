
const connection = require('../model/db');
const { validateAddContact } = require('../validation/contactValidation');

exports.addContact = async (req, res) => {
    try {
        const { error } = validateAddContact(req.body);
        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.status(400).send(err1)
            }
            if (error.details[0].context.key == 'email') {
                var err2 = error.details[0].message;
                return res.status(400).send(err2)
            }
            if (error.details[0].context.key == 'number') {
                var err3 = error.details[0].message;
                return res.status(400).send(err3)
            }
            if (error.details[0].context.key == 'message') {
                var err4 = error.details[0].message;
                return res.status(400).send(err4)
            }
            if (error.details[0].context.key == 'date') {
                var err5 = error.details[0].message;
                return res.status(400).send(err5)
            }

        }
        const { name, email, number, message, date } = req.body
        connection.query('SELECT * FROM contact WHERE email=?', [email], (err, result) => {

            if (result.length > 0) {
                return res.status(400).send('Contact Email already add')

            }
            else {
                connection.query('INSERT INTO contact SET ?', {
                    name: name,
                    email: email,
                    number: number,
                    message: message,
                    date: date
                }, (err, addResult) => {
                    if (addResult) {
                        res.send('Contact Will Be Add')
                    }
                })
            }

        })
    }
    catch (error) {
        console.error(error);
    }

}









exports.data = async (req, res) => {
    connection.query('SELECT * FROM contact ', async (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.status(400).send('data not found')
        }
    });

};

exports.updateContact = async (req, res) => {
    try {

        let id = req.params.id;
        const { name, email, number, message, date } = req.body
        connection.query(`UPDATE contact SET name='${name}', email='${email}', number='${number}', message='${message}', date='${date}' WHERE id=?`, [id], async (err, result) => {

            if (result) {
                res.send('Contact Will Be Update')
            }
            else {
                res.status(400).send('data not found')
            }
        })
    } catch (error) {
        console.error(error);
    }

}

exports.deleteContact = async (req, res) => {
    try {
        let id = req.params.id;
        connection.query('DELETE FROM contact WHERE id=?', [id], async (err, result) => {
            if (result) {
                res.send('Contact will be Deleted')
            }
            else {
                res.status(400).send('Data not found')
            }
        })

    } catch (error) {
        console.error(error);
    }
}
