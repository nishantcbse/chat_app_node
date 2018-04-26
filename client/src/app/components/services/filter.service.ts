import { Pipe, PipeTransform } from '@angular/core';  

@Pipe({  
    name: 'format_time',  
    pure: false  
}) 
export class ChatTimeFilter implements PipeTransform { 
  MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    transform(timestamp: any): any {
      let d = new Date();
      let date = new Date();
      let stap = parseInt(timestamp);
      if(stap.toString().length < 12){
        stap = stap*1000;
      }
      date.setTime(stap);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let min:any = date.getMinutes();
      let sec:any = date.getSeconds();
      let ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12' 1523537194 1523545846726
      min = min < 10 ? '0'+min : min;
      sec = sec < 10 ? '0'+sec : sec;
      let strTime = hour + ':' + min + ' ' + ampm;
      if((date.getFullYear() == d.getFullYear()) && (date.getDate() == d.getDate())){
          strTime = 'today at '+hour + ':' + min + ' ' + ampm;
      }else{
        strTime = day +' '+this.MONTH_NAMES[date.getMonth()]+' '+date.getFullYear();
         // strTime = day +' '+this.MONTH_NAMES[date.getMonth()]+' '+date.getFullYear()+' at '+hour + ':' + min + ' ' + ampm;
      } 
      return strTime;
    }  
}
@Pipe({  
    name: 'room_guest',  
    pure: false  
}) 
export class RoomsGuestFilter implements PipeTransform { 
    transform(room: any[]): any {  
         // let users =[];
        
        // users = users.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
        return room.length;
         
    }  
}
@Pipe({  
    name: 'buzzed',  
    pure: false  
}) 
export class RoomsBuzzedFilter implements PipeTransform { 
    transform(rooms: any[], user_id:any): any {  
       if(Array.isArray(rooms)){
        return rooms.filter((room) => {
          if((room.buzzed == true) && (room.user_id != user_id)){
            return true;
          }else{
            return false;
          }
        }); 
      } 
         
    }  
}
@Pipe({  
    name: 'roomMessage',  
    pure: false  
}) 
export class RoomMessageFilter implements PipeTransform { 
   transform(items: any, roomid: any): any {
    if(Array.isArray(items)){
        return items.filter((chat) => {
          if((chat.room_id == roomid)){
            return true;
          }else{
            return false;
          }
        }); 
    }
  }
}
@Pipe({  
    name: 'like',  
    pure: false  
}) 
export class LikeFilter implements PipeTransform { 
   transform(items: any, filter: any, isAnd: false): any {
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      if (isAnd) {
        return items.filter(item =>
            filterKeys.reduce((memo, keyName) =>
                (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {

              if(keyName == 'username'){
                return new RegExp(filter[keyName], 'gi').test(item.user.name) || filter[keyName] === "";
              }else{

                return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
              }
          });
        });
      }
    } else {
      return items;
    }
  }
}
@Pipe({  
    name: 'roomOwner',  
    pure: false  
}) 
export class RoomFilter implements PipeTransform { 
    transform(rooms: any, filter: any, isAnd: false): any {  
       if (filter && Array.isArray(rooms)) { 
            return rooms.filter(room => {
              if(!isAnd){
                    if(filter.user != room.user.id){
                      return true
                    }else{
                      return false
                    }
               
              }else{
                return new RegExp(filter.user, 'gi').test(room.user.id) || filter.user === "";
              }
              

            });  
        }

         
    }  
}

@Pipe({  
    name: 'chatSort',  
    pure: false  
}) 
export class ChatFilter implements PipeTransform { 
    transform(chats: any[]): any {  
         if(Array.isArray(chats)){

            let data = chats.sort((a,b)=>{
              return b.position - a.position;
            })
            return data;
         }  
    }  
}