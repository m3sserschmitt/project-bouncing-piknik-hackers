const db = require('../models');

module.exports.getAllComents = async (req, res) => {
  try {
    const allComents = await db.Coments.findAll();
    res.send(allComents);
  } catch (error) {
    console.error('Something went wrong');
    res.send({
      error: "Something went wrong",
    });
  } 
}


module.exports.getComentsById = (req, res) => {
    const comentsId = req.params.id;
    try{
        const coments = await db.coments.findByPk({
            id: comentsId,
        });
        res.send(coments);
    }catch (error) {
        console.error('Something went wrong');
        res.send({
          error: "Something went wrong",
        });
      } 
}

module.exports.createComents = async (req, res) => {
  const {
        likes,
        text
  } = req.body

  try {
    const newComents = await db.Coments.create({
        likes,
        text
    });

    res.status(201).send(newComents);
  } catch (error) {
    console.error(error);
    res.send({
      error: "Something went wrong",
    });
  }
}


module.exports.updateComents = (req, res) => {
  
}


module.exports.deleteComents = (req, res) => {
  
}