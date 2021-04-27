
const mongoose = require('mongoose');

var generateObjectId = function() {
    return mongoose.Types.ObjectId();
}

const DistrictSchema = new mongoose.Schema({
    districtName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    schools: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: generateObjectId
            },
            schoolName: {
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