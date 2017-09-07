import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
export const router: Routes = [
    { path: '', component: AppComponent },
];

// tslint:disable-next-line:eofline
export const routes: ModuleWithProviders = RouterModule.forRoot(router);