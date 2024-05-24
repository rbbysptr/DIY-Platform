const pool = require("../config/connection");
const Factory = require("./class");

class Model {
  static async readAuthors() {
    let query = `
        SELECT * FROM "Authors"
        `;
    let result = await pool.query(query);
    let authors = result.rows;
    let instances = authors.map((element) => {
      return Factory.createAuthor(element);
    });
    return instances;
  }
  static async AuthorsDetail() {
    let query = `
        SELECT
          a.id,
          a."fullName",
          a.gender,
          CAST(COUNT(p."AuthorId") as integer) as "totalPost",
          CAST(SUM(p."totalVote") as integer) as "totalVote",
          CAST(ROUND(AVG(p."estimatedTime"), 1) as float8) as "averageTime"
        FROM
          "Authors" a
        LEFT JOIN
          "Posts" p
        ON
          a.id = p."AuthorId"
        GROUP BY
          a.id
        ORDER BY
          a.id
      `;
    let result = await pool.query(query);
    let authorsDetail = result.rows;
    let instances = authorsDetail.map((element) => {
      return Factory.createAuthorDetail(element);
    });
    return instances;
  }
  static async readPosts(search) {
    let query = `
    SELECT
      "id",
      "title",
      "difficulty",
      "totalVote"
    FROM
      "Posts"
    `;
    if (search) {
      query += `WHERE "title" ILIKE '%${search}%'`;
    }
    query += `ORDER BY "totalVote" DESC`;
    
    let result = await pool.query(query);
    let dataPosts = result.rows;

    let instances = dataPosts.map((el) => {
      return Factory.createPost(el);
    });
    return instances;
  }
  static async getPostDetail(id) {
    let query = `
    SELECT p.*,
    a."fullName"
    FROM
    "Posts" p
    INNER JOIN
      "Authors" a
    ON
     p."AuthorId" = a."id"
    WHERE
      p.id = ${id}
    `;
    let result = await pool.query(query);
    let dataPostsDetail = result.rows;

    let instances = dataPostsDetail.map((el) => {
      return Factory.createPostDetail(el);
    });
    return instances[0];
  }
  static async postsAdd(dataPost) {
    let validate = Model.validate(dataPost);
    if (validate.length > 0) throw validate;
    let query = `
    INSERT INTO "Posts"
    ("title","difficulty","estimatedTime","description","totalVote","imageUrl","createdDate","AuthorId")
    VALUES ($1,$2,$3,$4,'0',$5,$6,$7)`;
    let values = [
      dataPost.title,
      dataPost.difficulty,
      dataPost.estimatedTime,
      dataPost.description,
      dataPost.imageUrl,
      dataPost.CreatedDate,
      dataPost.author
    ];
    await pool.query(query, values);
    return validate;
  }

  static async postEditPost(id, dataPost) {
    let validate = Model.validate(dataPost);
    if (validate.length > 0) throw validate;
    let query = `
    UPDATE "Posts"
    SET
    "title" = '${dataPost.title}',
    "difficulty" = '${dataPost.difficulty}',
    "estimatedTime" = '${dataPost.estimatedTime}',
    "description" = '${dataPost.description}',
    "imageUrl" = '${dataPost.imageUrl}',
    "createdDate" = '${dataPost.CreatedDate}',
    "AuthorId" = ${dataPost.author}
    WHERE "id" = ${id}
    `;
    await pool.query(query);
    return validate;
  }

  static async deletePosts(id) {
    let query = `
    DELETE FROM "Posts"
    WHERE "id" = ${id}`;
    await pool.query(query);
  }
  static async votePosts(id) {
    let query = `
    UPDATE "Posts"
    SET
    "totalVote" = (SELECT "totalVote" + 1 AS "totalVote"
    FROM "Posts" p
    WHERE "id" = ${id})
    WHERE "id" = ${id}`;
    await pool.query(query);
  }
  static validate(dataPost) {
    let error = [];

    if (!dataPost.title) {
      error[0]=("Title is required.");
    } else if (dataPost.title.length > 100) {
      error[0]=("Title maximum character is 100.");
    }
    if (dataPost.author === "Choose..." || dataPost.author === "") {
      error[1]=("Author is required.");
    }
    if (
      dataPost.difficulty === "Choose..." ||
      dataPost.difficulty === ""
    ) {
      error[2]=("Difficulty is required.");
    }
    if (!dataPost.estimatedTime) {
      error[3]=("Time is required.");
    } else if (+dataPost.estimatedTime < 5) {
      error[3]=("Minimum estimated time is 5 minute.");
    }
    if (!dataPost.imageUrl) {
      error[4]=("ImageURL is required");
    } else if (dataPost.imageUrl.length > 100) {
      error[4]=("Image Url name maximum character is 100.");
    }
    if (!dataPost.CreatedDate) {
      error[5]=("Created Date is required");
    } else {
      let inputDate = new Date(dataPost.CreatedDate);
      let dateNow = new Date();
      if (dateNow > inputDate) {
        error[5]=("Maximum created date is today.");
      }
    }
    if (!dataPost.description) {
      error[6]=("Description is required.");
    } else if (dataPost.description.trim().split(" ").length < 10) {
      error[6]=("Minimum word in description is 10.");
    }
    
    return error;
  }


}

module.exports = Model;