import { SafeUrl } from "@angular/platform-browser";

export interface ImagePayload {
    file: File,
    url: SafeUrl
}