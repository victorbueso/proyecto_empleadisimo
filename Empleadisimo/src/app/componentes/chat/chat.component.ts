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
  messages : Array<any> = [];
  users : Array<any> = [];
  chats : Array<any> =  [];
  actualPhoto = "";
  actualName = "";
  actualMessages = [];
  myId: String = ""; 

  constructor(private chatService: ChatService,
              private userService: UsuariosService,
              private socketService: SocketService,
              private cookie: CookieService){
    this.obtainMessages();
    console.log(this.users)
    console.log(this.messages)
    }
  ngOnInit(): void {
  }
  
  homeChat(){
    if(this.chatService.idChat != ""){
      var idChat = this.existingChat(this.chatService.idChat);
      if(idChat != undefined){
        this.swipePosition(this.users, 0, 1)
      }else{
        this.obtainUserInformation(this.chatService.idChat);
        let message = {
          messages : [],
          users : [this.cookie.get('idUser'), this.chatService.idChat]
        }
        this.messages.unshift(message)
      }
    }
  }

  obtainUserInformation(idUser : string){
    this.userService.getCompany(idUser).subscribe(
      res => {
        this.users.unshift(res['user']);
      },
      err => console.error(err)
    )
  }

  existingChat(idUser: String): number | undefined{
    for(var i = 0; i < this.messages.length; i++){
      for(var j = 0; j < this.messages[i]['users']['length']; j++){
        if(this.messages[i]['users'][j] == idUser){
          return i
        }
      }
    }
    return undefined
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
        if(res['users'].length > 0){
          this.messages = res['messages'];
          this.users = res['users'];        
          this.homeChat()
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

  swipePosition(arrayAny : Array<Object>, positionOne: number, positionTwo: number){
    var moveElement = arrayAny[positionTwo];
    if(arrayAny.length > positionOne && arrayAny.length > positionTwo){
      arrayAny[positionTwo] = arrayAny[positionOne]
      arrayAny[positionOne] = moveElement;
    }
    return arrayAny;
  }
}
