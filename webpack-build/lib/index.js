
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

console.log('init');

socket.on('connect', onConnect);
socket.on('oo',function(...s){
  console.log(s)
});


function onConnect(){
  console.log('connect9  ' + socket.id);
}
