import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import loginRoutes from './controllers/login.js';
import registerRoutes from './controllers/register.js';
import recipeRoutes from './controllers/recipes.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use(loginRoutes);
app.use(registerRoutes);
app.use(recipeRoutes);


// Setup Multer untuk unggahan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// Rute untuk mengunggah foto profil
app.post('/api/upload-profile-picture', upload.single('profilePic'), (req, res) => {
  res.json({ success: true, message: 'Profile picture uploaded successfully' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
