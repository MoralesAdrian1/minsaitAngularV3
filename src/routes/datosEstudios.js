const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/minsaitAngular',['datosEstudios']);
const ObjectId = require('mongodb').ObjectId;


router.get('/datosEs',(req,res,next)=>{
    db.datosEs.find((err,datosEs) => {
        if(err) return next(err);
        res.json(datosEs);
    });
});

router.get('/datosEs/:id', (req, res, next) => {
    db.datosEs.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, datosEs) => {
        if (err) return next(err);

        if (!datosEs) {
        
            return res.status(404).json({ error: 'datosEs not found' });
        }

        res.json(datosEs);
    });
});

router.post('/datosEs', (req, res, next) => {
    const datosEs = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!datosEs.username) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.datosEs.save(datosEs, (err, datosEsSaved) => {
            if (err) return next(err);
            res.json(datosEsSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/datosEs/:id', (req, res, next) => {
    const datosEsID = req.params.id;

    if (!ObjectId.isValid(datosEsID)) {
        return res.status(400).json({ error: 'Invalid datosL id' });
    }

    db.datosEs.remove({ _id: ObjectId(datosEsID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'datosEs not found' });
        }

        res.json({ message: 'datosEs deleted successfully' });
    });
});

router.put('/datosEs/:id', (req, res, next) => {
    const datosEsID = req.params.id;
    const {username,
           nombreUniversidad,
           titulo,
           fechaInicion,
           fechaFin        
    }
             = req.body;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(datosEsID)) {
        return res.status(400).json({ error: 'Invalid datosEsID ID' });
    }

    const query = { _id: ObjectId(datosEsID) };
    const update = {
        $set: {
            username,
            nombreUniversidad,
            titulo,
            fechaInicion,
            fechaFin 
        }
    };

    db.datosEs.updateOne(query, update, (err, result) => {
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