const Gallery = require('../models/gallery');

// Get all Images
const AllImages = async (req, res) => {

    try {

        const gallery = await Gallery.find();

        return res.json({ success: gallery });
    } catch(err) {
        return res.json({ error: 'Server side error - fetching gallery' });
    }
};

module.exports = {
    AllImages
}