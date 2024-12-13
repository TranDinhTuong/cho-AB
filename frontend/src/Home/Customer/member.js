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
import {  Popover, List, ListItem, ListItemText } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
function Home() {

    const navigate = useNavigate();

    const CustomerUserID = localStorage.getItem('CustomerUserID');
    const CustomerName = localStorage.getItem("CustomerName");
    // alert(CustomerUserID + CustomerName );
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
const [check, setCheck] = useState(false);
const [check1, setCheck1] = useState(false);
const Member = () => {
    const [memberPackage, setMemberPackage] = useState([]);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const MemberPackages = async () => {
        try {
            const response = await axios.get('http://localhost:9193/api/v1/membershipPackages/all');
            if (response.data.message === 'Found!') {
                setMemberPackage(response.data.data);
            }
        } catch (error) {
            console.error('There was an error making the request:', error);
        }
    };
    // const checkTransaction = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:9193/api/v1/transactions/${CustomerUserID}/transaction`);
    //         if (response.data.message === 'Success') {
    //             // Nếu có giao dịch, xử lý dữ liệu
    //             const transactions = response.data.data; // Giả sử dữ liệu giao dịch nằm trong trường 'data'
    //             if (transactions) {
    //                 setCheck(true);
    //             } else {

    //             }
    //         } else {
                
    //             // alert('Không tìm thấy thông tin giao dịch.');
    //         }
    //     } catch (error) {
    //         setCheck1(true);
    //         // console.error('There was an error making the request:', error);
    //         // alert('Đã xảy ra lỗi khi kiểm tra giao dịch.');
    //     }
    // };
    const transaction = async  () => {
        const body = {
            amount: "4000", // Số tiền hoặc giá trị cần thiết
            type: "thanh cong", // Loại giao dịch
            membershipPackageId: selectedPackageId, // ID của gói thành viên
        };
        const type = 'Thông báo về gói thành viên';
        let content = 'Bạn đã mua thành công gói ';
        if(selectedPackageId === 1){
            content += 'tháng';
        } else if(selectedPackageId === 2){
            content += 'quý';
        } else if(selectedPackageId === 3){
            content += 'năm';
        }
        try {
            const response = await axios.post(`http://localhost:9193/api/v1/transactions/${CustomerUserID}/add`, body);
            if (response.data.message === 'Success') {
                alert('Mua gói thành công');
                const response = await axios.post(`http://localhost:9193/api/v1/notifications/${CustomerUserID}/add`, {
                    type, // Gửi mảng ids
                    content,
                  });
                  if (response.data.message === "Success"){
                    alert("Thông báo okok!");
                }
            }
        } catch (error) {
            console.error('There was an error making the request:', error);
        }
        
    };

    useEffect(() => {
        MemberPackages();
    }, []);

    return (
        <Box sx={{ maxWidth: '80%', mx: 'auto', mt: 4, padding: 2, bgcolor: '#fff', borderRadius: '8px', boxShadow: 2, mb: 4 }}>
            <img src="/member1.png" alt="Post" style={{ width: '800px', height: '400px', marginRight: '5px' }} />
            <Typography>
                <strong>Gói PRO</strong> - Giải pháp được thiết kế riêng cho nhà bán hàng và nhà tuyển dụng chuyên nghiệp
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {memberPackage.map((pkg) => (
                    <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                        <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, textAlign: 'center' }}>
                            <Typography variant="h6">{pkg.name}</Typography>
                            <Typography variant="body2">{pkg.description}</Typography>
                            <Typography variant="h6" color="primary">{`Giá: ${pkg.price.toLocaleString()} VNĐ`}</Typography>
                            <Button 
                                variant="contained" 
                                sx={{ bgcolor: '#66B2FF', color: 'white', mt: 2 }} 
                                onClick={() => {
                                    transaction(pkg.id)         
                                    // checkTransaction(); // Kiểm tra giao dịch
                                }}
                            >
                                Mua ngay
                            </Button>
                        </Box>
                    </Grid>
                    
                ))}
            </Grid>

        </Box>
    );
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
<Member/>
        <Box sx={{ width: '100%', mx: 'auto', backgroundColor: '#FFFFFF' , textAlign: 'left'}}>
        <Box sx={{ width: '60%', mx: 'auto', display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ flex: '1', marginRight: '10px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>HỖ TRỢ KHÁCH HÀNG</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {supportLinks.map((link, index) => (
                        <li key={index} style={{ marginBottom: '5px', fontSize: '14px', color: '#343a40' }}>
                            {link}
                        </li>
                    ))}
                </ul>
            </Box>

            <Box sx={{ flex: '1', marginRight: '10px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>VỀ CHỢ AB</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {aboutLinks.map((link, index) => (
                        <li key={index} style={{ marginBottom: '5px', fontSize: '14px', color: '#343a40' }}>
                            {link}
                        </li>
                    ))}
                </ul>
            </Box>

            <Box sx={{ flex: '1' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>LIÊN KẾT</h3>
                <img src={"/iconFb.png"} alt="Facebook" style={{ width: '40px', height: '40px', marginRight: '5px',borderRadius: '50%', }} />
                <img src={"/iconYt.png"} alt="Youtube" style={{ width: '40px', height: '40px', marginRight: '5px',borderRadius: '50%', }} />
            </Box>
            <Box sx={{ flex: '1' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>CHỨNG NHẬN</h3>
                <img src={"/chung_nhan.png"} alt="Chung Nhan" style={{ width: '110px', height: '40px', marginRight: '5px' }} />
            </Box>
          </Box>
        </Box>
    </div>
  );
}

export default Home;
 