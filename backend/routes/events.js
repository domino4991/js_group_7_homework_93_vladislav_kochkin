const router = require('express').Router();
const Event = require('../models/Event');
const auth = require('../auth');

router.get('/', auth, async (req, res) => {
    try {
        const events = await Event
            .find({$or: [{sharedUsers: req.user._id}, {user: req.user._id}]})
            .populate('user', 'email -_id')
            .populate('sharedUsers', 'email -_id');
        if(events.length === 0) return res.status(404).send({error: 'Событий нет'});
        return res.send(events);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const event = new Event({
            title: req.body.title,
            datetime: req.body.datetime,
            user: req.user._id,
            duration: req.body.duration
        });
        await event.save();
        return res.send({message: 'Событие добавлено.'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedEvent = await Event.findById(req.params.id);
        if(!deletedEvent) return res.status(404)
            .send({error: 'Событие не найдено.'});
        if(!deletedEvent.user !== req.user._id) return res.status(401)
            .send({error: 'У вас нет прав на удаление этого события'});
        await Event.deleteOne({_id: deletedEvent._id});
        return res.send({message: 'Событие удалено.'});
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router;