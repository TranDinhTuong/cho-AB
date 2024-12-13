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
import CloseIcon from '@mui/icons-material/Close'; // Biểu tượng đóng
import { FormControl, InputLabel, FormHelperText } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {  Popover, List, ListItem, ListItemText } from '@mui/material';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
function Post_XeCo() {

    const navigate = useNavigate();


    const handleLogOut = (e) =>{
        localStorage.removeItem('CustomerUserID');
        localStorage.removeItem('CustomerName');
        navigate('/home');
    }


  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleHome = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/customer');
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

  const CustomerUserID = localStorage.getItem('CustomerUserID');

  function CreatePost() {
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Thu cung', // Changed category to "Thu cung"
        location: '',
        pet: {
            name: '', // Dog breed
            age: '', // Age
            size: '', // Size (large, small, etc.)
        },
    });

    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name in newPost.pet) {
            setNewPost((prevPost) => ({
                ...prevPost,
                pet: {
                    ...prevPost.pet,
                    [name]: value,
                },
            }));
        } else {
            setNewPost((prevPost) => ({
                ...prevPost,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Create the post
            const response = await axios.post(`http://localhost:9193/api/v1/posts/${CustomerUserID}/add`, {
                ...newPost,
            });
            const { message, data } = response.data;

            if (message === 'Success') {
                // If post creation is successful, upload the image
                if (image) {
                    const formData = new FormData();
                    formData.append('files', image);
                    formData.append('postId', data.id); // Link image to post

                    try {
                        const uploadResponse = await axios.post('http://localhost:9193/api/v1/images/upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });

                        if (uploadResponse.data.message === 'Upload Successfully!') {
                            alert('Tải ảnh lên thành công');
                        } else {
                            alert('Tải ảnh lên thất bại: ' + uploadResponse.data.message);
                        }
                    } catch (error) {
                        console.error('Error uploading image:', error);
                        alert('Tải ảnh lên thất bại');
                    }
                }

                alert('Tạo sản phẩm thành công');
                // Reset form
                setNewPost({
                    title: '',
                    description: '',
                    price: '',
                    location: '',
                    pet: {
                        name: '',
                        age: '',
                        size: '',
                    },
                });
                setImage(null); // Reset image after post
            } else {
                throw new Error(message);
            }
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('Tạo sản phẩm thất bại: ' + (error.response ? error.response.data.message : 'Có lỗi xảy ra'));
        }
    };

    return (
        <>
            <Box sx={{ padding: 2 }}>
                <Typography variant='h6' style={{ fontWeight: 'bold' }} align='left' color='#000000'> Hình ảnh thú cưng</Typography>
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                    <Grid item xs={12}>
                        <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <Box
                                sx={{
                                    border: '2px dashed gray',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '300px',
                                    width: '300px',
                                    position: 'relative',
                                }}
                            >
                                {image ? (
                                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={handleRemoveImage}
                                            sx={{ position: 'absolute', top: 0, right: 0 }}
                                        >
                                            X
                                        </Button>
                                    </Box>
                                ) : (
                                    <>
                                        <PhotoCamera sx={{ fontSize: 40 }} />
                                        <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                            Đăng ảnh lên
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        </label>
                    </Grid>
                </Grid>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, padding: 2 }}>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginBottom: 10 }} align='left' color='#000000'>
                    Thông tin thú cưng
                </Typography>
                {[
                    { label: 'Tên giống chó', name: 'name', required: true }, // Dog breed
                    { label: 'Tuổi', name: 'age', required: true }, // Age
                    { label: 'Kích cỡ', name: 'size', required: true }, // Size
                    { label: 'Giá cả', name: 'price', required: true },
                    { label: 'Tiêu đề', name: 'title', required: true },
                    { label: 'Mô tả chi tiết', name: 'description', required: true, multiline: true, rows: 4 },
                    { label: 'Địa chỉ cụ thể', name: 'location', required: true },
                ].map((field, index) => (
                    <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }} key={index}>
                        <InputLabel shrink sx={{ color: 'gray', transform: 'translate(14px, 3px) scale(0.75)' }}>
                            {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            placeholder=" "
                            size="large"
                            value={newPost[field.name]}
                            name={field.name}
                            onChange={handleChange}
                            required={field.required}
                            multiline={field.multiline}
                            rows={field.rows}
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 1,
                            }}
                        />
                    </FormControl>
                ))}
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Đăng tin
                </Button>
            </Box>
        </>
    );
}
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
                    <Button variant='outlined' color={'inherit'} onClick={handlePost} sx={{ 
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
                        <LoginIcon fontSize='small' style={{ textTransform: 'none', marginRight: '5px', fontWeight: 'bold' }} /> ĐĂNG XUẤT
                    </Button>
                </Toolbar>
            </AppBar>
  
            <Box sx={{ maxWidth: '70%', mx: 'auto', mt: 4, padding: 2, bgcolor: '#fff', borderRadius: '8px', boxShadow: 2, display: 'flex', alignItems: 'flex-start' }}>
            <CreatePost/>
        </Box>

    </div>
  );
}

export default Post_XeCo;
 