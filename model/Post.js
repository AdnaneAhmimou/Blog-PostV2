const user = require('./User');
class Post {
    static id = 0;

    constructor(userId, title, content) {
        this.id = ++Post.id;
        this.userId = userId; 
        this.title = title;
        this.content = content;
        this.date = new Date().toLocaleString();
    }
}

module.exports = Post;