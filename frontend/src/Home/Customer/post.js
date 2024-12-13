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
import KitchenIcon from '@mui/icons-material/Kitchen';
import CloseIcon from '@mui/icons-material/Close'; // Biểu tượng đóng
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HomeIcon from '@mui/icons-material/Home';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BookIcon from '@mui/icons-material/Book';
import PetsIcon from '@mui/icons-material/Pets';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {  Popover, List, ListItem, ListItemText } from '@mui/material';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
function Post() {
    const [showPostTextBox, setShowPostTextBox] = useState(false);
    const navigate = useNavigate();
    const CustomerUserID = localStorage.getItem('CustomerUserID');
    const handlePostClick = () => {
      // Hiển thị ô vuông khi bấm nút SignUp
        setShowPostTextBox(true);
    };
      const handleClose1 = () => {
        setShowPostTextBox(false);
    };
    const handleLogOut = (e) =>{
      localStorage.removeItem('CustomerUserID');
      localStorage.removeItem('CustomerName');
      navigate('/home');
  }


  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleHome = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer');
  };
  const handlePost_XeCo = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/post_xeco');
  };
  const handlePost_ViecLam = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/post_vieclam');
  };
  const handlePost_DoDienTu = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/post_dodientu');
  };
  const handlePost_ThoiTrang = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/post_thoitrang');
  };
  const handlePost_PhongTro = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/post_phongtro');
  };
  const handlePost_DoGiaDung = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/post_dogiadung');
  };
  const handlePost_Sach = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/post_sach');
  };
  const handlePost_ThuCung = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/post_thucung');
  };

  const handleChat = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/chat');
  };
  const handlePost = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/post');
  };
  const handleQuanLi = (e)=> {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer/quan_li_tin');
  };
  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = (event) => {
      event.preventDefault();
      if (searchTerm) {
        navigate(`/home/customer/search?title=${encodeURIComponent(searchTerm)}`);
      }
    };
  
    return (
      <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSearch}>
          <TextField 
            variant="outlined" 
            placeholder="Tìm kiếm..." 
            size="small" 
            sx={{ bgcolor: 'white', borderRadius: 1, width: '500px' }} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </Box>
    );
  };
  const [notifications, setNotifications] = useState([]);

const fetchNotifications = async () => {
    try {
        const response = await axios.get(`http://localhost:9193/api/v1/notifications/${CustomerUserID}/all`);
        console.log(response);
        if (response.data.message === "Success") {
            // alert('két nôi thanh công');
            setNotifications(response.data.data);
        }
    } catch (error) { 
        console.error("Error fetching notifications:", error);
        // alert('fail rôi');
    }
};
const [anchorE2, setAnchorE2] = useState(null);
const handleOpen = (event) => {
    fetchNotifications(); // Gọi API khi mở modal
    // setOpen(true);
    setAnchorE2(event.currentTarget); 
};

