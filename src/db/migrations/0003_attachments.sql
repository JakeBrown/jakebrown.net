CREATE TABLE IF NOT EXISTS attachments (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    postId integer NOT NULL,
    filename TEXT NOT NULL,
    r2key TEXT UNIQUE NOT NULL,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);