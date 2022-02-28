const mongoose = require("mongoose");

//Define the schema for menu items
const menuitemSchema = mongoose.Schema({
    item : {type: String, require},
    sizes : [],
    prices : [],
    category : {type: String, require},
    imageURL : {type: String, require},
    description : {type: String, require}
} , {
    timestamps: true,
    collection: 'ramenkingmenu'
})

const menuitemModel = mongoose.model('ramenkingmenu' , menuitemSchema);

module.exports = menuitemModel;