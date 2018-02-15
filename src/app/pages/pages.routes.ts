import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

const PAGES_ROUTE: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'dashboard', component: DashboardComponent },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
        ]
    },
];

export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTE);
