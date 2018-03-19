import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [RouterModule, CommonModule, PipesModule],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NopagefoundComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NopagefoundComponent
    ]
})
export class SharedModule { }
