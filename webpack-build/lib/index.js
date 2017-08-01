
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

var sss = document.getElementById('sss')
var bt = document.getElementById('bt')
var i = 1;
socket.on('connect', function onConnect(data){
socket.emit('join')
});

socket.on('update',function(data){
  console.log(data)
  sss.innerHTML = data.map(a => '<h1>'+a+'</h1>')
});

bt.onclick = function(){
  console.log('del--'+document.querySelector('h1').innerText)
  socket.emit('del',document.querySelector('h1').innerText)
}
