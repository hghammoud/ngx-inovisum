import { Component, Injectable, ElementRef, Renderer2 } from '@angular/core';
@Component({
    selector: 'ino-leftmenu',
    templateUrl: 'leftmenu.component.html',
    styleUrls: ['./leftmenu.component.scss'],
})
@Injectable()
export class LeftMenuComponent {
    public state = 'closed';

    constructor(private renderer: Renderer2) { }
    /**
     * toggles menu in 3 states
     */
    public toggleMenu() {
        switch (this.state) {
            case 'closed':
                this.state = 'slim';
                break;
            case 'slim':
                this.state = 'open';
                break;
            default:
                this.state = 'closed';
                break;
        }
    }

    public setClass(container: ElementRef) {
        this.renderer.removeClass(container, 'closed');
        this.renderer.removeClass(container, 'slim');
        this.renderer.removeClass(container, 'open');
        this.renderer.addClass(container, this.state);
    }

}
