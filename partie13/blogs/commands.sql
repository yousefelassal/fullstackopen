CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title) 
VALUES ('Albert Camus', 'https://www.amazon.com/Stranger-Albert-Camus/dp/0679720200', 'Albert Camus'), 
       ('George Orwell', 'https://www.amazon.com/1984-George-Orwell/dp/1443434973', '1984');