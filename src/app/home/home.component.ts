import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment/comment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: [`
        comment {
            width: 95vw;
            margin: 20px;
        }

        input {
            margin: 40px auto !important;
            display: block;
            padding: 10px;
            border-radius: 5px;
            border: none;
        }


        .title-wrapper {
            display: flex;
            justify-content: space-between;
            background: #8080806e;
            align-items: center;
            padding: 10px 16px;
            border-radius: 5px;
            margin-bottom: 10px;

        button {
            color: red;
            width: auto;
        }
        }

    `],
})
export class HomeComponent implements OnInit {
    comment: Comment;
    comments: Comment[];

    private _text: string;

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
        this.handleInputChange(value);
    }

    ngOnInit(): void {
        this.comment = new Comment('Test 1', [
            new Comment('Test 2'),
            new Comment('Test 3', [new Comment('Test 4'), new Comment('Test 5')]),
            new Comment('Test 6', [new Comment('Test 7'), new Comment('Test 8')]),
            new Comment('Test 9', [new Comment('Test 0')]),
        ]);
    }

    handleInputChange(event) {
        this.comments = this.comment.search(event).map(i => new Comment(i));
    }
}
