import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketWebService } from '../socket-web.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room!: string;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    // leemos el parámetro de la ruta
    this.room = this.router.snapshot.paramMap.get('room') || '';
    localStorage.setItem('room',this.room);
  }

}
