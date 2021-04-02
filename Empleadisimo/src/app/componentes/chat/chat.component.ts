import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { UsuariosService } from '../../services/usuarios.service'
import { SocketService } from '../../services/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  informationChat: any;
  messages = [];
  users = []
  chats =  [];
  actualPhoto = "";
  actualName = "";
  actualMessages = [];
  myId: String = ""; 
  constructor(private chatService: ChatService,
              private userService: UsuariosService,
              private socketService: SocketService,
              private cookie: CookieService){
    this.getInformationChat();
    this.obtainMessages();
  }
  ngOnInit(): void {
  }
  
  getInformationChat(){
    if(this.chatService.idChat != ""){
      this.userService.getCompany(this.chatService.idChat).subscribe(
        res =>{ 
          console.log(res);
          this.informationChat = res.user;
          this.actualName = res['user']['nombreCompleto'];
          this.actualPhoto = res['user']['fotoPerfil'];
          this.actualMessages = [];
        },
        err => console.error(err)
      )
    }
  }

  obtainConn(){
    if(this.userService.imOnline == false){
      this.userService.obtenerUsuario(this.cookie.get('idUser')).subscribe(
        (res) => {
          this.socketService.emit("ObtainData", res )  
          this.userService.imOnline = true;
        }
      )
    }
  }
  
  sendMessage(content: String){
      this.socketService.emit('sendMessage', {
        idUser: this.cookie.get('idUser'),
        idCompany: this.informationChat['_id'],
        content
      })
  }

  obtainMessages(){
    this.userService.obtainMessages().subscribe(
      res => {
        if(res['users'].length > 0 && this.actualName == ""){
          this.messages = res['messages'];
          this.users = res['users'];        
          this.actualPhoto = this.users[0]['fotoPerfil'];
          this.actualName = this.users[0]['nombreCompleto'];
          this.actualMessages = this.messages[0]['messages'];
          this.myId = this.cookie.get('idUser');
        //   // if(!this.informationChat){
        //   //   this.informationChat = this.users[0]['_id'];
        //   // }
        }else{
          if(res['users'].length > 0){
            this.messages = res['messages'];
            this.users = res['users'];
          }
        }
      },
      err => console.error(err)
    )
  }

  changeMessage(user: any){
    this.actualPhoto = user['fotoPerfil'];
    this.actualName = user['nombreCompleto'];
    this.informationChat = user;
    this.actualMessages = this.obtainMessagesById(user['_id'])
  }

  obtainMessagesById(userId : string){
    for(var i = 0; i < this.messages.length; i++){
      for(var j = 0; j < 2; j++){
        if(this.messages[i]['users'][j] == userId){
          return this.messages[i]["messages"]
        }
      }
    }
    return []
  }

}
