const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/minsaitAngular',['perfil']);
const ObjectId = require('mongodb').ObjectId;


router.get('/perfil',(req,res,next)=>{
    db.perfil.find((err,perfil) => {
        if(err) return next(err);
        res.json(perfil);
    });
});

router.get('/perfil/:id', (req, res, next) => {
    db.perfil.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, perfil) => {
        if (err) return next(err);

        if (!perfil) {
        
            return res.status(404).json({ error: 'perfil not found' });
        }

        res.json(perfil);
    });
});

router.post('/perfil', (req, res, next) => {
    const perfil = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!perfil.puesto) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.perfil.save(perfil, (err, perfilSaved) => {
            if (err) return next(err);
            res.json(perfilSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/perfil/:id', (req, res, next) => {
    const PerfilID = req.params.id;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(PerfilID)) {
        return res.status(400).json({ error: 'Invalid perfil id' });
    }

    db.perfil.remove({ _id: ObjectId(PerfilID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'perfil not found' });
        }

        res.json({ message: 'perfil deleted successfully' });
    });
});

router.put('/perfil/:id', (req, res, next) => {
    const PerfilID = req.params.id;
    const {puesto,
            lenguajeProgramacion,
            tecnologia,
            yearsExperiencia,
            idiomas,
            certiicaciones}
             = req.body;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(PerfilID)) {
        return res.status(400).json({ error: 'Invalid PerfilID ID' });
    }

    const query = { _id: ObjectId(PerfilID) };
    const update = {
        $set: {
            puesto,
            lenguajeProgramacion,
            tecnologia,
            yearsExperiencia,
            idiomas,
            certiicaciones
        }
    };

    db.perfil.updateOne(query, update, (err, result) => {
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