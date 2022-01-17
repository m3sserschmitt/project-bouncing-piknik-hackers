const db = require('../models');

// CREATE
module.exports.createEvent = async (user, { name, address, description, startDate, endDate }) => {

    // only authenticated users can create events;
    if (!user) {
        return null;
    }

    console.log({ name, address, description, startDate, endDate })

    try {

        const newEvent = await db.Event.create({
            userId: user.id,
            name,
            address,
            description,
            organizerId: user.id,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        });

        return newEvent;

    } catch (error) {

        console.log('Error on creating new event: ', error);
        return null;
    }
}

//READ 
module.exports.getAllEvents = async () => {

    try {

        return await db.Event.findAll();

    } catch (error) {

        console.error('Error on querying database for events: ', error);

        return null;
    }
}

module.exports.getEventById = async (id) => {

    try {

        return await db.Event.findByPk(id);

    } catch (error) {

        console.error('Error on querying database for event: ', error);
        return null;
    }
}

// UPDATE
module.exports.updateEvent = async (user, {id, name, address, description, startDate, endDate}) => {

    console.log({name, address, description, startDate, endDate})
    //only authenticated users can update their events
    if(!user)
    {
        return null;
    }

    try {

        await db.Event.update({
            name, 
            address, 
            description, 
            startDate, 
            endDate
        }, {
            where: {
                id,
                organizerId: user.id
            }
        })

        return await db.Event.findOne({
            where: {
                id,
                organizerId: user.id
            }
        });

    } catch (error) {

        console.error('Error on updating event with provided id: ', error);

        return null;
    }
}

// DELETE
module.exports.deleteEvent = async (user, id) => {

    // only authenticated users can delete their events
    if(!user)
    {
        return null;
    }

    try {

        const event = await db.Event.findOne({
            where: {
                id,
                organizerId: user.id
            }
        })

        if(!event)
        {
            return null;
        }

        await event.destroy();

        return event;

    } catch (error) {

        console.error('Error on deleting event: ', error);
        return null;
    }
}
