const pool = require("../config/connection");

let dropTable = `DROP TABLE IF EXISTS "Posts", "Authors"`;

let queryAuthors = `
        CREATE TABLE IF NOT EXISTS "Authors"(
            "id" SERIAL PRIMARY KEY,
            "fullName" VARCHAR(120) NOT NULL,
            "gender" VARCHAR(6) NOT NULL
        );
    `;

let queryPosts = `
        CREATE TABLE IF NOT EXISTS "Posts" (
            "id" SERIAL PRIMARY KEY,
            "title" VARCHAR(100),
            "difficulty" VARCHAR(6),
            "estimatedTime" INTEGER,
            "description" TEXT,
            "totalVote" INTEGER,
            "imageUrl" VARCHAR(100),
            "createdDate" DATE,
            "AuthorId" INTEGER REFERENCES "Authors"("id")
        );
    `;


async function migration() {
    try {
        let drop = await pool.query(dropTable);
        if (drop) console.log(`Success drop table`);
        let AuthorsResult = await pool.query(queryAuthors);
        if (AuthorsResult) console.log(`succes create table Authors`);
        let PostsResult = await pool.query(queryPosts);
        if(PostsResult) console.log(`success create table Posts`)
    } catch (error) {
        console.error(error);
    }
}

migration();
