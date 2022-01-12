const db = require('../models');

// CREATE
module.exports.createEvent = async (user, { text, title }) => {

    // only authenticated users can create events;
    if (!user) {
        return null;
    }

    try {

        const newEvent = await db.Event.create({
            userId: user.id,
            eventId: event.id,
            title,
            text
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
module.exports.updateEvent = async (user, {id, text, title}) => {

    //only authenticated users can update tehir events
    if(!user)
    {
        return null;
    }

    try {

        await db.Event.update({
            text,
            title
        }, {
            where: {
                id,
                userId: user.id
            }
        })

        return await db.Event.findOne({
            where: {
                id,
                userId: user.id
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
                userId: user.id
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
