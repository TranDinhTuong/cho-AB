import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import SchoolIcon from '@mui/icons-material/School';
import TextField from '@mui/material/TextField';
import {useNavigate}  from 'react-router-dom';
import { styled} from '@mui/material';
import axios from 'axios'; 
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message'; // Biểu tượng tin nhắn
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {  Grid, Card,CardContent, CardMedia } from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';
import CarIcon from '@mui/icons-material/LocalCarWash';
import WorkIcon from '@mui/icons-material/Work';
import ComputerIcon from '@mui/icons-material/Computer';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CloseIcon from '@mui/icons-material/Close'; // Biểu tượng đóng
function Post() {

    const [showPassword, setShowPassword] = useState(false);

    const [showUserTextBox, setShowUserTextBox] = useState(false);

    const [showAdminLoginTextBox, setShowAdminLoginTextBox] = useState(false);
    const [showCustomersLoginTextBox, setShowCustomersLoginTextBox] = useState(false);
    const [showStudentsLoginTextBox, setShowStudentsLoginTextBox] = useState(false);
    const [showTeachersLoginTextBox, setShowTeachersLoginTextBox] = useState(false);

    const [showPostTextBox, setShowPostTextBox] = useState(false);

    const [Admin_name,setAdminName]=useState('')
    const [Admin_password, setAdminPassword] = useState('')

    const [Customers_name,setCustomersName]=useState('')
    const [Customers_password, setCustomersPassword] = useState('')

    const [Teachers_name,setTeachersName]=useState('')
    const [Teachers_password, setTeachersPassword] = useState('')
    
    const [Students_name,setStudentsName]=useState('')
    const [Students_password, setStudentsPassword] = useState('')


    const navigate = useNavigate();

    const UserButton = styled (Button)
    ({
      fontSize: '1.0rem', // Kích thước của nút
        color: '#380B61', // Màu chữ của nút
        border: '0px solid #380B61', // Viền nằm trong nút
        borderRadius: '9px', // Bo tròn góc của viền
        padding: '30px 200px',
        display: 'flex', // Sử dụng flexbox để căn chỉnh
        alignItems: 'center', 
        fontWeight: 'bold',
        '&: hover': { backgroundColor: '#BCA9F5'}
        
  })

    const handleLogInClick = () => {
      // Hiển thị ô vuông khi bấm nút SignUp
        setShowUserTextBox(true);
        setShowAdminLoginTextBox(false);
        setShowCustomersLoginTextBox(false);
        setShowTeachersLoginTextBox(false);
        setShowStudentsLoginTextBox(false);
    };
    const handlePostClick = () => {
      // Hiển thị ô vuông khi bấm nút SignUp
        setShowPostTextBox(true);
    };
        const handleClose = () => {
        setShowPostTextBox(false);
    };

    const handleAdminLoginClick = () => {
        // Hiển thị ô vuông khi bấm nút SignUp
        setShowAdminLoginTextBox(true);
        setShowUserTextBox(false);
        setShowCustomersLoginTextBox(false);
        setShowTeachersLoginTextBox(false);
        setShowStudentsLoginTextBox(false);
    };
    const handleCustomersLoginClick = () => {
      // Hiển thị ô vuông khi bấm nút SignUp
      setShowCustomersLoginTextBox(true);
      setShowUserTextBox(false);
      setShowAdminLoginTextBox(false);
      setShowTeachersLoginTextBox(false);
      setShowStudentsLoginTextBox(false);
  };
    const handleTeachersLoginClick = () => {
        // Hiển thị ô vuông khi bấm nút SignUp
        setShowTeachersLoginTextBox(true);
        setShowCustomersLoginTextBox(false);
        setShowAdminLoginTextBox(false);
        setShowStudentsLoginTextBox(false);
        setShowUserTextBox(false);
    };
    const handleStudentsLoginClick = () => {
        // Hiển thị ô vuông khi bấm nút SignUp
        setShowStudentsLoginTextBox(true);
        setShowAdminLoginTextBox(false);
        setShowCustomersLoginTextBox(false);
        setShowTeachersLoginTextBox(false);
        setShowUserTextBox(false);
    };




  
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                // Tắt ô vuông khi nhấn phím Esc
                setShowUserTextBox(false);
                setShowAdminLoginTextBox(false);
                setShowTeachersLoginTextBox(false);
                setShowStudentsLoginTextBox(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function để loại bỏ sự kiện khi component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleHome = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home');
  };
  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  return (
    <div className="App" style={{ 
        // backgroundImage: 'url("/img2.jpg")', // Sử dụng đường dẫn từ thư mục public
        backgroundColor: '#F5F5F5',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh', // Sử dụng minHeight thay vì height
        display: 'flex',     // Sử dụng flexbox để tự động điều chỉnh chiều cao
        flexDirection: 'column', // Căn chỉnh theo chiều dọc
      }}>   

        <AppBar position="static">
                <Toolbar sx={{ bgcolor: '#66B2FF' }}>
                    
                    <Button onClick={handleHome}>
                    <img src="/Avatar.png" alt="Icon" width="80" height="40" />
                    <Typography variant='h5' style={{ fontWeight: 'bold' }} align='left' sx={{ flexGrow: 1 }} color='#FFFFFF'> CHỢ AB </Typography>
                    </Button>
                    <Button onClick={handleMenuClick} sx={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}> 
                    <img src={"/danh_muc.png"} alt="Danh muc" style={{ width: '40px', height: '25px', marginRight: '5px' }} />DANH MỤC </Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMenuClose}>Xe cộ</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Điện tử</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Gia dụng</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Đồ cho bé</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Thú cưng</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Thực phẩm</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Văn phòng</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Việc làm</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Thời trang</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Cho tặng</MenuItem>
                    </Menu>
                    <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
                        <TextField 
                            variant="outlined" 
                            placeholder="Tìm kiếm..." 
                            size="small" 
                            sx={{ bgcolor: 'white', borderRadius: 1, width: '500px'}} 
                        />
                    </Box>
                    <Button sx={{ color: 'white', marginLeft: 2 }}><NotificationsIcon /></Button>
                    <Button sx={{ color: 'white', marginLeft: 2 }}><MessageIcon /></Button>
                    <Button sx={{ color: 'white', marginLeft: 2, marginRight: 1 }}><ShoppingCartIcon /></Button>
                    <Button variant='outlined' color={'inherit'} onClick={handleLogInClick} sx={{ 
                        fontSize: '1.0rem', 
                        marginRight: '10px', 
                        color: '#000000', 
                        borderRadius: '9px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        fontWeight: 'bold',
                    }}>
                        <NoteIcon fontSize='small' style={{ textTransform: 'none', marginRight: '8px', fontWeight: 'bold' }} /> ĐĂNG TIN
                    </Button>
                    <Button variant='outlined' color={'inherit'} onClick={handleLogInClick} sx={{ 
                        fontSize: '1.0rem', 
                        marginRight: '10px', 
                        color: '#000000', 
                        borderRadius: '9px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        fontWeight: 'bold',
                    }}>
                        <LoginIcon fontSize='small' style={{ textTransform: 'none', marginRight: '5px', fontWeight: 'bold' }} /> ĐĂNG NHẬP
                    </Button>
                </Toolbar>
            </AppBar>
  
        <Box sx={{ maxWidth: '80%' , mx: 'auto', mt: 4, padding: 2, bgcolor: '#fff', borderRadius: '8px', boxShadow: 2 }}>
        <Button
                fullWidth
                onClick={handlePostClick}
                variant="outlined" // Sử dụng variant outlined để có viền
                sx={{ 
                    mb: 2,
                    borderColor: '#B0BEC5', // Màu viền xám
                    color: '#000000', // Màu chữ đen
                    justifyContent: 'flex-start', // Căn trái nội dung
                    textAlign: 'left', // Căn trái văn bản
                    padding: '10px 16px', // Thêm một chút padding
                    '&:hover': {
                        borderColor: '#90A4AE', // Màu viền khi hover
                        backgroundColor: 'rgba(176, 190, 197, 0.1)', // Màu nền nhẹ khi hover
                    },
                }}
            >
                Danh Mục Sản Phẩm
            </Button>
            <img src={"/post.png"} alt="Post" style={{ width: '800px', height: '600px', marginRight: '5px' }} />
        </Box>
        {/* </Box> */}
  {showPostTextBox && (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Màu nền overlay
                    zIndex: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backdropFilter: 'blur(8px)', // Làm mờ nền
                }}
            />
            <div style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#FFFFFF', 
                backgroundSize: 'cover',
                padding: '50px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <Stack spacing={2} alignItems="center">
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography style={{fontWeight: 'bold'}} variant='h5'>CHỌN DANH MỤC SẢN PHẨM</Typography>

                    <Button variant="outlined" 
                                sx={{
                                    display: 'flex', 
                                    justifyContent: 'flex-start',
                                    textAlign: 'left', 
                                    padding: '10px 16px', 
                                    flexDirection: 'column', // Sắp xếp theo chiều dọc
                                    alignItems: 'flex-start',
                                }}
                    // onClick={() => handleCategorySelect('Category 1')} 
                    fullWidth>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CarIcon style={{ fontSize: 25, marginRight: 15 }} />
                            <Typography variant="body1" fontWeight="bold">Xe cộ</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                            Ô tô, xe máy, xe tải, xe ben, xe điện, xe đạp, phụ tùng xe, phương tiện khác
                        </Typography>
                    </Button>

                    <Button variant="outlined" 
                                sx={{
                                    display: 'flex', 
                                    justifyContent: 'flex-start',
                                    textAlign: 'left', 
                                    padding: '10px 16px', 
                                    flexDirection: 'column', // Sắp xếp theo chiều dọc
                                    alignItems: 'flex-start',
                                }}
                    // onClick={() => handleCategorySelect('Category 1')} 
                    fullWidth>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WorkIcon style={{ fontSize: 25, marginRight: 15 }} />
                            <Typography variant="body1" fontWeight="bold">Việc làm</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                            Shipper, bảo vệ, IT, tuyển dụng, gia sư, bồi bàn, giúp việc, đầu bếp...... 
                        </Typography>
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            padding: '10px 16px',
                            flexDirection: 'column', // Sắp xếp theo chiều dọc
                            alignItems: 'flex-start', // Căn trái
                        }}
                        fullWidth
                        // onClick={() => handleCategorySelect('Category 1')}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ComputerIcon style={{ fontSize: 25, marginRight: 15 }} />
                            <Typography variant="body1" fontWeight="bold">Đồ điện tử</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                            Điện thoại, Tablet, Laptop - PC - TV, Âm thanh - Camera - Linh kiện, Phụ kiện
                        </Typography>
                    </Button>
                    <Button variant="outlined" 
                                sx={{
                                    display: 'flex', 
                                    justifyContent: 'flex-start',
                                    textAlign: 'left', 
                                    padding: '10px 16px', 
                                    flexDirection: 'column', // Sắp xếp theo chiều dọc
                                    alignItems: 'flex-start',
                                }}
                    // onClick={() => handleCategorySelect('Category 1')} 
                    fullWidth>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <KitchenIcon style={{ fontSize: 25, marginRight: 15 }} />
                            <Typography variant="body1" fontWeight="bold">Các sản phẩm khác</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                            Điện lạnh - Đồ gia dụng, Nội thất, Thời trang, Thực phẩm, Thú cưng,  Văn phòng
                        </Typography>
                    </Button>
                </Stack>      
            </div>
        </>
        )}


    {/* {showAdminLoginTextBox && (
      <>
      <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền overlay (có thể điều chỉnh)

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(8px)', // Sử dụng backdrop-filter để làm mờ nền
      }}
    />
        <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundImage: 'url("/gradient4.jpg")', 
            backgroundSize: 'cover',
            padding: '100px 100px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}>
              <Typography variant='h5' style={{fontWeight:'bold'}}>Admin User</Typography>
              <Typography gutterBottom variant='h5'></Typography>
              <TextField label='Username:' variant='standard' fullWidth required onChange={(e)=>setAdminName(e.target.value)}/>
              <TextField
                  label="Password:"
                  variant="standard"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              <Typography gutterBottom variant='h2'></Typography>
              <Button startIcon={<SendIcon/> } variant='contained' color={'inherit'} onClick={handleAdminDangNhap} style={{ 
                fontSize: '1.0rem', // Kích thước của nút
                marginRight: '10px', // Khoảng cách so với mép màn hình bên phải
                color: '#380B61', // Màu chữ của nút
                backgroundColor: '#FFFFFF', // Màu nền của nút
                border: '0px solid #FFFFFF', // Viền nằm trong nút
                borderRadius: '9px', // Bo tròn góc của viền
                padding: '7px 25px',
                display: 'flex', // Sử dụng flexbox để căn chỉnh
                alignItems: 'center', 
                fontWeight: 'bold',
              }}>Đăng Nhập</Button>
        </div>
      </>

    )}

    {showTeachersLoginTextBox &&(
      <>
          <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền overlay (có thể điều chỉnh)
    
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(8px)', // Sử dụng backdrop-filter để làm mờ nền
          }}
        />
        <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundImage: 'url("/gradient4.jpg")', 
            backgroundSize: 'cover',
            padding: '100px 100px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}>
            <Typography variant='h5' style={{fontWeight:'bold'}}>Teacher User</Typography>
            <Typography gutterBottom variant='h5'></Typography>
            <TextField label='Username:' variant='standard' fullWidth required onChange={(e)=>setTeachersName(e.target.value)}/>
            <TextField
                  label="Password:"
                  variant="standard"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setTeachersPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
            <Typography gutterBottom variant='h2'></Typography>
            <Button startIcon={<SendIcon/> } variant='contained' color={'inherit'} onClick={handleTeachersDangNhap} style={{ 
              fontSize: '1.0rem', // Kích thước của nút
              marginRight: '10px', // Khoảng cách so với mép màn hình bên phải
              color: '#380B61', // Màu chữ của nút
              backgroundColor: '#FFFFFF', // Màu nền của nút
              border: '0px solid #FFFFFF', // Viền nằm trong nút
              borderRadius: '9px', // Bo tròn góc của viền
              padding: '7px 25px',
              display: 'flex', // Sử dụng flexbox để căn chỉnh
              alignItems: 'center', 
              fontWeight: 'bold',
            }}>Đăng Nhập</Button>
        </div>
</>
    )}

    {showStudentsLoginTextBox && (
      <>
      <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền overlay (có thể điều chỉnh)
   
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(8px)', // Sử dụng backdrop-filter để làm mờ nền
      }}
    />
        <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundImage: 'url("/gradient4.jpg")', 
            backgroundSize: 'cover',
            padding: '100px 100px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}>
            <Typography variant='h5' style={{fontWeight:'bold'}}>Student User</Typography>
            <Typography gutterBottom variant='h5'></Typography>
                <TextField  label='Username:' variant='standard' fullWidth required onChange={(e)=>setStudentsName(e.target.value)}/>
                <TextField
                  label="Password:"
                  variant="standard"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setStudentsPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography gutterBottom variant='h2'></Typography>
                <Button startIcon={<SendIcon/> } variant='contained' color={'inherit'} onClick={handleStudentsDangNhap} style={{ 
                  fontSize: '1.0rem', // Kích thước của nút
                  marginRight: '10px', // Khoảng cách so với mép màn hình bên phải
                  color: '#380B61', // Màu chữ của nút
                  backgroundColor: '#FFFFFF', // Màu nền của nút
                  border: '0px solid #FFFFFF', // Viền nằm trong nút
                  borderRadius: '9px', // Bo tròn góc của viền
                  padding: '7px 25px',
                  display: 'flex', // Sử dụng flexbox để căn chỉnh
                  alignItems: 'center', 
                  fontWeight: 'bold',
                }}>Đăng Nhập</Button>
        </div>
        </>
    )} */}

    {/* <Box mt={20}> 

      <Typography variant='h1' color='#FFFFFF' gutterBottom style={{ fontWeight: 'bold' }} >TRANG CHỦ</Typography>
      <Typography variant='h2' color='#FFFFFF' style={{ fontWeight: 'bold' }}>HO CHI MINH HOGWARTS UNIVERSITY </Typography>
      
    </Box> */}
    </div>
  );
}

export default Post;
 