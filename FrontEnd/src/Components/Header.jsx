import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


 const Header = () => {

  
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpen = () =>{
    setOpen(true);
  }
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
         
            <div>
              <Avatar
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              U
                {/* <AccountCircle /> */}
              </Avatar>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={() => navigate('/edit-profile')}>Edit Profile</MenuItem>
                <MenuItem onClick={handleOpen}>Change Password</MenuItem>
                <MenuItem onClick={()=>handleLogout()}>Logout</MenuItem>
              </Menu>

              <Dialog
                open={open}
                onClose={handleCloseModal}
              
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                  Change Password
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>

                    <InputLabel >Old Password</InputLabel>
                    <TextField name="old-password"></TextField>

                    <InputLabel >New Password</InputLabel>
                    <TextField name="old-password"></TextField>

                    <InputLabel >Confirm Password</InputLabel>
                    <TextField name="old-password"></TextField>

                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button onClick={handleCloseModal}>Subscribe</Button>
                </DialogActions>
              </Dialog>



            </div>
         
        </Toolbar>
      </AppBar>

    </Box>
  );
}
export default Header;
