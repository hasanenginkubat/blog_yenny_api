const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dlpdj7m84',
    api_key: '131428898641833',
    api_secret: '2hPnkJORG36wHPc5j7yx3nw9h-g',
    secure: true,
});

module.exports = cloudinary;