require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const rootRoutes = require('./routes/rootRoutes');
const mongoose = require('mongoose');
const discordService = require('./services/discordService');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scatterbrainSMS';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();

const PORT = process.env.PORT || 2341;

app.use(express.json());
app.use(cors());

app.use('/', rootRoutes);
app.use('/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

discordService.registerCommands();
discordService.login();
