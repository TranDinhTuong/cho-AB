import PersonalIcon from '@mui/icons-material/Note';
import { AppBar, Toolbar, Typography, Box, Grid, Button, MenuItem, Select } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; 
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import PhoneIcon from '@mui/icons-material/Phone'; // Biểu tượng điện thoại
import StarIcon from '@mui/icons-material/Star'; // Biểu tượng ngôi sao
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Nhập biểu tượng tiền
import InfoIcon from "@mui/icons-material/Info"; // Nhập biểu tượng chữ i
import RefreshIcon from "@mui/icons-material/Refresh"; // Nhập biểu tượng "Đăng Lại"
import NotificationsIcon from "@mui/icons-material/Notifications"; // Nhập biểu tượng thông báo
import FacebookIcon from "@mui/icons-material/Facebook"; // Biểu tượng Facebook
import YouTubeIcon from "@mui/icons-material/YouTube"; // Biểu tượng YouTube
import AppleIcon from "@mui/icons-material/Apple"; // Biểu tượng App Store
import AndroidIcon from "@mui/icons-material/Android"; // Biểu tượng Google Play
import QRCodeIcon from "@mui/icons-material/QrCode"; // Biểu tượng mã QR
import {useNavigate}  from 'react-router-dom';
import { styled} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import MessageIcon from '@mui/icons-material/Message'; // Biểu tượng tin nhắn
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {  Popover, List, ListItem, ListItemText } from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import { Card, CardContent } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PeopleIcon from '@mui/icons-material/People';
function ManagementPage() {
    const [sortOption, setSortOption] = useState('Ngày Xóa Gần Nhất');
    const [filterOption, setFilterOption] = useState('Tất Cả Tin Đăng');

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };
    const supportLinks = [
  "Trung tâm trợ giúp",
  "An toàn mua bán",
  "Liên hệ hỗ trợ"
];

const aboutLinks = [
  "Giới thiệu",
  "Quy chế hoạt động sàn",
  "Chính sách bảo mật",
  "Giải quyết tranh chấp",
  "Tuyển dụng",
  "Truyền thông",
  "Blog"
];

const [showUserTextBox, setShowUserTextBox] = useState(false);

const [showAdminLoginTextBox, setShowAdminLoginTextBox] = useState(false);
const [showCustomersLoginTextBox, setShowCustomersLoginTextBox] = useState(false);


const [showPostTextBox, setShowPostTextBox] = useState(false);




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
    
};
const handlePostClick = () => {
  // Hiển thị ô vuông khi bấm nút SignUp
    setShowPostTextBox(true);
};
    

const handleAdminLoginClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    setShowAdminLoginTextBox(true);
    setShowUserTextBox(false);
    setShowCustomersLoginTextBox(false);
    
};
const handleCustomersLoginClick = () => {
  // Hiển thị ô vuông khi bấm nút SignUp
  setShowCustomersLoginTextBox(true);
  setShowUserTextBox(false);
  setShowAdminLoginTextBox(false);
  
};
const handleTeachersLoginClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    
    setShowCustomersLoginTextBox(false);
    setShowAdminLoginTextBox(false);
    
};
const handleStudentsLoginClick = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    
    setShowAdminLoginTextBox(false);
    setShowCustomersLoginTextBox(false);
   
    setShowUserTextBox(false);
};


const [anchorEl, setAnchorEl] = useState(null);

const handleMenuClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleHome = () => {
// Hiển thị ô vuông khi bấm nút SignUp
navigate('/home/admin');
};
const handlePost = (e) => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/admin/post');
  };
  const handleQuanLi = (e)=> {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/admin/quan_li_tin');
  };

const handleMenuClose = () => {
  setAnchorEl(null);
};
const [anchorE2, setAnchorE2] = useState(null);
const handleClose = () => {
    // setOpen(false);
    setAnchorE2(null);
};
const [notifications, setNotifications] = useState([]);

const fetchNotifications = async () => {
    try {
        const response = await axios.get('http://localhost:9193/api/v1/notifications/all');
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
const handleOpen = (event) => {
    fetchNotifications(); // Gọi API khi mở modal
    // setOpen(true);
    setAnchorE2(event.currentTarget); 
};
const handleLogOut = (e) => {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('AdminUserID'); // Thay thế nếu bạn lưu ID admin
    localStorage.removeItem('AdminName'); // Thay thế nếu bạn lưu tên admin
    navigate('/home'); // Chuyển hướng về trang home
}
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');

// Hàm để lấy danh sách người dùng
const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:9193/api/v1/users/role?page=0');
        if (response.data.message === "Success") {
            setUsers(response.data.data);
        } else {
            setError('Không thể tải dữ liệu người dùng');
        }
    } catch (error) {
        setError('Không còn người dùng nào được quản lí.');
        console.error("Error fetching users:", error);
    } finally {
        setLoading(false);
    }
};


