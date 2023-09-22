import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { BehaviorSubject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts = new BehaviorSubject<IPost[]>([])
  constructor(private db: Firestore, private fileStorage: Storage) { }

  getPosts() {
    const dbCollection = collection(this.db, "/posts")
    collectionData(dbCollection, { idField: 'id' }).subscribe(res => {
      this.posts.next(res as IPost[])
      console.log(res)
    })
    return this.posts.asObservable()
  }

  addPost(newPost: Partial<IPost>) {
    const fileStorageRef = ref(this.fileStorage, (newPost.url as File).name)
    uploadBytes(fileStorageRef, newPost.url as File).then(res => {

      return getDownloadURL(fileStorageRef)
    }).then(url => {
      const dbCollection = collection(this.db, "/posts")
      addDoc(dbCollection, { text: newPost.text, url })
    })
  }

  editPost(id: string, newText: string) {
    const docRef = doc(this.db, `/posts/${id}`)
    updateDoc(docRef, { text: newText })
  }

  removePost(id: string) {
    const docRef = doc(this.db, `/posts/${id}`)
    deleteDoc(docRef)
  }
}
