const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sharedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    events: [{
        title: {
            type: String,
            required: [true, 'Поле "Событие" не должно быть пустым']
        },
        datetime: {
            type: Date,
            required: [true, 'Выберите дату события.']
        },
        duration: {
            type: String,
            required: [true, 'Дедлайн обязателен для заполнения']
        },
    }]
});



const Event = mongoose.model('Event', EventSchema);

module.exports = Event;