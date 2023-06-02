import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  title: string = 'List of posts';
  messagePost: string = 'Message post';

  postParentMessage: string = 'Message post parent';

  @Input() fromParent: string = '';
}
