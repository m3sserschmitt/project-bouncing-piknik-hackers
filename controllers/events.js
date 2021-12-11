const db = require('../models');

module.exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await db.Event.findAll();
    res.send(allEvents);
  } catch (error) {
    console.error('Something went wrong');
    res.send({
      error: "Something went wrong",
    });
  } 
}


module.exports.getEventsById = (req, res) => {
  
}

module.exports.createEvents = async (req, res) => {
  const {
    name,
    address,
    organizer,
    startDate,
    endDate,
  } = req.body

  try {
    const newEvents = await db.Event.create({
        name,
        address,
        organizer,
        startDate,
        endDate,
    });

    res.status(201).send(newEvents);
  } catch (error) {
    console.error(error);
    res.send({
      error: "Something went wrong",
    });
  }
}


module.exports.updateEvents = (req, res) => {
  
}


module.exports.deleteEvents = (req, res) => {
  
}