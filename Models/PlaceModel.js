import mongoose from "mongoose";


const placeSchema = mongoose.Schema(
    {
    
        name: { type: String, required: true, unique: true },

        image: { type: String, required: true, },

        description: { type: String, required: true, },

        category: { type: String, required: true, },

        price: { type: Number, required: true, },
        
    }, 

    {
        timestamps: true,
    }

);


const Place = mongoose.model('Place', placeSchema);

export default Place;