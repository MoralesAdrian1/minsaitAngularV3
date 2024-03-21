const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/minsaitAngular',['ciudad']);
const ObjectId = require('mongodb').ObjectId;


router.get('/ciudad',(req,res,next)=>{
    db.ciudad.find((err,ciudad) => {
        if(err) return next(err);
        res.json(ciudad);
    });
});

router.get('/ciudad/:id', (req, res, next) => {
    db.ciudad.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, ciudad) => {
        if (err) return next(err);

        if (!ciudad) {
            // If vehiculo is null, return a 404 status code
            return res.status(404).json({ error: 'ciudad not found' });
        }

        res.json(ciudad);
    });
});

router.post('/ciudad', (req, res, next) => {
    const ciudad = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!ciudad.nombreCiudad) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.ciudad.save(ciudad, (err, ciudadSaved) => {
            if (err) return next(err);
            res.json(ciudadSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/ciudad/:id', (req, res, next) => {
    const CiudadID = req.params.id;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(CiudadID)) {
        return res.status(400).json({ error: 'Invalid ciudad id' });
    }

    db.ciudad.remove({ _id: ObjectId(CiudadID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'Ciudad not found' });
        }

        res.json({ message: 'ciudad deleted successfully' });
    });
});

router.put('/ciudad/:id', (req, res, next) => {
    const CiudadID = req.params.id;
    const {nombrePais,nombreEstado,nombreCiudad} = req.body;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(CiudadID)) {
        return res.status(400).json({ error: 'Invalid datosP ID' });
    }

    const query = { _id: ObjectId(CiudadID) };
    const update = {
        $set: {
            nombrePais,
            nombreEstado,
            nombreCiudad
        }
    };

    db.ciudad.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'ciudad not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'ciudad updated successfully' });
    });
});


module.exports=router;