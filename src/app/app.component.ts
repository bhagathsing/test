import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/DataService';
import { MenusData } from './app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public menus: MenusData[];
  constructor(private dataService: DataService){

  }
  public ngOnInit(){
      this.getMenuData();
  }
  public getMenuData(){
    this.dataService.getMenuData().subscribe((data) => {
      this.menus = data;
    })
  }
}
