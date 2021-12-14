const {connect,Schema,model}=require('mongoose')


connect('mongodb://localhost:27017/postes')
.then(res=>console.log('yaya yaya yayayay'))
.catch(err=>console.log(err))
const post=new Schema({
  Title:{
    type:String,
    required:true
  },
  Description:{
    type:String,
    required:true
  },
  Content:{
    type:String,
    required:true
  },

})

const Post=model('post',post)

module.exports={
  Post
}
