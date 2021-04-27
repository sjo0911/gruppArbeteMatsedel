
const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
    districtName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    schools: [
        {
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