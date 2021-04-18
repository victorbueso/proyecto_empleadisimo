import { CookieService } from 'ngx-cookie-service';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { HelperService } from 'src/app/services/helper.service';
import { UsuariosService } from '../../services/usuarios.service'
import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{

  informationChat: any;
  messages : Array<any> = [];
  users : Array<any> = [];
  chats : Array<any> =  [];
  actualPhoto = "";
  actualName = "";
  actualMessages = [];
  actualId : Number;
  myId: String = ""; 
  notifications = [];
  @ViewChild("inputMessage") inputMessage! : ElementRef;

  constructor(private chatService : ChatService,
              private userService : UsuariosService,
              private socketService : SocketService,
              private cookie : CookieService,
              private render : Renderer2,
              private helperService: HelperService, 
              private router : Router){
    this.obtainMessages();   
    this.obtainConn();
    this.serverMessage();
    this.myId = this.cookie.get('idUser')
  }

  ngOnInit():void{
    this.helperService.navbarNoVisible.emit();
  }

  connection(){
    this.socketService.listen('connect').subscribe(
      ( res ) => {},
      ( err ) => console.error(err)
    )
  }

  serverMessage(){
    this.socketService.listen('messageServer').subscribe(
      (res : any) => {
        var index = this.obtainPosition(res['message']['idUser']);
        if(index > -1){
          this.messages[index]['messages'].push(res['message']);
          this.notifications[index] = this.notifications[index] + 1;
        }else{
          this.messages.unshift(res['message']);
          this.notifications[0] = 1; 
          try{
            this.userService.getCompany(res['message']['messages'][0]['idUser'])
          .subscribe(
            (res) => {
              this.users.unshift(res['user'])              
            },
            (err) => console.error(err)
          )}catch{}
        }
      },
      err => console.error(err)
    )
  }

  homeChat(){
    
    if(this.chatService.idChat != ""){
      var idChat = this.existingChat(this.chatService.idChat);
      if(idChat != undefined){
        this.swapPosition(this.users, 0, 1);
        this.updateData(this.users[0]['fotoPerfil'], this.users[0]['nombreCompleto'], this.users[0]['messages']);
        setTimeout( () => {
          this.chatService.messageSeen(this.cookie.get('idUser'), this.users[0]).subscribe(
            (res) => {},
            (err) => console.error(err)
          )
          this.notifications[idChat] = 0
        } , 1000);
        this.informationChat = this.users[0];  
      }
      else{
        this.obtainUserInformation(this.chatService.idChat, () => {
          this.updateData(this.users[0]['fotoPerfil'], this.users[0]['nombreCompleto'], this.users[0]['messages']);
          this.informationChat = this.users[0];
        });
        let message = {
          messages : [],
          users : [this.cookie.get('idUser'), this.chatService.idChat]
        }
        this.messages.unshift(message)
      }
    }
  }

  updateData(actualPhoto: string, actualName : string, messages: Array<any>) : void{
    this.actualPhoto = actualPhoto;
    this.actualName = actualName; 
    this.actualMessages = this.messages[0]['messages'];
  }

  obtainUserInformation(idUser : string, callbackF : () => void ){
    this.userService.getCompany(idUser).subscribe(
      res => {
        this.users.unshift(res['user']);
        callbackF();
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
    
    var date = new Date();
    let messageSendit = {
        date: `${ date.getDay() }/${ date.getMonth() }/${ date.getFullYear() }`,
        hour: `${ date.getHours() }:${ date.getMinutes() }`,
        idUser : this.cookie.get('idUser'),
        content
    } 

    var position = this.obtainPosition(this.informationChat['_id'])  
    this.messages[position]['messages'].push(messageSendit);
    this.render.setProperty(this.inputMessage.nativeElement, "value", "");
  }

  obtainMessages(){
    this.userService.obtainMessages().subscribe(
      res => {
        if(res['users'].length > 0){
          this.messages = res['messages'];
          this.users = res['users'];
          this.obtainNotification(res['messages']);
          this.homeChat()
        }else{
          this.homeChat()
        }
      },
      err => console.error(err)
      )
  
  }

  changeMessage(user: any, id : number){
    this.actualPhoto = user['fotoPerfil'];
    this.actualName = user['nombreCompleto'];
    this.informationChat = user;
    this.actualMessages = this.obtainMessagesById(user['_id'])
    this.cleanNotifications(user, id)
  }

  obtainMessagesById(userId : string){
    for(var i = 0; i < this.messages.length; i++){
      for(var j = 0; j < 2; j++){
        if(this.messages[i]['users'][j] == userId){
          return this.messages[i]["messages"]; 
        }
      }
    }
    return []
  }

  swapPosition(arrayAny : Array<Object>, positionOne: number, positionTwo: number, callbackF? : () => void){
    var moveElement = arrayAny[positionTwo];
    if(arrayAny.length > positionOne && arrayAny.length > positionTwo){
      arrayAny[positionTwo] = arrayAny[positionOne]
      arrayAny[positionOne] = moveElement;
    }
    return arrayAny;
  }
  
  obtainPosition(idUser : any) : number {
    for(var i =  0; i < this.users.length; i++){
      if(this.users[i]['_id'] == idUser){
        return i
      }
    }
    return -1 
  }

  obtainNotification(messages : any){
    for(var i = 0; i < messages.length; i++){
      if(messages[i]['user1']['idUser']  == this.cookie.get('idUser')){
        this.notifications[i] = messages[i]['user1']['notification']; 
      }else{
        this.notifications[i] = messages[i]['user2']['notification']; 
      }
    }
  }

  cleanNotifications(user : any, id : number) : void{
    this.chatService.messageSeen(this.cookie.get('idUser'), user).subscribe(
      (res) => {},
      (err) => console.error(err)
    )
    this.notifications[id] = 0
  }

  goHome(){
    this.router.navigate(['']);
  }

}