
const connection = require('../model/db');
const { validateAddCategory } = require('../validation/catagoryValidation');

exports.addCategory = async (req, res) => {
    try {
        const { error } = validateAddCategory(req.body);

        if (error) {
            if (error.details[0].context.key == 'category_name') {
                var err1 = error.details[0].message;
                return res.status(400).send(err1)
            }
        }
        
        const { category_name } = req.body
        connection.query('SELECT * FROM `category` WHERE Name=?', [category_name], (error, result) => {
// console.log('result',result);
            if (result.length > 0) {
                return res.status(400).send('Category already add')

            }
            else {
                connection.query('INSERT INTO category SET ?', {
                    Name: category_name
                }, (err, addResult) => {
                    if (addResult) {
                        res.send('Category Will Be Add')
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
    connection.query('SELECT * FROM `category`', async (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.status(400).send('data not found')
        }
    });

};

exports.updateCategory = async (req, res) => {
    try {
        let id = req.params.id;
        const { category_name } = req.body;
        connection.query(`UPDATE category SET Name='${category_name}' WHERE id=?`, [id], async (err, result) => {
            console.log(result);
            if (result) {
                res.send('Category Will Be Update')
            }
            else {
                res.status(400).send('data not found')
            }
        })
    } catch (error) {
        console.error(error);
    }

}

exports.deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`SELECT * FROM category WHERE id = ?  `, [id], async function (err, params) {
            if (params) {
                connection.query(`DELETE FROM category   WHERE id = ?`, [id], async function (err, result) {
                    if (result) {
                        res.send('data is delete.....');
                    }
                    else {
                        res.send('data is not delete.....');
                        logger.error(err);
                    }
                })
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}
// exports.deleteCategory = async (req, res) => {
//     console.log('id', req, res);
//     try {
//         let id = req.params.id;
//         connection.query('DELETE FROM `category` WHERE id=?', [id], async (err, result) => {
//             if (result) {
//                 res.send('Category Delete Successfuly')
//             }
//             else {
//                 res.status(400).send('data not found')
//             }
//         })

//     } catch (error) {
//         console.error(error);
//     }
// }





