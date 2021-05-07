const mongoose = require('mongoose');

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
                type : String,
                required: true,
                minlength: 1,
                trim: true
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