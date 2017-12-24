import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'ino-tag',
    templateUrl: 'tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent {
    @Input() public color: string;
}
