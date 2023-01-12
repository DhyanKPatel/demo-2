const connection = require('../model/db');
const { validateAddTestimonial } = require('../validation/testimonialValidation');

exports.addtestimonial = async (req, res) => {
    try {
        const { error } = validateAddTestimonial(req.body);

        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.status(400).send(err1)
            }
            if (error.details[0].context.key == 'designation') {
                var err2 = error.details[0].message;
                return res.status(400).send(err2)
            }
            if (error.details[0].context.key == 'description') {
                var err3 = error.details[0].message;
                return res.status(400).send(err3)
            }
            

        }if (!req.file){
            return res.status(400).send('Image is reqired filed')
            }
        const { name, designation, description } = req.body
        const profile = req.file.filename;
        connection.query('INSERT INTO testimonial SET ?', {
            name: name,
            designation: designation,
            description: description,
            profile: profile
        }, (err, addResult) => {
            console.log('cdbc',err);
            if (addResult) {
                res.send('Testimonial is  Add')
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.data = async (req, res) => {
    connection.query('SELECT * FROM testimonial ', async (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.status(400).send('data not found')
        }
    });

};

exports.updateTestimonial = async (req, res) => {
    try {
        if (!req.file){
            return res.status(400).send('Image is reqired filed')
            }
        let id = req.params.id;
        const { name, designation, description } = req.body
        const profile = req.file.filename;
        connection.query(`UPDATE testimonial SET name='${name}',designation='${designation}', description='${description}',profile='${profile}' WHERE id=?`, [id], async (err, result) => {
            if (result) {
                res.send('Testimonial Will Be Update')
            }
            else {
                res.status(400).send('data not found')
            }
        })
    } catch (error) {
        console.error(error);
    }

}

exports.deleteTestimonial = async (req, res) => {
    try {
        let id = req.params.id;
        connection.query('DELETE FROM testimonial WHERE id=?', [id], async (err, result) => {
            if (result) {
                res.send(' Deleted Testimonial ')
            }
            else {
                res.status(400).send('data not found')
            }
        })

    } catch (error) {
        console.error(error);
    }
}