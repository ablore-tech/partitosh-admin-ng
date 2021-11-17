import {Injectable} from '@angular/core';
import {UploaderQueue} from "../classess/uploader-queue";

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  public queue: UploaderQueue[] = []

  constructor() {
  }

  add(item: UploaderQueue) {
    this.queue.push(item)
  }

  remove(id: string) {
    this.queue.filter((item: UploaderQueue) => item.id !== id);
  }

  removeAll() {
    this.queue = [];
  }
}
