const router = require('express').Router();
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../auth');

router.get('/', auth, async (req, res) => {
    try {
        let date = new Date().toISOString();
        const allEvents = await Event
            .find({$or: [{sharedUsers: req.user._id}, {user: req.user._id}]})
            .populate('user', 'email -_id')
            .populate('sharedUsers', 'email -_id')
            .lean();
        const events = allEvents
            .filter(event => event.events.map(item => new Date(item.datetime.toString()).toISOString() > date) );
        if(events.length === 0) return res.status(404).send({error: 'Событий нет'});
        return res.send(events);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const events = await Event.findOne({user: req.user._id});
        if(!events) {
            const createEvent = new Event({
                user: req.user._id,
                events: {
                    title: req.body.title,
                    datetime: req.body.datetime,
                    duration: req.body.duration
                }
            });
            await createEvent.save();
        } else {
            await Event
                .findOne({user: req.user._id})
                .populate('events')
                .update({user: req.user._id}, {"$push": {"events": {
                            "$each": [{"title": req.body.title,
                                "datetime": req.body.datetime,
                                "duration": req.body.duration,}],
                            "$sort": {"datetime": 1}

                        }}});
        }
        return res.send({message: 'Событие добавлено.'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/:email', auth, async (req, res) => {
    try {
        const sharedUser = await User.find({email: req.params.email});
        if(!sharedUser) return res.status(404).send({error: 'Такого пользователя нет.'})
        await Event.findOneAndUpdate({user: req.user._id}, {$push: {sharedUsers: sharedUser}});
        return res.send({message: 'Пользователь добавлен к вашему календарю.'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.put('/:email', auth, async (req, res) => {
    try {
        const sharedUser = await User.findOne({email: req.params.email});
        if(!sharedUser) return res.status(404).send({error: 'Такого пользователя нет.'});
        await Event.findOneAndUpdate(
            {user: req.user._id},
            { $pull: { sharedUsers: sharedUser._id}});
        // await event.save();
        return res.send({message: 'Пользователь удалён из вашего списка.'});
    } catch (e) {

    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedEvent = await Event.findOne({user: req.user._id});
        if(!deletedEvent) return res.status(404)
            .send({error: 'Событие не найдено.'});
        if(deletedEvent.user.toString() !== req.user._id.toString()) return res.status(401)
            .send({error: 'У вас нет прав на удаление этого события'});
        await Event
            .findOneAndUpdate({user: req.user._id}, { $pull: { events: { _id: req.params.id }}});
        return res.send({message: `Событие удалено.`});
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router;