import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'ino-button',
    templateUrl: 'button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() public color: string;
    @Input() public disabled: boolean;
    @Input() public isIconButton = false;
    @Input() public fillContainer = false;
    @Input() public fillWidth = false;
    @Input() public wrap = false;

    public getFill() {
        if (this.fillContainer) {
            return '1 1 100%';
        } else {
            return '';
        }
    }
}
