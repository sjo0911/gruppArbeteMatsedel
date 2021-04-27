const mongoose = require('mongoose');

var generateObjectId = function() {
    return mongoose.Types.ObjectId();
}

const MenuSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    meals: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: generateObjectId
            },
            mealName: {
                type: String,
                required: true,
                minlength: 1,
                trim: true
            },
            mealDate: {
                type: Date,
                required: true
            },
            foodSpecs: [
                {
                    type: String
                }
            ]
        }
    ]
})

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = { Menu }