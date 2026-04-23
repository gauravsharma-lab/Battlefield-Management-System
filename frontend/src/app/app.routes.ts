import { Routes } from '@angular/router';

import { AssetList } from './asset-list/asset-list';
import { AddAsset } from './add-asset/add-asset';
import { ScenarioList } from './scenario-list/scenario-list';
import { AddScenario } from './add-scenario/add-scenario';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

import { authGuard } from './guards/auth-guard';
import { AdminUsers } from './pages/admin-users/admin-users';
import { Dashboard } from './dashboard/dashboard';


export const routes: Routes = [

  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  // 🔐 Protected
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

  { path: 'assets', component: AssetList, canActivate: [authGuard] },
  { path: 'add-asset', component: AddAsset, canActivate: [authGuard] },
  { path: 'add-asset/:id', component: AddAsset, canActivate: [authGuard] },
  { path: 'scenarios', component: ScenarioList, canActivate: [authGuard] },
  { path: 'add-scenario', component: AddScenario, canActivate: [authGuard] },
  { path: 'add-scenario/:id', component: AddScenario },

  // 🔐 Admin (still basic protection)
  { path: 'admin/users', component: AdminUsers, canActivate: [authGuard] },

];