import { Component, OnInit } from '@angular/core';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  text!: string
  textEdit!: string
  img!: File
  selectedId!: string
  posts: IPost[] = []
  constructor(private postSrv: PostService) {
  }
  ngOnInit() {

    this.postSrv.getPosts().subscribe(res => this.posts = res)
  }

  submitPost() {
    this.postSrv.addPost({ text: this.text, url: this.img })
  }

  handleFile(ev: Event) {
    this.img = (ev.target as HTMLInputElement).files![0]
  }

  handleEdit(post: IPost) {
    this.textEdit = post.text
    this.selectedId = post.id
  }
  editPost() {
    this.postSrv.editPost(this.selectedId, this.textEdit)
  }
  deletePost(id:string) {
    this.postSrv.removePost(id)
  }
}
