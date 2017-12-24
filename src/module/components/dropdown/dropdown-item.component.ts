import { Component, Injectable, Input } from '@angular/core';

@Component({
    selector: 'ino-dropdown-item',
    templateUrl: 'dropdown-item.component.html',
    styleUrls: ['./dropdown-item.component.scss'],
})
@Injectable()
export class DropdownItemComponent {
    @Input() public color: string;
}
