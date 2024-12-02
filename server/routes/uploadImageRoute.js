const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'dpkjowk3l',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Configure Multer storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ecommerce-images',
        allowed_formats: ['jpg', 'png', 'webp'],
    },
});

const upload = multer({ storage });

async function getAllImages() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            resource_type: 'image',
            max_results: 500
        });

        return result.resources.map(resource => ({
            public_id: resource.public_id,
            url: resource.secure_url,
            created_at: resource.created_at,
            width: resource.width,
            height: resource.height
        }));
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}


// Upload Image Route
// router.post('/upload', async (req, res) => {
//     try {
//         const imagePath = path.resolve(__dirname, './images/sofa2.jpg');
//         const results = await cloudinary.uploader.upload(imagePath);

//         const url = cloudinary.url(results.public_id, {
//             transformation: [
//                 {
//                     quality: 'auto',
//                     fetch_format: 'auto'
//                 },
//                 {
//                     width: 1200,
//                     height: 1200,
//                     crop: 'fill',
//                     gravity: 'auto',
//                 }
//             ]
//         });

//         res.json({
//             imageUrl: url,
//             publicId: results.public_id
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Upload failed', error: error.message });
//     }
// });

// Get Image Route

router.get('/images', async (req, res) => {
    const images = await getAllImages();
    res.json(images);
});
// router.get('/image/:public_id', (req, res) => {
//     const { public_id } = req.params;

//     const url = cloudinary.url(public_id, {
//         transformation: [
//             {
//                 quality: 'auto',
//                 fetch_format: 'auto',
//             },
//             {
//                 width: 1200,
//                 height: 1200,
//                 crop: 'fill',
//                 gravity: 'auto',
//             },
//         ],
//     });

//     res.json({ imageUrl: url });
// });

module.exports = router;