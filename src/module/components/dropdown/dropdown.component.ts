import { SelectComponent } from './../select/select.component';
import { Component, Injectable, Input, ElementRef, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import {
    trigger,
    state,
    transition,
    animate,
    style,
    AnimationEvent
} from '@angular/animations';

@Component({
    selector: 'ino-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    animations: [
        trigger('openDropDown', [
            state('closed', style({
                transform: 'scale(0)',
                transformOrigin: '{{origin}}',
                opacity: 0
            }), { params: { origin: 'top right' } }),
            state('open', style({
                transform: 'scale(1)',
                transformOrigin: '{{origin}}',
                opacity: 1
            }), { params: { origin: 'top right' } }),
            transition('closed => open', animate('300ms ease-in-out')),
            transition('open => closed', animate('300ms ease-in-out'))
        ]),
    ],
    providers: [
        { provide: 'SELECT_PARENT_COMPONENT', useExisting: SelectComponent }
    ],
})
@Injectable()
export class DropdownComponent {
    public state = 'closed';
    @ViewChild('dropDown') public dropDown: TemplateRef<any>;
    @Input() public showArrow = true;
    @Input() public animationOrigin = 'top right';
    @Input() public closeOnClick = true;
    @Output() public close = new EventEmitter<void | 'click' | 'keydown'>();

    public toggleDropDown() {
        this.state = this.state === 'closed' ? 'open' : 'closed';
    }

    public closeDropDown(force: boolean = false) {
        if (force) {
            this.state = 'closed';
        }
        if (this.state === 'open' && this.closeOnClick) {
            this.state = 'closed';
        }
    }

    /** Callback that is invoked when the panel animation completes. */
    public onAnimationDone(event: AnimationEvent) {
        // After the initial expansion is done, trigger the second phase of the enter animation.
        if (event.toState === 'closed' && event.fromState === 'open') {
            this.close.emit();
        }
    }
}
