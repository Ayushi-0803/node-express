const express=require("express");
const app=express()
const path=require('path');
const methodOverride=require('method-override');
const {v4:uuid}=require('uuid');

// app.use((req,res)=>{
//     console.log("We got a new request")
//     res.send({color:'red'})
// })

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname,'/views'))
app.set('view engine','ejs');



let comments=[
{
    id:uuid(),
    username:'Todd',
    comment:'lol that is so funny!'
},

{
    id:uuid(),
    username:'Skyler',
    comment:'I like to go birdwatching'
},
{
    id:uuid(),
    username:'Ayushi',
    comment:'Plz delete your account Todd'
},
{
    id:uuid(),
    username:'onlysayswoof',
    comment:'Woof Woof Woof'
}
]
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new');
})

app.post('/comments',(req,res)=>{
    const{username,comment}=req.body;
    comments.push({username,comment,id:uuid()})
   res.redirect('/comments')
})

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const comment=comments.find(c => c.id===id);
    res.render('comments/show',{comment})
})
app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    const comment=comments.find(c=>c.id.toString()===id.toString());
    res.render('comments/edit',{comment})
})
app.patch('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const newCommentText=req.body.comment;
    const foundcomment=comments.find(c=>c.id.toString()===id.toString());
    foundcomment.comment=newCommentText;
    res.redirect('/comments')
})


app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params;
    comments=comments.filter(c=>c.id!==id);
    res.redirect('/comments')
})













app.get('/',(req,res)=>{
    res.render('home.ejs')
})
app.get('/rand',(req,res)=>{
    const num= Math.floor(Math.random()*10)+1;
    res.render('random',{rand:num})
})
app.get('/r/:subreddit',(req,res)=>{
    const {subreddit}=req.params;
    res.render('subreddit',{subreddit});
})


app.get('/tacos',(req,res)=>{
    res.send("Get /tacos response")
})
app.post('/tacos',(req,res)=>{
  const{meat,qty}=req.body;
    res.send(`Ok here are your ${qty} ${meat} tacos `)
})
// app.get('/cats',(req,res)=>{
//     res.send('MEOW!!')
// })
// app.get('/r/:subreddit',(req,res)=>{
//     const {subreddit}=req.params;
//     res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
   
// })
// app.get('/r/:subreddit/:postId',(req,res)=>{
//     const {subreddit,postId}=req.params;
//     res.send(`<h1>Viewing Post Id:${postId} on the ${subreddit} subreddit</h1>`)
   
// })
// app.get('/dogs',(req,res)=>{
//     res.send('Woof!')
// })
// app.get('/search',(req,res)=>{
//     const {q}=req.query;
//     if(!q){
//         res.send('Nothing found if nothing searched')
//     }
//     res.send(`<h1> Search Results for :${q}</h1>`)
// })
// app.get('*',(req,res)=>{
//     res.send("I dont know that path!!")
// })


app.listen(8200,()=>{
    console.log("Listening on port 8200")
})