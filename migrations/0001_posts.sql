-- Migration number: 0001 	 2025-03-30T03:22:30.850Z
CREATE TABLE IF NOT EXISTS posts (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft', 
    slug TEXT UNIQUE NOT NULL, 
    title TEXT NOT NULL, 
    introContent TEXT NOT NULL, 
    moreContent TEXT, 
    date TEXT NOT NULL
    );