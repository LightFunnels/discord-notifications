const express = require('express')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const channelRoutes = require('./routes/channelRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const app = express()
const port = 3000

// allow cors
const cors = require('cors');
const frontendURL = process.env.FRONTEND_URL;
const corsOptions = {
    origin: frontendURL,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/channels', channelRoutes);
app.use('/webhook', webhookRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})