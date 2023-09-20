import { BehaviorSubject } from "rxjs";
const newPost = new BehaviorSubject(false);
export const newPostObs = newPost.asObservable();
export const setNewPost = (val) => newPost.next(val);
