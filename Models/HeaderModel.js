import mongoose from "mongoose";


const headerSchema = mongoose.Schema(
    {

        headerImage: { type: String, required: true, },

        headerTitle: { type: String, required: true, },
        
    }, 

    {
        timestamps: true,
    }

);


const Header = mongoose.model('Header', headerSchema);

export default Header;