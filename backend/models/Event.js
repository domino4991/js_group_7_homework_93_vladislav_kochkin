const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Поле "Событие" не должно быть пустым']
    },
    datetime: {
        type: Date,
        required: [true, 'Выберите дату события.'],
        validate: {
            validator: async (value) => {
                const dateNow = new Date().toISOString();
                if(value < dateNow) return false;
            },
            message: "Вы не можете создать событие в прошедшем времени."
        }
    },
    duration: {
        type: String,
        required: [true, 'Дедлайн обязателен для заполнения']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sharedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
});



const Event = mongoose.model('Event', EventSchema);

module.exports = Event;