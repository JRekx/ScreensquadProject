const { config } = require("dotenv");
config();

module.exports = {
    PORT: process.env.PORT || 8000,
    SERVER_URL: process.env.SERVER_URL || 'http://localhost:8000',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    SECRET: process.env.SECRET || "SECRET",
};
