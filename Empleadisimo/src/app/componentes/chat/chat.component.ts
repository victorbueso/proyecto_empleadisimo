import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { UsuariosService } from '../../services/usuarios.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  informationChat: any;

  constructor(private chatService: ChatService,
              private userService: UsuariosService){
    this.getInformationChat();
  }

  getInformationChat(){
    if(this.chatService.idChat){
      this.userService.getCompany(this.chatService.idChat).subscribe(
        res =>{ 
          this.informationChat = res.user;
        },
        err => console.error(err)
      )
    }
  }

  ngOnInit(): void {
  }

}
