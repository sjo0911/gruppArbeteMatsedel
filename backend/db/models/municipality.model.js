const mongoose = require('mongoose');

const MunicipalitySchema = new mongoose.Schema({
    municipality: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    schools: [{
        schoolName: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        _menuId: {
            type: mongoose.Types.ObjectId
        }
    }]
})

const Municipality = mongoose.model('Municipality', MunicipalitySchema);

module.exports = { Municipality }