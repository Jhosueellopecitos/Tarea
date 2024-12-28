let Cancion =  require('../models/cancion');

exports.agregarCancion = async (req,res)=>{
    const { nombre, artista, url_video } = req.body;
    const cancion = new Cancion({nombre, artista, url_video});
    try{
        await cancion.save();
        console.log("Cancion Guardada" +cancion)
        res.status(201).json(cancion);
    } catch(err){
        console.error(err);
        res.status(400).json({message: 'Error al guardar cancion'});
    }
};



exports.obtenerCancionAleatoria = async (req, res) => {
    try {
        const count = await Cancion.countDocuments();
        const random = Math.floor(Math.random() * count);
        const cancion = await Cancion.findOne().skip(random);
        res.json(cancion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener canción aleatoria' });
    }
};



exports.obtenerListaCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.find(); 
        if (canciones.length === 0) {
            return res.status(404).json({ message: 'No hay canciones disponibles' });
        }
        res.status(200).json(canciones);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener la lista de canciones' });
    }
};


exports.votarCancion = async (req, res) => {
    try {
        const { songName } = req.body;
        const cancion = await Cancion.findOne({ nombre: songName });
        if (!cancion) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        cancion.votos += 1;
        await cancion.save();
        res.status(200).json({ message: 'Voto registrado correctamente', votos: cancion.votos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al votar por la canción' });
    }
};

