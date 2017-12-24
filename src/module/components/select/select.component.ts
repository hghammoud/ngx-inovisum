import { InoComponent } from './../ino.component';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { DropdownComponent } from './../dropdown/dropdown.component';
import {
    Injectable, Component, Input, ContentChildren, QueryList, AfterContentInit,
    OnInit, Output, EventEmitter, HostBinding, ViewEncapsulation
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelect } from '@angular/material';
import { fadeInContent, transformPanel } from '@angular/material/';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MAT_OPTION_PARENT_COMPONENT } from '@angular/material/core';
import {
    animate,
    AnimationTriggerMetadata,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const SELECT_MULTIPLE_PANEL_PADDING_X = 0;

@Component({
    selector: 'ino-select',
    templateUrl: 'select.component.html',
    styleUrls: ['./select.component.scss'],
    exportAs: 'matSelect',
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    animations: [
        trigger('transformPanel', [
            state('showing', style({
                opacity: 1,
                minWidth: 'calc(100% + 32px)',
                transformOrigin: 'top right',
                transform: 'scale(1)'
            })),
            state('showing-multiple', style({
                opacity: 1,
                right: '-3.8rem',
                top: '-2.5rem',
                position: 'absolute',
                minWidth: 'calc(100%)',
                transformOrigin: 'top right',
                transform: 'scale(1)'
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                    minWidth: '100%',
                    transformOrigin: 'top right',
                    transform: 'scale(0)'
                }),
                animate('300ms ease-in-out')
            ]),
            transition('* => void', [
                animate('300ms ease-in-out', style({ opacity: 0 }))
            ])
        ]),
        fadeInContent
    ],
    providers: [
        { provide: MatFormFieldControl, useExisting: SelectComponent },
        { provide: MAT_OPTION_PARENT_COMPONENT, useExisting: SelectComponent }
    ],
})
@Injectable()
export class SelectComponent extends MatSelect {
    public cdkpositions = [
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
        },
        {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
        },
    ];
}
