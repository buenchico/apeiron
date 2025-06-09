const express = require('express');
const path = require('path');

const app = express();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure your views are stored in the 'views' folder

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Define routes that render different "main" content
app.get('/', (req, res) => {
    res.render('application', { partial: 'game' });
});

app.get('/:partial', (req, res) => {
    const { partial } = req.params;
    res.render('application', { partial });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