// Hàm để xóa người dùng
// Hàm để xóa người dùng
const handleDeleteUser = async (userId) => {
    // Prompt the user for confirmation before deletion
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    
    if (!confirmed) {
        return; // Exit if the user cancels
    }

    console.log("Users before deletion:", users);
    try {
        const response = await axios.delete(`http://localhost:9193/api/v1/users/${userId}/delete`);
        fetchUsers();

        // if (response.data.message === "Success") {
        //     setSnackbarMessage('Người dùng đã được xóa thành công');
           
        //     setSnackbarOpen(true);
        //     setUsers(prevUsers => {
        //         const updatedUsers = prevUsers.filter(user => user.id !== userId);
        //         console.log("Users after deletion:", updatedUsers);
        //         return updatedUsers;
        //     });
        // } else {
        //     setError('Không thể xóa người dùng');
        // }
    } catch (error) {
        setError('Không có người dùng để quản lí');
        console.error("Error deleting user:", error);
    }
};
// Gọi API khi component được render
useEffect(() => {
    fetchUsers();
}, []);

const handleSnackbarClose = () => {
    setSnackbarOpen(false);
};

return (
        <Box><div className="App" style={{ 
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
                    <Button sx={{ color: 'white', marginLeft: 0 }} onClick={handleOpen}><NotificationsIcon /></Button>
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
                              width: 300,
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
                    <Button sx={{ color: 'white', marginLeft: 2 }} onClick={()=>navigate('/home/admin/quan_li_nguoi_dung')}><PeopleIcon/></Button>
                    <Button sx={{ color: 'white', marginLeft: 2, mr: 2 }} onClick={()=>navigate('/home/admin/quan_li_tin')}><ShoppingBagIcon /></Button>
                    
                    <Button variant='outlined' color={'inherit'}  sx={{ 
                        fontSize: '1.0rem', 
                        marginRight: '10px', 
                        color: '#000000', 
                        borderRadius: '9px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        fontWeight: 'bold',
                    }}>
                        <PeopleIcon fontSize='small' style={{ textTransform: 'none', marginRight: '8px', fontWeight: 'bold' }} /> Admin
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
            <Box sx={{ 
    bgcolor: '#FFF9C4', 
    height: 'auto', 
    width: '80%', 
    borderRadius: '15px', 
    mx: 'auto', 
    mt: 2, 
    padding: 3, 
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    transition: '0.3s',
    '&:hover': { 
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)', 
        transform: 'scale(1.02)', // Thêm hiệu ứng phóng to khi hover
    }
}}>
    <AccountCircle sx={{ fontSize: 50, marginRight: 2, color: '#1976d2' }} />
    <Typography variant="h6" color="#333" align="left" sx={{ fontWeight: 'bold', transition: 'color 0.3s', '&:hover': { color: '#1976d2' } }}>
        ADMIN
    </Typography>
</Box>
<Box sx={{ 
    padding: 4, 
    bgcolor: '#E0F7FA', // Màu nền xanh nhạt cho tiêu đề
    borderRadius: 3, 
    boxShadow: 4, 
    width: '80%', // Đảm bảo khung tiêu đề có cùng kích thước với khung tên
    mx: 'auto', // Căn giữa
    mt: 2, // Khoảng cách
    border: '2px solid #80DEEA', // Viền màu xanh nhạt
}}>
    <Typography variant="h4" sx={{ 
        mb: 4, 
        fontWeight: 'bold', 
        color: '#2C3E50', 
        textAlign: 'center', 
        textTransform: 'uppercase', 
        letterSpacing: 1.5,
        transition: 'color 0.2s ease, transform 0.2s ease, text-shadow 0.2s ease', // Thêm hiệu ứng chuyển đổi
        '&:hover': { 
            color: '#2980B9', 
            transform: 'scale(1.05)', // Phóng to khi hover
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Thêm bóng đổ khi hover
        }, 
    }}>
        Danh sách người dùng
    </Typography>
    {loading ? (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%' 
        }}>
            <CircularProgress color="primary" />
        </Box>
    ) : error ? (
        <Typography color="error" sx={{ 
            mb: 3, 
            fontWeight: 'bold', 
            textAlign: 'center', 
        }}>
            {error}
        </Typography>
    ) : (
        <List sx={{ 
            bgcolor: '#F9FAFB', // Màu nền xám nhạt cho thông tin người dùng
            borderRadius: 2, 
            boxShadow: 1, 
            maxHeight: 450, 
            overflowY: 'auto',
        }}>
            {users.map(user => (
                <ListItem 
                    key={user.id} 
                    sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 3,
                        borderBottom: '1px solid #E0E0E0',
                        transition: 'background-color 0.3s ease, transform 0.2s ease',
                        '&:hover': { 
                            bgcolor: '#E8F6F3', 
                            transform: 'scale(1.02)', 
                        },
                    }}
                >
                    <Box 
                        sx={{ 
                            bgcolor: '#FFFFFF', // Màu nền trắng cho thông tin người dùng
                            borderRadius: 2, 
                            padding: 2, 
                            boxShadow: 3, // Đổ bóng cho độ sâu
                            width: '100%', // Full width for user info
                        }}
                    >
                        <ListItemText 
                            primary={
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2980B9' }}>
                                    {user.name}
                                </Typography>
                            } 
                            secondary={
                                <>
                                    <Typography sx={{ color: '#7F8C8D' }}>
                                        <strong>Email:</strong> {user.email}
                                    </Typography>
                                    <Typography sx={{ color: '#7F8C8D' }}>
                                        <strong>Số điện thoại:</strong> {user.phone}
                                    </Typography>
                                    <Typography sx={{ color: '#7F8C8D' }}>
                                        <strong>Địa chỉ:</strong> {user.address || 'Chưa có thông tin'}
                                    </Typography>
                                    <Typography sx={{ color: '#7F8C8D' }}>
                                        <strong>Ngày đăng ký:</strong> {new Date(user.createdAt).toLocaleDateString() || 'Chưa có thông tin'}
                                    </Typography>
                                </>
                            } 
                            primaryTypographyProps={{ 
                                fontWeight: 'bold', 
                                color: '#2980B9', 
                            }} 
                            secondaryTypographyProps={{ 
                                color: '#7F8C8D', 
                                sx: { lineHeight: 1.5 } // Tăng khoảng cách giữa các dòng
                            }} 
                        />
                    </Box>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleDeleteUser(user.id)}
                        sx={{ 
                            borderRadius: 5, 
                            '&:hover': { bgcolor: '#C0392B', transform: 'scale(1.05)' }, 
                            padding: '8px 16px', 
                            fontWeight: 'bold', 
                            transition: 'background-color 0.2s ease, transform 0.2s ease', 
                        }}
                    >
                        Xóa
                    </Button>
                </ListItem>
            ))}
        </List>
    )}
