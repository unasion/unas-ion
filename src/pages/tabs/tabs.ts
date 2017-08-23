import { Component } from '@angular/core';

import { ApptPage } from '../appt/appt';
import { StatsPage } from '../stats/stats';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ApptPage;
  tab3Root = StatsPage;

  constructor() {

  }
}
