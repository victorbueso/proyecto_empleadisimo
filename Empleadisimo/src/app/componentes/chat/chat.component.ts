import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { UsuariosService } from '../../services/usuarios.service'
import { SocketService } from '../../services/socket.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  informationChat: any;

  constructor(private chatService: ChatService,
              private userService: UsuariosService,
              private socketService: SocketService,
              private cookie: CookieService){
    this.getInformationChat();
  }

  getInformationChat(){
    if(this.chatService.idChat){
      this.userService.getCompany(this.chatService.idChat).subscribe(
        res =>{ 
          this.informationChat = res.user;
          this.informationChat['fotoPerfil'] = `http://localhost:3000/${this.informationChat['fotoPerfil']}`;
        },
        err => console.error(err)
      )
    }
  }

  ngOnInit(): void {
  }

  sendMessage(content: String){
    
    this.socketService.emit('sendMessage', {
      idUser: this.cookie.get('idUser'),
      idCompany: this.informationChat['_id'],
      content
    })
  
  }

}
