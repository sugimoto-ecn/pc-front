import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [text, setText] = useState("")
  const [image, setImage] = useState("https://source.unsplash.com/random")
  const [message, setMessage] = useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const sendMessage = async (message) => {
    const res = await axios.post("https://z4yv141b3h.execute-api.ap-northeast-1.amazonaws.com/dev/messages", {
      message
    })

    getLatestImage()
    getLatestMessage()
  } 
    const getLatestImage = async () => {
    const res = await axios.get("https://z4yv141b3h.execute-api.ap-northeast-1.amazonaws.com/dev/image/new")
    console.log(res)
    setImage(res.data.url)

  }

  const getLatestMessage = async()=> {
    const res = await axios.get("https://z4yv141b3h.execute-api.ap-northeast-1.amazonaws.com/dev/messages/new")
    console.log(res)
    setMessage(res.data.message)
  }
  
  useEffect(() => {
    getLatestImage()
    getLatestMessage()
    setInterval(() => {
      console.log("--------")
      getLatestImage()
      console.log("--------")
    }, 10000)
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <QuestionAnswerOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Message
            </Typography>
              <Grid container>
                <Grid item xs={6}>
                <div className='p-2'>
                <Card onClick={() => sendMessage("ショウショウオマチクダサイ")} style={{"cursor":"pointer"}} className="bg-dark text-light text-center pt-5 pb-5">
                  <p>ショウショウオマチクダサイ</p>
                </Card>
                </div>
                </Grid>
                <Grid item xs={6}>
                <div className='p-2'>
                <Card onClick={() => sendMessage("タダイマルスニシテオリマス")} style={{"cursor":"pointer"}} className=" bg-dark text-light text-center pt-5 pb-5">
                  <p>タダイマルスニシテオリマス</p>
                </Card>
                </div>
                </Grid>
              </Grid>
              <TextField
                onChange={(e) => setText(e.target.value)}
                value={text}
                margin="normal"
                required
                fullWidth
                id="email"
                label="カスタムメッセージ"
                name="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {sendMessage(text)}}
                sx={{ mt: 3, mb: 2 }}
              >
                送信
              </Button>
            </Box>
            

            <Card className="bg-success text-light p-2 col-8 offset-2 text-center">
            <Typography component="h1" variant="h5">
               {message}
            </Typography>
            </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}