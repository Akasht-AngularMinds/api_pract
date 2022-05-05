import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Header from './Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useEffect,useState} from 'react';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

 const Feed = ()=> {

// const uId = JSON.parse(localStorage.getItem('user'))._id;
// console.log(uId);
const [uId,setUId] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [allPosts,setAllPosts] = useState([]);
  const [caption,setCaption] = useState('');
  const [file,setFile] = useState('');
  const [like,setLike] = useState(false);
  const [comment,setComment] = useState('');

const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddPhoto = () =>{
        console.log('add')
  }

   useEffect(() =>{
    const token = localStorage.getItem('token');
 
    if(!token){
      navigate('/');
    }
     console.log(localStorage.getItem('user'))
     setUId(JSON.parse(localStorage.getItem('user')));
     
        axios.get('api/posts/timeline/allPosts')      
        .then((res) =>{setAllPosts(res.data)})
          // .then((res) =>setAllPosts(res.data))
          },[])


     const handleLike = (id,post) =>{
      console.log(uId)
           const arr = post.likes
         console.log(post.likes.includes(uId)?'true':'false')
      
       axios.put(`api/posts/${id}/like`, { userId: uId})
       .then(response => {
        console.log(response)
       
        })

     }   
     const handleIMG = (event) =>{
      setFile(event.target.files[0])
     }


     const handleAddComment = (id) =>{   
     
      const info = {
        userId:uId,
        comment:comment  
          }
     
      axios.put(`api/posts/${id}/comments`,info)
      
      .then(response => {
          console.log(response)
      })

     }
     const handleNewPost = () =>{

      let formData = new FormData();
      formData.append("image",file);
      formData.append("desc",caption);
      formData.append("userId",uId)

      const info ={
        image:file,
      desc:caption,
      userIdd:uId
    
            }
            console.log(info)
        
          axios.post('api/posts',formData)
            .then(response => {
                console.log(response)
            })
            
     }

          console.log(allPosts)
  return (
    <>
    <Header />
    
    <Card >
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        
        >
          <Typography   style={{marginLeft:'200px'}}>Create New Post</Typography>
        </AccordionSummary>
        <AccordionDetails   style={{marginLeft:'200px'}}>
          <Typography sx={{display: 'flex' , margin:'auto'}}>
                <input type="file" multiple accept="image/*" onChange={(e) => {
                      handleIMG(e);
                    }} />
              <InputLabel style={{fontWeight: 'bold'}}>Caption</InputLabel>
                <TextareaAutosize
                  style={{ width: "470px", height: "40px"}}
                  label="address"
                  placeholder="Write Caption here"
                  variant="outlined"
          
                  onChange={(e) => setCaption(e.target.value)}
                
                />
          </Typography>
                <Button
                    color="primary"
                    onClick={() => handleNewPost()}
                    variant="contained"
                    style={{margin: "20px 400px", width: "85px"}}
                   >
                 Add
                </Button>
        
        </AccordionDetails>
      </Accordion>
 
       
    </Card>
    {allPosts&&
    allPosts.map(post =>(
    
   
    <Card key={post._id} sx={{height:'70%', maxWidth: '50%' ,margin: '20px auto' }}>
      <CardHeader 
      // style ={{background:'pink'}}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        // subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="400px"
        width="400px"
        image={post.img}
        alt="Paella dish"
      />

       <TextField id="standard-basic" style={{width:'90%'}} label="add comment" variant="standard" 
       onChange={(e)=>setComment(e.target.value)} >
       {/* <SendIcon onClick={()=>handleAddComment()} /> */}

       </TextField>
      <SendIcon style={{marginTop:'20px'}} onClick={()=>handleAddComment(post._id)} />
      
      
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {post.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"
        //  style={{color:`${like?'red':''}`}}
        style={{color:`${post.likes.includes(uId)?'red':''}`}}
         onClick={() =>{setLike(!like);handleLike(post._id,post)}}>
          <FavoriteIcon />
        </IconButton>
        {post.likes.length}
        {/* {post.likes.inclueds(uId)?'true':'false'} */}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>


        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>


      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {post.comments.map(com =>(
            <Typography paragraph key={com.userId}>{com.comment}</Typography>
          )

          )}
         
          
        </CardContent>
      </Collapse>
    </Card> 
     ))
    }
    </>
  );
}
export default Feed;