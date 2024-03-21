const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/minsaitAngular',['pais']);
const ObjectId = require('mongodb').ObjectId;


router.get('/pais',(req,res,next)=>{
    db.pais.find((err,pais) => {
        if(err) return next(err);
        res.json(pais);
    });
});

router.get('/pais/:id', (req, res, next) => {
    db.pais.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, pais) => {
        if (err) return next(err);

        if (!pais) {
            // If vehiculo is null, return a 404 status code
            return res.status(404).json({ error: 'pais not found' });
        }

        res.json(pais);
    });
});

router.post('/pais', (req, res, next) => {
    const pais = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!pais.nombrePais) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.pais.save(pais, (err, paisSaved) => {
            if (err) return next(err);
            res.json(paisSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/pais/:id', (req, res, next) => {
    const PaisID = req.params.id;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(PaisID)) {
        return res.status(400).json({ error: 'Invalid pais id' });
    }

    db.pais.remove({ _id: ObjectId(PaisID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'Vehiculo not found' });
        }

        res.json({ message: 'pais deleted successfully' });
    });
});

router.put('/pais/:id', (req, res, next) => {
    const PaisID = req.params.id;
    const {nombrePais} = req.body;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(PaisID)) {
        return res.status(400).json({ error: 'Invalid datosP ID' });
    }

    const query = { _id: ObjectId(PaisID) };
    const update = {
        $set: {
            nombrePais
        }
    };

    db.pais.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'pais not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'pais updated successfully' });
    });
});


module.exports=router;