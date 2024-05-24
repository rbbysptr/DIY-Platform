const pool = require("../config/connection");

let authorsData = require("../data/authors.json").map((el) => {
    return `('${el.fullName}','${el.gender}')`;
}
).join(", ");

let postsData = require("../data/posts.json").map((el) => {
    return `('${el.title}','${el.difficulty}','${el.estimatedTime}','${el.description}',${el.totalVote},'${el.imageUrl}','${el.createdDate}',${el.AuthorId})`;
});

let authorsQuery = `INSERT INTO "Authors" ("fullName","gender") values ${authorsData}`;
let postsQuery = `INSERT INTO "Posts"("title","difficulty","estimatedTime","description","totalVote","imageUrl","createdDate","AuthorId") VALUES ${postsData}`;


async function seeder() {
    try {
        let authorResult = await pool.query(authorsQuery);
        if (authorResult) console.log(`seed table Authors success`);
        let postResult = await pool.query(postsQuery);
        if (postResult) console.log(`seed table Posts success`);
    } catch (error) {
        console.error(error);
    }
}
seeder();