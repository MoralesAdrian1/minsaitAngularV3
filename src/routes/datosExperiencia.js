const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/minsaitAngular',['datosExperiencia']);
const ObjectId = require('mongodb').ObjectId;


router.get('/datosEx',(req,res,next)=>{
    db.datosEx.find((err,datosEx) => {
        if(err) return next(err);
        res.json(datosEx);
    });
});

router.get('/datosEx/:id', (req, res, next) => {
    db.datosEx.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, datosEx) => {
        if (err) return next(err);

        if (!datosEx) {
        
            return res.status(404).json({ error: 'perfil not found' });
        }

        res.json(datosEx);
    });
});

router.post('/datosEx', (req, res, next) => {
    const datosEx = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!datosEx.username) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.datosEx.save(datosEx, (err, datosExSaved) => {
            if (err) return next(err);
            res.json(datosExSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/datosEx/:id', (req, res, next) => {
    const datosExID = req.params.id;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(datosExID)) {
        return res.status(400).json({ error: 'Invalid datosEx id' });
    }

    db.datosEx.remove({ _id: ObjectId(datosExID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'datosEx not found' });
        }

        res.json({ message: 'datosEx deleted successfully' });
    });
});

router.put('/datosEx/:id', (req, res, next) => {
    const datosExID = req.params.id;
    const {Username,
        nombreEmpresa,
        puesto,
        fechaInicio,
        fechaFin,
    }
             = req.body;

    if (!ObjectId.isValid(datosExID)) {
        return res.status(400).json({ error: 'Invalid datosEx ID' });
    }

    const query = { _id: ObjectId(datosExID) };
    const update = {
        $set: {
            Username,
            nombreEmpresa,
            puesto,
            fechaInicio,
            fechaFin,
        }
    };

    db.datosEx.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'datosEx not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'datosEx updated successfully' });
    });
});


module.exports=router;