</Box>

   


    {}

    {}
    </div>
    <Box sx={{ 
    width: '100%', 
    mx: 'auto', 
    backgroundColor: '#FFFFFF', 
    textAlign: 'left',
    padding: 4,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
    borderRadius: '10px',
    transition: 'background-color 0.3s, transform 0.3s',
    '&:hover': { 
        backgroundColor: '#f5f5f5', 
        transform: 'scale(1.02)', 
    },
}}>
    <Box sx={{ 
        width: '80%', 
        mx: 'auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
    }}>
        <Box sx={{ flex: '1', margin: '10px', padding: 2, backgroundColor: '#e3f2fd', borderRadius: '8px', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>HỖ TRỢ KHÁCH HÀNG</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {supportLinks.map((link, index) => (
                    <li key={index} style={{ marginBottom: '5px', fontSize: '14px', color: '#343a40', transition: 'color 0.3s', '&:hover': { color: '#1976d2', cursor: 'pointer' } }}>
                        {link}
                    </li>
                ))}
            </ul>
</Box>

        <Box sx={{ flex: '1', margin: '10px', padding: 2, backgroundColor: '#ffe0b2', borderRadius: '8px', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>VỀ CHỢ AB</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {aboutLinks.map((link, index) => (
                    <li key={index} style={{ marginBottom: '5px', fontSize: '14px', color: '#343a40', transition: 'color 0.3s', '&:hover': { color: '#1976d2', cursor: 'pointer' } }}>
                        {link}
                    </li>
                ))}
            </ul>
        </Box>

        <Box sx={{ flex: '1', margin: '10px', padding: 2, backgroundColor: '#c8e6c9', borderRadius: '8px', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>LIÊN KẾT</h3>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={"/iconFb.png"} alt="Facebook" style={{ width: '40px', height: '40px', marginRight: '10px', borderRadius: '50%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }} />
                <img src={"/iconYt.png"} alt="Youtube" style={{ width: '40px', height: '40px', borderRadius: '50%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }} />
            </Box>
        </Box>

        <Box sx={{ flex: '1', margin: '10px', padding: 2, backgroundColor: '#fff9c4', borderRadius: '8px', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>CHỨNG NHẬN</h3>
            <img src={"/chung_nhan.png"} alt="Chứng Nhận" style={{ width: '110px', height: '40px', marginRight: '5px' }} />
        </Box>
    </Box>
</Box>
   
        
        </Box>
    );
}

export default ManagementPage;