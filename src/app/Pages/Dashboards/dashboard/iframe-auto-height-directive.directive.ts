import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {IFrameComponent, iframeResizer} from 'iframe-resizer';
import {UserService} from "../../../Services/user.service";

@Directive({
  selector: '[appIframeResizer]'
})
export class IFrameResizerDirective implements AfterViewInit, OnDestroy {
  component: IFrameComponent;

  constructor(public element: ElementRef, public userService: UserService) {
  }

  ngAfterViewInit() {
    const components = iframeResizer({
      checkOrigin: false,
      sizeWidth: true,
      //heightCalculationMethod: 'max',
      log: false,
      enablePublicMethods     : true,
      autoResize: true,
      onMessage: (messageData) => {
        let f = this.userService.activeDashboards.find(x => x.iframeUrl == messageData.iframe.src);
        if (f) {
         console.log("Loaded", messageData.iframe.src);
         f.loaded = true;
         this.userService.navEnabled = true;
        }
      }
    }, this.element.nativeElement);

    /* save component reference so we can close it later */
    this.component = components && components.length > 0 ? components[0] : null;
  }

  ngOnDestroy(): void {
    if (this.component && this.component.iFrameResizer) {
      this.component.iFrameResizer.close();
    }
  }
}