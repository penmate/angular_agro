import { Directive, HostBinding, HostListener, Output } from '@angular/core';
import { ImagePayload } from './image/image.payload';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<ImagePayload> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#737373";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";

    let imagePayload: ImagePayload;
    let file: any;
    file = evt.dataTransfer?.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));

    imagePayload = {
      file,
      url
    }

    this.files.emit(imagePayload);
  }

}