const handleClose = () => {
    // setOpen(false);
    setAnchorE2(null);
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
                    <img src="/Avatar.png" alt="Icon" width="60" height="40" />
                    <Typography variant='h5' style={{ fontWeight: 'bold' }} align='left' sx={{ flexGrow: 1 }} color='#FFFFFF'> CHỢ AB </Typography>
                    </Button>
                    <Button onClick={handleMenuClick} sx={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}> 
                    <img src={"/danh_muc.png"} alt="Danh muc" style={{ width: '40px', height: '25px', marginRight: '5px' }} />DANH MỤC </Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={()=> navigate('/home/customer/search_category?category=Xe Cộ')}>Xe cộ</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/customer/search_category?category=Điện thoại')}>Điện thoại</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/customer/search_category?category=Đồ gia dụng')}>Đồ gia dụng</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/customer/search_category?category=Phòng trọ')}>Phòng trọ</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/customer/search_category?category=Thú cưng')}>Thú cưng</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/customer/search_category?category=Sách')}>Sách</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/customer/search_category?category=Việc làm')}>Việc làm</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/customer/search_category?category=Thời trang')}>Thời trang</MenuItem>
                    </Menu>
                    <SearchComponent/>
                    <Button sx={{ color: 'white', marginLeft: 1 }} onClick={handleOpen}><NotificationsIcon /></Button>
                      <Popover
                          open={Boolean(anchorE2)}
                          anchorEl={anchorE2}
                          onClose={handleClose}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                          }}
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                          }}
                      >
                          <Box sx={{ 
                              width: 400,
                              bgcolor: 'background.paper',
                              boxShadow: 3,
                              p: 2,
                              borderRadius: 1,
                              border: '1px solid #e0e0e0', // Đường viền nhẹ
                              transition: 'box-shadow 0.3s ease', // Hiệu ứng chuyển đổi cho box-shadow
                              '&:hover': {
                                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Hiệu ứng khi hover
                              }
                          }}>
                              <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                                  Thông báo
                              </Typography>
                              <List sx={{ padding: 0 }}>
                                  {notifications.map(notification => (
                                      <ListItem 
                                          key={notification.id} 
                                          sx={{ 
                                              '&:hover': { 
                                                  bgcolor: '#f5f5f5', // Nền khi hover
                                              },
                                              padding: '10px 16px', // Padding cho mỗi mục
                                              borderRadius: 1, // Bo góc cho mỗi mục
                                              transition: 'background-color 0.2s ease', // Hiệu ứng chuyển đổi
                                          }}
                                      >
                                          <ListItemText 
                                              primary={notification.content} 
                                              secondary={new Date(notification.create_at).toLocaleString()} 
                                              primaryTypographyProps={{ fontWeight: 'bold', color: '#000' }} // Kiểu chữ cho tiêu đề
                                              secondaryTypographyProps={{ color: '#666' }} // Kiểu chữ cho thời gian
                                          />
                                      </ListItem>
                                  ))}
                              </List>
                          </Box>
                      </Popover>
                    <Button sx={{ color: 'white', marginLeft: 1 }} onClick={handleChat} ><MessageIcon /></Button>
                    <Button sx={{ color: 'white', marginLeft: 1 }} onClick={()=>navigate('/home/customer/member')} ><CardMembershipIcon /></Button>
                    <Button sx={{ color: 'white', marginLeft: 1, marginRight: 1 }} onClick ={handleQuanLi} ><ShoppingBagIcon /></Button>
                    <Button variant='outlined' color={'inherit'} onClick={handlePostClick} sx={{ 
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
                    <Button variant='outlined' color={'inherit'} onClick={handleLogOut} sx={{ 
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
        {showPostTextBox && (
    <>
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Overlay background color
                zIndex: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        />
        <div style={{ 
            position: 'absolute',
            top: '50%', // Adjusted spacing from the top
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#FFFFFF', 
            padding: '50px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            display: 'grid', // Use grid layout
            gridTemplateColumns: 'repeat(2, 1fr)', // Two columns
            gap: '20px', // Space between buttons
        }}>
            <Box sx={{ position: 'absolute', top: 15, right: 10 }}>
                <IconButton onClick={handleClose1}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Button variant="outlined" 
                sx={{
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    textAlign: 'left', 
                    padding: '10px 16px',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
                onClick={handlePost_XeCo}
                fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CarIcon style={{ fontSize: 25, marginRight: 15 }} />
                    <Typography variant="body1" fontWeight="bold">Xe cộ</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                    Ô tô, xe máy, xe tải, xe đạp và phụ tùng.
                </Typography>
            </Button>

            <Button variant="outlined" 
                sx={{
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    textAlign: 'left', 
                    padding: '10px 16px', 
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
                onClick={handlePost_ViecLam}
                fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WorkIcon style={{ fontSize: 25, marginRight: 15 }} />
                    <Typography variant="body1" fontWeight="bold">Việc làm</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                    Cơ hội việc làm cho mọi ngành nghề.
                </Typography>
            </Button>

            <Button variant="outlined" 
                sx={{
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    textAlign: 'left', 
                    padding: '10px 16px', 
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
                onClick={handlePost_DoDienTu}
                fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIphoneIcon style={{ fontSize: 25, marginRight: 15 }} />
                    <Typography variant="body1" fontWeight="bold">Điện thoại</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                    Các loại điện thoại, phụ kiện và dịch vụ.
                </Typography>
            </Button>

            <Button variant="outlined" 
                sx={{
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    textAlign: 'left', 
                    padding: '10px 16px', 
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
                onClick={handlePost_PhongTro}
                fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HomeIcon  style={{ fontSize: 25, marginRight: 15 }} />
                    <Typography variant="body1" fontWeight="bold">Phòng trọ</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                    Tìm kiếm phòng trọ, căn hộ cho thuê.
                </Typography>
            </Button>

            <Button variant="outlined" 
                sx={{
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    textAlign: 'left', 
                    padding: '10px 16px', 
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
                onClick={handlePost_DoGiaDung}
                fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <KitchenIcon  style={{ fontSize: 25, marginRight: 15 }} />
                    <Typography variant="body1" fontWeight="bold">Đồ gia dụng</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                    Mua bán đồ gia dụng, nội thất.
                </Typography>
            </Button>

            <Button variant="outlined" 
                sx={{
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    textAlign: 'left', 
                    padding: '10px 16px', 
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
                onClick={handlePost_ThoiTrang}
                fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckroomIcon  style={{ fontSize: 25, marginRight: 15 }} />
                    <Typography variant="body1" fontWeight="bold">Thời trang</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                    Thời trang nam, nữ và trẻ em.
                </Typography>
            </Button>

            <Button variant="outlined" 
                sx={{
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    textAlign: 'left', 
                    padding: '10px 16px', 
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
                onClick={handlePost_Sach}
                fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BookIcon  style={{ fontSize: 25, marginRight: 15 }} />
                    <Typography variant="body1" fontWeight="bold">Sách</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                    Sách mới và cũ cho mọi lứa tuổi.
                </Typography>
            </Button>

            <Button variant="outlined" 
                sx={{
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    textAlign: 'left', 
                    padding: '10px 16px', 
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
                onClick={handlePost_ThuCung}
                fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PetsIcon  style={{ fontSize: 25, marginRight: 15 }} />
                    <Typography variant="body1" fontWeight="bold">Thú cưng</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'gray', marginTop: 0.5 }}>
                    Mua bán thú cưng và phụ kiện.
                </Typography>
            </Button>
        </div>
    </>
)}



    </div>
  );
}

export default Post;
 