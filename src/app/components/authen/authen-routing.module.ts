import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VerifyComponent } from './verify/verify.component';

import { SecAccountComponent } from './sec-account/sec-account.component';
import { SecMenuComponent } from './sec-menu/sec-menu.component';


@NgModule({
    imports: [RouterModule.forChild([ 
       
        { path: 'account', component: SecAccountComponent },
        { path: 'menu', component: SecMenuComponent },
 
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthenRoutingModule { }
