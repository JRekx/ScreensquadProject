const db = require('../db');

exports.saveFavorite = async (req, res) => {
    const { user_id, movie_id, title, poster_path } = req.body;
    try {
        await db.query(
            'INSERT INTO favorites (user_id, movie_id, title, poster_path) VALUES ($1, $2, $3, $4)',
            [user_id, movie_id, title, poster_path]
        );
        return res.status(201).json({ success: true, message: 'Favorite saved successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getFavorites = async (req, res) => {
    const { user_id } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM favorites WHERE user_id = $1', [user_id]);
        return res.status(200).json({ success: true, favorites: rows });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
