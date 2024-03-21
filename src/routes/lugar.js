const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/minsaitAngular',['lugar']);
const ObjectId = require('mongodb').ObjectId;


router.get('/lugar',(req,res,next)=>{
    db.lugar.find((err,lugar) => {
        if(err) return next(err);
        res.json(lugar);
    });
});

router.get('/lugar/:id', (req, res, next) => {
    db.lugar.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, lugar) => {
        if (err) return next(err);

        if (!lugar) {
            // If vehiculo is null, return a 404 status code
            return res.status(404).json({ error: 'lugar not found' });
        }

        res.json(lugar);
    });
});

router.post('/lugar', (req, res, next) => {
    const lugar = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!lugar.nombreCiudad ) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.lugar.save(lugar, (err, lugarSaved) => {
            if (err) return next(err);
            res.json(lugarSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/lugar/:id', (req, res, next) => {
    const lugarID = req.params.id;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(lugarID)) {
        return res.status(400).json({ error: 'Invalid DatosP id' });
    }

    db.lugar.remove({ _id: ObjectId(lugarID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'Vehiculo not found' });
        }

        res.json({ message: 'Vehiculo deleted successfully' });
    });
});

router.put('/lugar/:id', (req, res, next) => {
    const lugarId = req.params.id;
    const { nombrePais,nombreEstado,nombreCiudad} = req.body;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(lugarId)) {
        return res.status(400).json({ error: 'Invalid datosP ID' });
    }

    const query = { _id: ObjectId(lugarId) };
    const update = {
        $set: {
            nombrePais,
            nombreEstado,
            nombreCiudad
        }
    };

    db.lugar.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'lugar not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'lugar updated successfully' });
    });
});


module.exports=router;