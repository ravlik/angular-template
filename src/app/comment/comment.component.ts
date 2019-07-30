import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from './comment';

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
    @Output()
    delete = new EventEmitter();

    @Input()
    comment: Comment;

    @Input()
    showDelete: boolean = true;

    @Input()
    showSubComment: boolean = true;

    text: string;

    send() {
        this.comment.addComment(this.text);
    }

    handleClick() {
        this.delete.emit();
    }

    deleteComment(item) {
        this.comment.removeComment(item);
    }
}
