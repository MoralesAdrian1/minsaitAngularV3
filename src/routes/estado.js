const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/minsaitAngular',['estado']);
const ObjectId = require('mongodb').ObjectId;


router.get('/estado',(req,res,next)=>{
    db.estado.find((err,estado) => {
        if(err) return next(err);
        res.json(estado);
    });
});

router.get('/estado/:id', (req, res, next) => {
    db.estado.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, estado) => {
        if (err) return next(err);

        if (!estado) {
            // If vehiculo is null, return a 404 status code
            return res.status(404).json({ error: 'estado not found' });
        }

        res.json(estado);
    });
});

router.post('/estado', (req, res, next) => {
    const estado = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!estado.nombreEstado) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.estado.save(estado, (err, estadoSaved) => {
            if (err) return next(err);
            res.json(estadoSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/estado/:id', (req, res, next) => {
    const EstadoID = req.params.id;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(EstadoID)) {
        return res.status(400).json({ error: 'Invalid pais id' });
    }

    db.estado.remove({ _id: ObjectId(EstadoID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'Estado not found' });
        }

        res.json({ message: 'estado deleted successfully' });
    });
});

router.put('/estado/:id', (req, res, next) => {
    const EstadoID = req.params.id;
    const {nombrePais,nombreEstado} = req.body;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(EstadoID)) {
        return res.status(400).json({ error: 'Invalid datosP ID' });
    }

    const query = { _id: ObjectId(EstadoID) };
    const update = {
        $set: {
            nombrePais,
            nombreEstado
        }
    };

    db.estado.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'estado not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'estado updated successfully' });
    });
});


module.exports=router;