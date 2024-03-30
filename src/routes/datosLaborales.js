const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/minsaitAngular',['datosLaborales']);
const ObjectId = require('mongodb').ObjectId;


router.get('/datosL',(req,res,next)=>{
    db.datosL.find((err,datosL) => {
        if(err) return next(err);
        res.json(datosL);
    });
});

router.get('/datosL/:id', (req, res, next) => {
    db.datosL.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, datosL) => {
        if (err) return next(err);

        if (!datosL) {
        
            return res.status(404).json({ error: 'perfil not found' });
        }

        res.json(datosL);
    });
});

router.post('/datosL', (req, res, next) => {
    const datosL = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!datosL.puestoPostulante) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.datosL.save(datosL, (err, datosLSaved) => {
            if (err) return next(err);
            res.json(datosLSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/datosL/:id', (req, res, next) => {
    const datosLID = req.params.id;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(datosLID)) {
        return res.status(400).json({ error: 'Invalid datosL id' });
    }

    db.datosL.remove({ _id: ObjectId(datosLID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'datosL not found' });
        }

        res.json({ message: 'datosL deleted successfully' });
    });
});

router.put('/datosL/:id', (req, res, next) => {
    const datosLID = req.params.id;
    const {Username,
        puestoPostulante,
        lenguajeProgramacion,
        tecnologias,
        yearsExperiencia,
        idiomas,
        certificaciones
    }
             = req.body;

    if (!ObjectId.isValid(datosLID)) {
        return res.status(400).json({ error: 'Invalid datosL ID' });
    }

    const query = { _id: ObjectId(datosLID) };
    const update = {
        $set: {
            Username,
            puestoPostulante,
            lenguajeProgramacion,
            tecnologias,
            yearsExperiencia,
            idiomas,
            certificaciones
        }
    };

    db.datosL.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'ciudad not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'datosl updated successfully' });
    });
});


module.exports=router;