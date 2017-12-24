import { AlertService } from './../alert/alert.service';
import { IDialogComponent } from './../../components/dialog';
import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SafeHtml } from '@angular/platform-browser';
import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthAbstractService } from '../../services/auth.service';
import * as _ from 'lodash';

@Component({
    selector: 'ino-sign-in',
    templateUrl: 'sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
@Injectable()
export class SigninComponent implements OnInit, IDialogComponent {
    public formError: boolean;
    public submitting = false;
    public usernameFormControl: FormControl;
    public passwordFormControl: FormControl;
    public remembermeControl: FormControl;
    public emailFormControl: FormControl;
    public dialogRef: MatDialogRef<SigninComponent>;
    public signinForm: FormGroup;
    public resetForm: FormGroup;
    public loading = false;
    public forgotPassword = false;

    constructor(private loginService: LoginService, private alertService: AlertService,
        private store: Store<any>, private router: Router) { }

    public ngOnInit() {
        this.forgotPassword = false;
        this.usernameFormControl = new FormControl('', [Validators.required]);
        this.passwordFormControl = new FormControl('', [Validators.required]);
        this.remembermeControl = new FormControl(false);
        this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
        this.signinForm = new FormGroup({
            username: this.usernameFormControl,
            password: this.passwordFormControl,
            rememberme: this.remembermeControl,
        });

        this.resetForm = new FormGroup({
            email: this.emailFormControl
        });
    }
    public signIn() {
        this.loading = true;
        this.loginService.login({
            username: this.signinForm.value.username,
            password: this.signinForm.value.password,
            rememberMe: this.signinForm.value.rememberme
        }).subscribe((result) => {
            this.loading = false;
            this.formError = null;
            if (!_.isNil(this.dialogRef)) {
                this.dialogRef.close(true);
            }
            this.store.select('previousUrl').take(1).subscribe((url) => {
                if (url) {
                    this.router.navigate([url]);
                }
            });
        },
            (err) => {
                this.loading = false;
                this.formError = true;
            }
            );
    }

    public resetPassword() {
        this.loading = true;
        this.loginService.resetPasswordInit(this.resetForm.value.email).subscribe((result) => {
            this.loading = false;
            this.forgotPassword = false;
        }, (err) => {
            this.loading = false;
            this.formError = true;
        });
    }

}
