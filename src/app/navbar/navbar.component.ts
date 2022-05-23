import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private uiService: UiService) {}

  ngOnInit(): void {}
  setSelected(name: string) {
    this.uiService.setSelected(name);
  }
}
