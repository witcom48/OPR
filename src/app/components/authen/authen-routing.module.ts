import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VerifyComponent } from './verify/verify.component';

@NgModule({
    imports: [RouterModule.forChild([ 
       
        // { path: 'genaral', component: SystemPolicyComponent },
 
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthenRoutingModule { }
