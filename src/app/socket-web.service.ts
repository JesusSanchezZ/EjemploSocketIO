import { EventEmitter , Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service/public-api';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketWebService extends Socket {

  outEven: EventEmitter<any> = new EventEmitter();
  callBack: EventEmitter<any> = new EventEmitter();

  constructor(private cookieService: CookieService) {
    super({
      url: 'http://localhost:5000',
      options: {
        query: {
          nameRoom: localStorage.getItem('room')
        }
      }
    });

    this.listen();
   }

   listen() {
    // this.ioSocket.on('event', res => this.outEven.emit(res))
    this.ioSocket.on('event', (res: any) => this.callBack.emit(res));
   }

   emitEvent = (payload = {}) =>{
    this.ioSocket.emit('event', payload);
   }
}
