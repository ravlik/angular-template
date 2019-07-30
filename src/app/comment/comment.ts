export class Comment {
    time: Date;

    constructor(public text: string, public comments: Comment[] = []) {
        this.time = new Date();
    }

    addComment(text: string) {
        this.comments.unshift(new Comment(text, []));
    }

    removeComment(comment: Comment) {
        this.comments.splice(this.comments.indexOf(comment), 1);
    }

    search(text): string[] {
        return this.comments.reduce((a, i) => ([...a, ...i.search(text)]), this.text.search(text) >= 0 ? [this.text] : []);
    }
}
