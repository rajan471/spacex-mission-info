import { Component, OnInit, Input } from '@angular/core';
import { Mission } from '../mission';
@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.css']
})
export class MissionCardComponent implements OnInit {
  @Input() mission: Mission = null;
  constructor() { }

  ngOnInit(): void {
  }

}
