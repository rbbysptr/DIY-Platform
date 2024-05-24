class Author {
    constructor(id, fullName, gender) {
        this.id = id;
        this.fullName = fullName;
        this.gender = gender;
    }
    get formatName() {
        return this.gender === "Male" ? `Mr. ${this.fullName}` : `Mrs. ${this.fullName}`;
    }
}

class AuthorDetail extends Author{
    constructor(id, fullName, gender, totalPost = 0, totalVote = 0, averageTime = 0) {
        super(id, fullName, gender);
        this.totalPost = +totalPost;
        this.totalVote = +totalVote;
        this.averageTime = +averageTime;
    }
}

class Post {
    constructor(id, title, difficulty, totalVote) {
        this.id = id;
        this.title = title;
        this.difficulty = difficulty;
        this.totalVote = totalVote;
    }
}

class PostDetail extends Post{
    constructor(id, title, difficulty, totalVote, estimatedTime, description, imageUrl, createdDate, AuthorId, authorName) {
        super(id, title, difficulty, totalVote)
        this.estimatedTime = estimatedTime;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdDate = createdDate;
        this.AuthorId = AuthorId;
        this.authorName = authorName;
    }
    get formatCreatedDate() {
        let date = new Date(this.createdDate);
        return date.toLocaleDateString("en-CA");
    }
}

class Factory{
    static createAuthor(authorData) {
        return new Author(authorData.id, authorData.fullName, authorData.gender);
    }

    static createAuthorDetail(authorDetail) {
        return new AuthorDetail(authorDetail.id, authorDetail.fullName, authorDetail.gender, authorDetail.totalPost, authorDetail.totalVote, authorDetail.averageTime);
    }
    static createPost(postData) {
        return new Post(postData.id, postData.title,postData.difficulty,postData.totalVote);
    };

    static createPostDetail(postDetail) {
        return new PostDetail(postDetail.id, postDetail.title, postDetail.difficulty, postDetail.totalVote, postDetail.estimatedTime, postDetail.description, postDetail.imageUrl, postDetail.createdDate, postDetail.AuthorId, postDetail.authorName);
    }
}

module.exports = Factory;