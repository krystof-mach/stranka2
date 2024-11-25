const path = require('path');
const fs = require('fs');

const uploadsPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsPath))
    fs.mkdirSync(uploadsPath);