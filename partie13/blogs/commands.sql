CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title) 
VALUES ('Example Author', 'https://example.com', 'Example Title 1'), 
       ('Example Author', 'https://example.com', 'Example Title 2');