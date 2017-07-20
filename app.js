const Koa = require( 'koa' )
const IO = require( 'koa-socket' )

const app = new Koa()
const io = new IO()

// app.use( ... )

io.attach( app )
io.use( ( ctx, next ) => {
  console.log(1)
  let start = new Date()
  return next().then( () => {
    console.log( `response time: ${ new Date() - start }ms` )
  })
})

io.on( 'connection', ctx => {
  console.log( 'Joining chat namespace', ctx.socket.id )
  console.log(ctx)
  ctx.socket.emit( 'oo', {
  message: 'response from server'
})
ctx.socket.emit( 'oo', 2)
})

io.on( 'join', ( ctx, data ) => {
  console.log( 'join event fired', data )
})

app.listen(  3000 ,(...a)=>console.log(a))
