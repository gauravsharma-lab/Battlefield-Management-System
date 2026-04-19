import { Routes } from '@angular/router';

import { AssetList } from './asset-list/asset-list';
import { AddAsset } from './add-asset/add-asset';
import { ScenarioList } from './scenario-list/scenario-list';
import { AddScenario } from './add-scenario/add-scenario';

export const routes: Routes = [
  { path: '', component: AssetList },   // default page
  { path: 'assets', component: AssetList },
  { path: 'add-asset', component: AddAsset },
  { path: 'scenarios', component: ScenarioList },
  { path: 'add-scenario', component: AddScenario }
];