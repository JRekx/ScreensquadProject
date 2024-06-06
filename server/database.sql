Create table users(
    user_id serial primary key,
    email varchar(255) unique not null,
    password varchar(255) not null,
    created_at date default current_date, 

);

CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    poster_path VARCHAR(255) NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE
);