const Koa = require( 'koa' )
const IO = require( 'koa-socket' )

const app = new Koa()
const io = new IO()

// app.use( ... )

var l = []
remove = (i, list) => list.filter(a =>a.id!=i)

io.attach( app )
io.use( async ( ctx, next ) => {
  console.log(ctx.socket.id)
  let start = new Date()
  await next()
  console.log( `response time: ${ new Date() - start }ms` )
})

io.on( 'connection', ctx => {
  console.log( '连接', ctx.socket.id )
  l.push({id:ctx.socket.id,socket:ctx.socket})
  io.broadcast('update', l.map(a=>a.id))
  console.log('当前用户人数：'+l.length+'---'+l)
})

io.on( 'disconnect', ctx => {
  console.log( '断开连接', ctx.socket.id )
  l = remove(ctx.socket.id, l)
  io.broadcast('update', l)
  console.log('当前用户人数：'+l.length+'---'+l)
})
io.on( 'del', ( ctx, data ) => {
  console.log( '删除连接', data )
  l = remove(data, l)
  io.broadcast('update', l)
  io.connections.get('')
  console.log('当前用户人数：'+l.length+'---'+l)
})


app.listen(  3000 ,(...a)=>console.log(a))
