import {Guid} from "guid-typescript";

export class UploaderQueue {
  id: string;
  file: File;
  progress: number;
  message: string;
  isCancel: boolean;
  isError: boolean;

  get isSuccess(): boolean {
    if (this.progress == 100)
      return true;

    return false;
  };

  constructor(file: File) {
    this.file = file;
    this.progress = 0;
    this.id = Guid.create().toString();
    this.message = '';
    this.isCancel = false;
    this.isError = false;
  }
}
