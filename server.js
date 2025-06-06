const express = require('express');
const path = require('path');

const app = express();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure your views are stored in the 'views' folder

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Define a route that renders an EJS template
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to My Website' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
