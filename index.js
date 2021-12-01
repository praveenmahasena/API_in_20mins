const {app}=require('./app/app.js')


const PORT=process.env.PORT??5064

app.listen(PORT,err=>err?console.log(err):console.log('http://localhost:5064'))
