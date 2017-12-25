import { LanguageService } from './../../components/language-picker/language.service';
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from './../../components/notification/notification.service';
import { Observable } from 'rxjs/Observable';
import { AlertService } from './../../components/alert/alert.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RolesService } from './../../services/roles.service';
import { Language } from './../../components/language-picker/language';
import { Page, PageableSearchQuery, Sort } from './../../services/pagination';
import { User, UserDTO } from './../../typings/jhipster';
import { createPageableSearchQuery, extractPage } from './../../shared/request-utils';
import { UsersAbstractService } from './../../services/users.service';
import { AuthAbstractService } from './../../services/auth.service';
import { TableColumn, TableSortAction } from './../../components/table/table';
import { Component, OnInit, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/operator/first';

@Component({
    selector: 'ino-admin-users',
    templateUrl: 'users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    public loading = false;
    public columns: TableColumn[];
    public showRowTemplate: EventEmitter<{ template: TemplateRef<any>, row: any }> = new EventEmitter();
    public hideRowTemplate: EventEmitter<any> = new EventEmitter();
    public users: UserDTO[];
    public languages: Language[];
    public page: Page;
    public pageSize = 25;

    @ViewChild('languageTemplate') private languageTemplate: TemplateRef<any>;
    @ViewChild('actionTemplate') private actionTemplate: TemplateRef<any>;
    @ViewChild('profilesTemplate') private profilesTemplate: TemplateRef<any>;
    @ViewChild('statusTemplate') private statusTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') private editTemplate: TemplateRef<any>;

    private userForm: FormGroup;
    private _activerow: any;

    private rolesList: string[];
    constructor(
        private usersService: UsersAbstractService,
        private rolesService: RolesService,
        private languageService: LanguageService,
        private authService: AuthAbstractService,
        private notificationService: NotificationService,
        private translateService: TranslateService,
        private alertService: AlertService) {
    }

    public ngOnInit() {
        this.languages = this.languageService.getLanguages();
        this.columns = [
            {
                name: 'global.form.username', key: 'login', type: 'string', show: true,
                minWidth: '15rem', fontWeight: '500', autogrow: true, sortable: true
            },
            {
                name: 'global.form.status', key: 'activated', type: 'string', show: true,
                minWidth: '10rem', template: this.statusTemplate, sortable: true
            },
            {
                name: 'global.form.email', key: 'email', type: 'string', show: true,
                minWidth: '20rem', sortable: true
            },
            {
                name: 'global.form.profiles', key: 'authorities', type: 'string', show: true,
                minWidth: '25rem', template: this.profilesTemplate, sortable: true
            },
            {
                name: 'global.language', key: 'langKey', type: 'string', show: true,
                minWidth: '10rem', template: this.languageTemplate, sortable: true, centerHeader: true
            },
            {
                name: '', key: '', type: 'string', show: true,
                minWidth: '4rem', template: this.actionTemplate, sortable: false
            },
        ];
        const params = new HttpParams().set('query', '');
        const query = createPageableSearchQuery(params, 0, this.pageSize);
        this.triggerSearch(query);
        this.loadRoles();

        this.userForm = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            authorities: new FormControl(),
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    public loadPage(pageNumber: number) {
        const params = new HttpParams().set('query', '');
        const query = createPageableSearchQuery(params, pageNumber, this.pageSize);
        this.triggerSearch(query);
    }

    public sortPage(sortAction: TableSortAction) {
        const sort: Sort = { property: sortAction.key, direction: sortAction.type };
        const params = new HttpParams().set('query', '');
        const query = createPageableSearchQuery(params, this.page.currentPage, this.pageSize, [sort]);
        this.triggerSearch(query);
    }

    public triggerSearch(query: PageableSearchQuery) {
        this.usersService.getAll(query).first().subscribe((result) => {
            this.users = result.body;
            this.page = extractPage(result);
        });
    }

    // We create a deep copy of the user object in case an error occured
    // this way the form model does not change
    // upon success the page will be reloaded and the data will be updated
    public saveUser(user: UserDTO) {
        const userCopy = _.cloneDeep(user);
        userCopy.firstName = this.userForm.value.firstName;
        userCopy.lastName = this.userForm.value.lastName;
        userCopy.email = this.userForm.value.email;
        userCopy.authorities = this.userForm.value.authorities;
        this.usersService.update(userCopy).subscribe((result) => {
            this.loadPage(this.page.currentPage);
            this.notificationService.success(
                { message: this.translateService.instant('users.message.saved', { username: user.login }) });
        });
    }

    public getIcon(language: string) {
        return _.find(this.languages, { i18n: language }).icon;
    }

    public showEditTemplate(activerow: any) {
        this._activerow = activerow;
        this.formReset();
        this.showRowTemplate.emit({ template: this.editTemplate, row: activerow });
    }
    public hideEditTemplate() {
        this.hideRowTemplate.emit();
    }

    public cancel() {
        this.formReset();
    }

    public resetPasswordInit(mail: string) {
        this.authService.resetPasswordInit(mail).subscribe((result) => {
            this.notificationService.success({ message: this.translateService.instant(result, { email: mail }) });
        });
    }

    public deactivateUser(user: UserDTO) {
        const userCopy = _.cloneDeep(user);
        userCopy.activated = false;
        this.usersService.update(userCopy).subscribe((result) => {
            this.loadPage(this.page.currentPage);
            this.notificationService.success(
                { message: this.translateService.instant('users.message.deactivated', { username: user.login }) });
        });
    }

    public activateUser(user: UserDTO) {
        const userCopy = _.cloneDeep(user);
        userCopy.activated = true;
        this.usersService.update(userCopy).subscribe((result) => {
            this.loadPage(this.page.currentPage);
            this.notificationService.success(
                { message: this.translateService.instant('users.message.activated', { username: user.login }) });
        });
    }

    private formReset() {
        this.userForm.reset();
        this.userForm.get('firstName').setValue(this._activerow.data['firstName']);
        this.userForm.get('lastName').setValue(this._activerow.data['lastName']);
        this.userForm.get('authorities').setValue(this._activerow.data['authorities']);
        this.userForm.get('email').setValue(this._activerow.data['email']);
    }

    private loadRoles() {
        this.rolesService.getAll().subscribe((result) => {
            this.rolesList = result.body;
        });
    }
}
