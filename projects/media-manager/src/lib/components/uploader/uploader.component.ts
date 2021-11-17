import {Component, Input} from "@angular/core";
import {HttpClient, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http'
import {UploaderQueue} from "../../classess/uploader-queue";
import {QueueService} from "../../services/queue.service";

@Component({
  selector: 'xs-uploader',
  templateUrl: './uploader.component.html'
})


export class UploaderComponent {
  @Input() uploadUrl: string
  public queue: UploaderQueue[] = [];
  public processingQueue = [];
  public uploading = false;

  constructor(private http: HttpClient, public queueService: QueueService) {

  }

  onFileInvalids(fileList: Array<File>) {
    //TODO handle invalid files here
  }

  onSelectChange(target) {
    let files: FileList = target.files;
    for (let i = 0; i < files.length; i++) {
      this.queueService.add(new UploaderQueue(files[i]))
    }
    if (this.uploading === false) this.beginUpload();

  }

  beginUpload() {
    for (let f in this.queue) {
      this.upload(this.queue[f].id);
    }
  }

  // upload
  upload(id) {
    if (id == null) return;

    let selectedFile = this.queue.find(s => s.id == id);
    if (selectedFile) {
      const formData = new FormData();
      formData.append('files[]', selectedFile.file);

      const uploadReq = new HttpRequest('POST', this.uploadUrl, formData, {
        reportProgress: true,
      });

      this.http.request(uploadReq).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          selectedFile.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response)
          selectedFile.message = event.body.toString();
        // remove item from queue

      });
    }
  }

  //upload all selected files to server
  uploadAll() {
    //find the remaning files to upload
    let remainingFiles = this.queue.filter(s => !s.isSuccess);
    for (let item of remainingFiles) {
      this.upload(item.id);
    }
  }

  // cancel all
  cancelAll() {
    //TODO
  }
}
