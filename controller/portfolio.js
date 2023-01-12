const connection = require('../model/db');
const { validateAddPortfolio } = require('../validation/portfolioValidation');

// exports.addData = async (req, res) => {
//     try {
//         const { error } = portfolioValidate(req.body);
//         if (error) {
//             return res.status(400).send(error.details[0].message);
//         } else {
//             const result = req.files.map(images => images.filename);
//             const category_name = req.body.category_name;
//             const projectName = req.body.projectName;
//             const uploadImage = result;
//             const projectTitle = req.body.projectTitle;
//             const projectDescription = req.body.projectDescription;
//             const projectDate = req.body.projectDate;

//             connection.query(`SELECT id FROM category where category_name='${category_name}'`, function (err, result) {
//                 console.log(result);
//                 const category_id = result[0].id;
//                 const sql = `INSERT INTO portfolio (projectCategory,projectName,uploadImage,projectTitle,projectDescription,projectDate) VALUES('${projectCategory}','${projectName}','${uploadImage}','${projectTitle}','${projectDescription}','${projectDate}')`;
//                 connection.query(sql, (err, result) => {
//                     if (err) {
//                         logger.error('Error', err);
//                     } else {
//                         res.send("Data Inserted...")
//                     }
//                 })
//             })
//         }
//     } catch (err) {
//         logger.error('Error', err);
//     }
// }

exports.addportfolio = async (req, res) => {


    try {
        const { error } = validateAddPortfolio(req.body);
        
        if (error) {

            if (error.details[0].context.key == 'porject_name') {

                var err2 = error.details[0].message;
                return res.status(400).send(err2)
            }
            if (error.details[0].context.key == 'porject_title') {

                var err4 = error.details[0].message;
                return res.status(400).send(err4)
            }
            if (error.details[0].context.key == 'porject_date') {

                var err5 = error.details[0].message;
                return res.status(400).send(err5)
            }
            if (error.details[0].context.key == 'description') {

                var err6 = error.details[0].message;
                return res.status(400).send(err6)
            }
        }
        if (req.files.length === 0){
            var err7 = 'Image is reqired filed';
            return res.status(400).send(err7)
        }
        console.log(req.files);

        const category_name = req.body.project_category;
        connection.query(`SELECT * FROM category WHERE Name = ?`, [category_name],  (err, result) => {

            if (result) {
                const multipleimg = req.files.map((multipleimg) => multipleimg.filename)

console.log('idvi',multipleimg)
                const project_category = result[0].id;


                const { porject_name, porject_title, porject_date, description } = req.body
                const profile = multipleimg;
                const sql = `INSERT INTO portfolio ( project_category,porject_name,porject_title,porject_date,description,profile) VALUES('${ project_category}', '${porject_name}', '${porject_title}', '${porject_date}', '${description}','${profile}')`;
                    console.log("rtyhudfghdfghcvb",sql);
                connection.query(
                sql, (err, addResult) => {
                    if (addResult) {
                        res.send('Portfolio Will Be Add')
                    }console.log('error',err);
                })

            }
            else {
                res.status(400).send('Category Not Found');
            }
        })

    } catch (error) {
        console.log(error);
    }

}

exports.data = async (req, res) => {
    connection.query('SELECT portfolio.id,category.Name,porject_name,porject_title,porject_date,description,profile FROM portfolio INNER JOIN category ON category.id = portfolio.project_category', async (err, result) => {

        if (result) {
            res.send(result)
        }
        else {
            res.status(400).send('data not found')
        }
    });

};



exports.updatePortfolio = async (req, res) => {
    try {

        let id = req.params.id;
        const category = req.body.project_category;
        if (req.files.length === 0){
            var err7 = 'Image is reqired filed';
            return res.status(400).send(err7)
        }
        connection.query(`SELECT * FROM category WHERE Name = ?`, [category], (err, result) => {

            if (result) {
                const multipleimg = req.files.map((multipleimg) => multipleimg.filename)
                const project_category = result[0].id;
                const { porject_name, porject_title, porject_date, description } = req.body
                const profile = multipleimg;
                connection.query('UPDATE portfolio SET ?', {
                    project_category: project_category,
                    porject_name: porject_name,
                    porject_title: porject_title,
                    porject_date: porject_date,
                    description: description,
                    profile: profile
                }, (err, addResult) => {
                    if (addResult) {
                        res.send('Portfolio Will Be update')
                    }
                })

            }
        })
    } catch (error) {
        console.error(error);
    }

}

exports.deletePortfolio = async (req, res) => {
    try {
        let id = req.params.id;
        connection.query('DELETE FROM portfolio WHERE id=?', [id], async (err, result) => {
            if (result) {
                res.send(' Deleted Portfolio ')
            }
            else {
                res.status(400).send('data not found')
            }
        })

    } catch (error) {
        console.error(error);
    }
}

exports.multipleDelete = async (req, res) => {
    try {
        let { error } = idValidate(req.body);
        console.log(error);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const id = req.body.id;
            connection.query("DELETE FROM portfolio WHERE id IN ('" + id.join("','") + "') ", (err, response) => {
                if (response) {
                    res.send("Selected Category Deleted...");
                } else {
                    res.send('Selected Category Not Deleted!.....');
                }
            });
        }

    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }

};
