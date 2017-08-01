const Koa = require( 'koa' )
const IO = require( 'koa-socket' )

const app = new Koa()
const io = new IO()

// app.use( ... )
const list = {}

io.attach( app )
io.use( async ( ctx, next ) => {
  console.log(ctx.socket.id)
  let start = new Date()
  await next()
  console.log( `response time: ${ new Date() - start }ms` )
})

io.on( 'connection', ctx => {
  console.log( '连接', ctx.socket.id )
  console.log('当前用户人数：'+'---')
  console.log(list)
})
var ii = 0
io.on( 'join', (ctx, id) => {
  ii++
  list[ii] = ctx.socket
})

io.on( 'disconnect', ctx => {
  console.log( '断开连接', ctx.socket.id )
  console.log('当前用户人数：'+'---')
  for (var k in list) {
    if(list[k].id == ctx.socket.id){
      delete list[k]
    }
  }
  console.log(list)

})
io.on( 'del', ( ctx ) => {

})


app.listen(  3000 ,(...a)=>console.log(a))
