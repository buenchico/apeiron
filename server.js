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
    res.render('application', { title: 'Welcome to My Website', partial: 'index' });
});

app.get('/account', (req, res) => {
    res.render('application', { title: 'Account Page', partil: 'account' });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
