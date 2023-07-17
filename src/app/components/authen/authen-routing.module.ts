import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VerifyComponent } from './verify/verify.component';

import { SecAccountComponent } from './sec-account/sec-account.component';
import { SecMenuComponent } from './sec-menu/sec-menu.component';
import { PolapproveComponent } from './polapprove/polapprove.component';


@NgModule({
    imports: [RouterModule.forChild([ 
       
        { path: 'account', component: SecAccountComponent },
        { path: 'menu', component: SecMenuComponent },
        { path: 'workflow', component: PolapproveComponent },
 
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthenRoutingModule { }
