
const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    schools: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId
                // default: generateObjectId
            },
            name: {
                type: String,
                required: true,
                minlength: 1,
                trim: true
            },
            _menuId: {
                type: mongoose.Types.ObjectId
            }
        }
    ]
})

const District = mongoose.model('District', DistrictSchema);

module.exports = { District }