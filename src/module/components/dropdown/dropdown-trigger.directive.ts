import { Subscription } from 'rxjs/Subscription';
import { DropdownComponent } from './dropdown.component';
import {
    Directive, ElementRef, Input, HostListener, ViewContainerRef,
    Output, EventEmitter, OnDestroy, AfterContentInit
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    OverlayRef,
    Overlay,
    ConnectedPositionStrategy,
    HorizontalConnectionPos,
    VerticalConnectionPos,
    OverlayConfig
} from '@angular/cdk/overlay';

@Directive({ selector: '[dropDownTriggerFor]' })
export class DropDownTriggerDirective implements OnDestroy, AfterContentInit {
    @Input('dropDownTriggerFor') public dropDownTriggerFor: DropdownComponent;
    @Input('xOrigin') public xOrigin: HorizontalConnectionPos = 'end';
    @Input('yOrigin') public yOrigin: VerticalConnectionPos = 'top';
    @Input('overTrigger') public overTrigger = false;
    /** Event emitted when the associated menu is opened. */
    @Output() public onMenuOpen = new EventEmitter<void>();

    /** Event emitted when the associated menu is closed. */
    @Output() public onMenuClose = new EventEmitter<void>();

    private _portal: TemplatePortal<any>;
    private _overlayRef: OverlayRef | null = null;
    private _menuOpen = false;
    private _closeSubscription = Subscription.EMPTY;
    constructor(private _overlay: Overlay, private _element: ElementRef, private _viewContainerRef: ViewContainerRef) {
    }

    public ngAfterContentInit() {
        this.dropDownTriggerFor.close.subscribe(() => {
            this._overlayRef.detach();
            this._closeSubscription.unsubscribe();
            this._setIsMenuOpen(false);
        });
    }
    public ngOnDestroy() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }

        this._closeSubscription.unsubscribe();
    }

    @HostListener('click', ['$event']) public onClick(event: any) {
        this.toggleMenu();
        event.stopPropagation();
    }

    /** Toggles the menu between the open and closed states. */
    private toggleMenu(): void {
        return this._menuOpen ? this.closeMenu() : this.openMenu();
    }

    /** Opens the menu. */
    private openMenu(): void {
        if (!this._menuOpen) {
            this._createOverlay().attach(this._portal);
            this._closeSubscription = this._menuClosingActions().subscribe(() => {
                this.closeMenu();
            });
            this._setIsMenuOpen(true);
            this.dropDownTriggerFor.toggleDropDown();
        }
    }

    /** Closes the menu. */
    private closeMenu(): void {
        if (this._overlayRef && this._menuOpen) {
            this.dropDownTriggerFor.closeDropDown(true);
        }
    }

    private _createOverlay(): OverlayRef {
        if (!this._overlayRef) {
            this._portal = new TemplatePortal(this.dropDownTriggerFor.dropDown, this._viewContainerRef);
            const config = this._getOverlayConfig();
            this._overlayRef = this._overlay.create(config);
        }

        return this._overlayRef;
    }

    // set state rather than toggle to support triggers sharing a menu
    private _setIsMenuOpen(isOpen: boolean): void {
        this._menuOpen = isOpen;
        this._menuOpen ? this.onMenuOpen.emit() : this.onMenuClose.emit();
    }

    /** Returns a stream that emits whenever an action that should close the menu occurs. */
    private _menuClosingActions() {
        const backdrop = this._overlayRef!.backdropClick();
        return backdrop;
    }

    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    private _getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this._getPosition(),
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }

    private _getPosition(): ConnectedPositionStrategy {
        const [originX, originFallbackX]: HorizontalConnectionPos[] = [this.xOrigin, 'start'];
        const [overlayY, overlayFallbackY]: VerticalConnectionPos[] = [this.yOrigin, 'bottom'];

        let [originY, originFallbackY] = [overlayY, overlayFallbackY];
        const [overlayX, overlayFallbackX] = [originX, originFallbackX];

        let offsetY = 0;
        let offsetX = 0;
        if (!this.overTrigger) {
            offsetY = 10;
            originY = overlayY === 'top' ? 'bottom' : 'top';
            originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
        }

        if (this.xOrigin === 'end') {
            offsetX = -10;
        }

        return this._overlay.position()
            .connectedTo(this._element, { originX, originY }, { overlayX, overlayY }).withOffsetY(offsetY).withOffsetX(offsetX);
    }
}
