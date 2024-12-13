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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function Home() {

    const [showPassword, setShowPassword] = useState(false);
    // Đăng nhập
    const [showUserTextBox, setShowUserTextBox] = useState(false);
    const [showAdminLoginTextBox, setShowAdminLoginTextBox] = useState(false);
    const [showCustomersLoginTextBox, setShowCustomersLoginTextBox] = useState(false);
    // Tài khoản
    const [Admin_name,setAdminName]=useState('')
    const [Admin_password, setAdminPassword] = useState('')
    const [Customers_name,setCustomersName]=useState('')
    const [Customers_password, setCustomersPassword] = useState('')
    // Đăng kí
    const [showSignUpTextBox, setShowSignUpTextBox] = useState(false);
    const [SignUp_name,setSignUpName]=useState('')
    const [SignUp_email,setSignUpEmail]=useState('')
    const [SignUp_password, setSignUpPassword] = useState('')
    const [Noti_SignUp_Success, setNotiSignUpSuccess] = useState('')
    const [Noti_SignUp_Fail, setNotiSignUpFail] = useState('')
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
        '&: hover': { backgroundColor: '#87CEEB'}
        
  })

    const handleLogInClick = () => {
      // Hiển thị ô vuông khi bấm nút SignUp
        setShowUserTextBox(true);
        setShowAdminLoginTextBox(false);
        setShowCustomersLoginTextBox(false);
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
  const handleSignUp = () => {
    setShowSignUpTextBox(true);
    setShowUserTextBox(false);
    setShowAdminLoginTextBox(false);
    setShowCustomersLoginTextBox(false);
  } 
    
    // async function authenticate(username, password,role) { 
    //   try {
    //     const response = await axios.post('http://localhost:9193/api/v1/auth/login', null, {
    //       params: {
    //         username,
    //         password,
    //         role,
    //       }
    //     });
    //     const { status, message, data } = response.data;
    //     if (status === 'success') {
    //       return { success: true, message, data };
    //     } else {
    //       throw new Error(message);
    //     }
    //   } catch (error) {
    //     console.log("fail")
    //     if (error.response) {
    //       // Lỗi từ phía máy chủ
    //       const { status, data } = error.response;
    //       if (status === 404) {
    //         // Xử lý lỗi 404 (Not Found)
    //         console.error('User not found:', data.message);
    //       } else if (status === 401) {
    //         // Xử lý lỗi 401 (Unauthorized)
    //         console.error('Authentication failed:', data.message);
    //       } else {
    //         // Xử lý lỗi khác
    //         console.error('Error:', data.message);
    //       }
    //     } else if (error.request) {
    //       // Lỗi khi gửi yêu cầu
    //       console.error('Request error:', error.message);
    //     } else {
    //       // Lỗi khác
    //       console.error('Error:', error.message);
    //     }
    
    //     return { success: false, message: error.message };
    //   }
    // }
    async function authenticate(email, password) {
      try {
          const response = await axios.post('http://localhost:9193/api/v1/auth/login', {
              email,
              password,
          });
  
          const {message, data } = response.data;
          if (message === 'Login Success!') {
              return { success: true, message, data };
          } else {
              throw new Error(message);
          }
      } catch (error) {
          console.log("fail");
          if (error.response) {
              const { status, data } = error.response;
              if (status === 404) {
                  console.error('User not found:', data.message);
              } else if (status === 401) {
                  console.error('Authentication failed:', data.message);
              } else {
                  console.error('Error:', data.message);
              }
          } else if (error.request) {
              console.error('Request error:', error.message);
          } else {
              console.error('Error:', error.message);
          }
          return { success: false, message: error.message };
      }
    }
  
    async function registerUser(name, email, password) {
        try {
            const response = await axios.post('http://localhost:9193/api/v1/users/add', {
                name,
                email,
                password,
            });
    
            const {message, data } = response.data;
            if (message === 'Create User Success!') {
                return { success: true, message, data };
            } else {
                throw new Error(message);
            }
        } catch (error) {
            console.error("Registration failed");
            if (error.response) {
                const { status, data } = error.response;
                console.error('Error:', data.message);
            } else {
                console.error('Error:', error.message);
            }
            return { success: false, message: error.message };
        }
    }

    const handleAdminDangNhap = async() => {
      if (Admin_name && Admin_password )
        {
            authenticate(Admin_name,Admin_password)
            .then(result => {
              if (result.success) {
                
                  console.log('Authentication successful:', result.data.id);
                  AdminLoginSuccessPage(result.data.id,Admin_name)//sẽ truyền thêm các dữ liệu khác khi đây ko còn là user mà là đối tượng
                  navigate('/home/admin');
                
              } else {
                console.error('Authentication failed:', result.message);
                alert('Error: Đăng Nhập Thất Bại!456');
              }
            })
            .catch(error => {
              console.error('An unexpected error occurred:', error);
            });
        }
        else
        {
            alert("Bạn chưa điền đầy đủ dữ liệu!")
            console.log("Thiếu dữ liệu")
        }
    }

    const handleCustomersDangNhap = (e) => {
      if (Customers_name && Customers_password )
        {
            authenticate(Customers_name,Customers_password)
            .then(result => {
              if (result.success) {
                
                  console.log('Authentication successful:', result.data.id);
                  CustomerLoginSuccessPage(result.data.id,result.data.id)//sẽ truyền d các dữ liệu khác khi đây ko còn là user mà là đối tượng
                  navigate('/home/customer');
                
              } else {
                console.error('Authentication failed:', result.message);
                alert('Error: Đăng Nhập Thất Bại!123');
              }
            })
            .catch(error => {
              console.error('An unexpected error occurred:', error);
            });
        }
        else
        {
            alert("Bạn chưa điền đầy đủ dữ liệu!")
            console.log("Thiếu dữ liệu")
        }
    }

    const handleSubmitSignUp = (e) => {
        if (SignUp_name && SignUp_email && SignUp_password )
          {
            registerUser(SignUp_name,SignUp_email,SignUp_password)
              .then(result => {
                if (result.success) {
                    console.log('Authentication successful:', result.data.id);
                    alert('Đăng kí thành công!');
                    setSignUpName('');
                    setSignUpPassword('');
                    setSignUpEmail('');
                    setShowSignUpTextBox(false);
                    setNotiSignUpSuccess(true);
                    setShowUserTextBox(true);
                } else {
                  console.error('Authentication failed:', result.message);
                  setNotiSignUpFail(true);
                  // alert('Tên tài khoản đã tồn tại!');
                }
              })
              .catch(error => {
                console.error('An unexpected error occurred:', error);
              });
          }
          else
          {
              alert("Bạn chưa điền đầy đủ dữ liệu!")
              console.log("Thiếu dữ liệu")
          }
      }
  
    // Trong trang đăng nhập
    function AdminLoginSuccessPage( AdminUserID, AdminName ) {
      // Lưu userId vào localStorage
      console.log(AdminUserID,AdminName)
      localStorage.setItem('AdminUserID', AdminUserID);
      localStorage.setItem('AdminName', AdminName);

      // Chuyển hướng đến trang làm việc
    }
    function CustomerLoginSuccessPage( CustomerUserID, CustomerUser ) {
      // Lưu userId vào localStorage
      console.log(CustomerUserID)
      localStorage.setItem('CustomerUserID', CustomerUserID);
      localStorage.setItem('CustomerName', CustomerUser);

      // Chuyển hướng đến trang làm việc
    }

  
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                // Tắt ô vuông khi nhấn phím Esc
                setShowUserTextBox(false);
                setShowAdminLoginTextBox(false);
                setShowCustomersLoginTextBox(false);
                setShowSignUpTextBox(false);
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
  const handlePost = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    setShowUserTextBox(true);
  };
  const handleMenuClose = () => {
      setAnchorEl(null);
  };


const items = [
    { name: 'Xe cộ', image: '/xe_co.png' },
    { name: 'Điện thoại', image: '/dien_tu.png' },
    { name: 'Đồ gia dụng', image: '/gia_dung.png' },
    { name: 'Phòng trọ', image: '/phong_tro.png' },
    { name: 'Thú cưng', image: '/thu_cung.png' },
    { name: 'Sách', image: '/sach.png' },
    { name: 'Việc làm', image: '/viec_lam.png' },
    { name: 'Thời trang', image: '/thoi_trang.png' },
];

const [isExpanded, setIsExpanded] = useState(false);

const toggleExpand = () => {
    setIsExpanded(!isExpanded);
};
const keywords = [
  "Samsung Note 10",
  "Điện thoại Samsung",
  "Điện Thoại iPhone",
  "Dàn karaoke cũ",
  "Tivi cũ giá rẻ",
  "Điện thoại Samsung Cũ",
  "Máy tính để bàn giá rẻ",
  "Ống kính (lens) cũ",
  "Máy ảnh cũ",
  "Máy quay cũ",
  "Micro cũ",
  "Tai Nghe Cũ",
  "Amply",
  "Loa Cũ",
  "Máy tính để bàn cũ",
  "Máy Tính Bảng Cũ",
  "Laptop Cũ",
  "Laptop Apple Macbook"
];
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


const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = (event) => {
      event.preventDefault();
      if (searchTerm) {
        navigate(`/search?title=${encodeURIComponent(searchTerm)}`);
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
function ProductList() {
  const [AllPost, setAllPost] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [imageUrls, setImageUrls] = useState({}); // Trạng thái để lưu trữ URL hình ảnh
  const navigate = useNavigate();

  const fetchPost = async () => {
      try {
          const response = await axios.get('http://localhost:9193/api/v1/posts/all?status=APPROVED');
          if (response.data.message === "Success") {
              setAllPost(response.data.data);
              // Gọi hàm để tải hình ảnh cho từng bài đăng
              fetchImages(response.data.data);
          }
      } catch (error) {
          console.error("Error fetching posts:", error);
          alert('Lấy dữ liệu thất bại');
      }
  };

  const fetchImages = async (posts) => {
      const urls = {};
      await Promise.all(posts.map(async (post) => {
          try {
              const response = await axios.get(`http://localhost:9193/api/v1/images/image/download/post/${post.id}`);
              if (response.data.message === "Success!") {
                  urls[post.id] = `http://localhost:9193${response.data.data[0].downloadUrl}`;
              }
          } catch (error) {
              console.error(`Error fetching image for post ${post.id}:`, error);
          }
      }));
      setImageUrls(urls); // Cập nhật trạng thái với URL hình ảnh đã tải
  };

  useEffect(() => {
      fetchPost();
  }, []);

  const handleCardClick = (id) => {
      navigate(`/chi_tiet/${id}`);
  };

  const handleLoadMore = () => {
      setVisibleCount((prevCount) => prevCount + 12);
  };

  function formatPrice(formattedPrice) {
      // const formattedPrice = price * 1000;
      return new Intl.NumberFormat('vi-VN', {
          minimumFractionDigits: 0,
      }).format(formattedPrice) + ' VNĐ';
  }

  return (
      <Box sx={{ bgcolor: '#FFFFFF', height: 'auto', width: '60%', mx: 'auto', borderRadius: '15px', mt: 2, padding: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5" gutterBottom>
              Tin đăng dành cho bạn
          </Typography>
          <Grid container spacing={2}>
              {AllPost.slice(0, visibleCount).map((post) => (
                  <Grid item xs={12} sm={6} md={3} key={post.id}>
                      <Button onClick={() => handleCardClick(post.id)} sx={{ padding: 0, width: '100%' }}>
                          <Card sx={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', 
                              '&:hover': {
                                  transform: 'scale(1.05)', 
                                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)', 
                              },
                          }}>
                              <CardMedia 
                                  component="img" 
                                  height="150" 
                                  alt={post.title} 
                                  image={imageUrls[post.id]} // Sử dụng URL từ trạng thái
                              />
                              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                  <Typography variant="subtitle1" component="div" noWrap sx={{ fontSize: '0.9rem', flexShrink: 0 }}>
                                      {post.title} 
                                  </Typography>
                                  <Typography variant="body2" color="black">
                                      {post.category === 'Viec Lam' 
                                          ? `Lương: ${formatPrice(post.job.maxSalary)}` 
                                          : `Giá: ${formatPrice(post.price)}`}
                                  </Typography>
                              </CardContent>
                          </Card>
                      </Button>
                  </Grid>
              ))}
          </Grid>
          {visibleCount < AllPost.length && (
              <Button onClick={handleLoadMore}
                  style={{
                      padding: '10px 15px',
                      fontSize: '16px',
                      backgroundColor: 'transparent',
                      color: '#007bff',
                      border: 'none ',
                      borderRadius: '5px',
                      cursor: 'pointer',
                  }}
              >
                  Xem thêm
              </Button>
          )}
      </Box>
  );
}

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
                        <MenuItem onClick={()=> navigate('/search_category?category=Xe Cộ')}>Xe cộ</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Điện thoại')}>Điện thoại</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Đồ gia dụng')}>Đồ gia dụng</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Phòng trọ')}>Phòng trọ</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Thú cưng')}>Thú cưng</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Sách')}>Sách</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Việc làm')}>Việc làm</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Thời trang')}>Thời trang</MenuItem>
                    </Menu>
                    <SearchComponent/>
                    <Button sx={{ color: 'white', marginLeft: 2, width:'50px' }} onClick={handlePost}><NotificationsIcon />
                    </Button>
    
                    <Button sx={{ color: 'white', marginLeft: 2 }} onClick={handlePost}><MessageIcon />                               
                    </Button>
                    <Button sx={{ color: 'white', marginLeft: 2, marginRight: 1 }} onClick={handlePost} ><ShoppingBagIcon /></Button>
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
            <Box sx={{ bgcolor: '#FFFFFF', height: '25%', width: '60%', borderRadius: '15px', mx: 'auto', mt: 2, padding: 2,boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                <Grid container spacing={1} justifyContent="center">
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={3} key={index}>
                            <Card sx={{ maxWidth: '55%', margin: '0 auto',transition: 'transform 0.2s, box-shadow 0.2s', 
                                '&:hover': {
                                    transform: 'scale(1.05)', 
                                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)', 
                                  }, }}>
                                <Button 
                                onClick={() => navigate(`/search_category?category=${item.name}`)} 
                                sx={{ padding: 0, width: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia component="img" sx={{ objectFit: 'cover', height: '63px' }} image={item.image} alt={item.name} />
                                    <CardContent sx={{ display: 'flex', justifyContent: 'center', padding: '0', height: '20px' }}>
                                        <Typography align="center" sx={{ fontSize: '0.8rem' }}>{item.name}</Typography>
                                    </CardContent>
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            
            <ProductList />

    <Box sx={{  width: '60%', mx: 'auto' }}>
    <section style={{ padding: '20px', textAlign: 'left' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                Chợ AB - Chợ Mua Bán, Rao Vặt Trực Tuyến Giữa KTX Khu A,B
            </h1>

            <p style={{ fontSize: '13px', color: '#343a40', marginBottom: '10px' }}>
                Chợ AB ra đời với mục đích tạo ra cho các bạn sinh viên một kênh rao vặt trung gian, kết nối người mua với người bán lại với nhau bằng những giao dịch cực kỳ đơn giản, tiện lợi, nhanh chóng, an toàn, mang đến hiệu quả bất ngờ.
            </p>
            <p style={{ fontSize: '13px', color: '#343a40', marginBottom: '10px' }}>
                Chợ AB mang tới hàng ngàn món hời từ Xe cộ, Đồ điện tử, Thú cưng, Vật dụng cá nhân... đến tìm việc làm, thông tin tuyển dụng, các dịch vụ - du lịch được đăng tin, rao bán trên Chợ AB.
            </p>
            {isExpanded && (
                <>
            <p style={{ fontSize: '13px', color: '#343a40', marginBottom: '10px' }}>
                Với Chợ AB, bạn có thể dễ dàng mua bán, trao đổi bất cứ một loại mặt hàng nào, dù đó là đồ cũ hay đồ mới với nhiều lĩnh vực:
            </p>
            <ul style={{ fontSize: '13px', color: '#343a40' }}>
                <li>Phương tiện đi lại: Mua bán ô tô, xe máy có độ bền cao, giá cả hợp lý, giấy tờ đầy đủ.</li>
                <li>Đồ dùng cá nhân: Quần áo, giày dép, túi xách, đồng hồ... đa phong cách, hợp thời trang.</li>
                <li>Đồ điện tử: Điện thoại di động, máy tính bảng, laptop, tivi, loa, amply...; đồ điện gia dụng: máy giặt, tủ lạnh, máy lạnh điều hòa... với rất nhiều nhãn hiệu, kích thước khác nhau.</li>
                <li>Vật nuôi, thú cưng đa chủng loại: Gà, chó (chó phốc sóc, chó pug, chó poodle...), chim, mèo (mèo anh lông ngắn, mèo munchkin...), cá, hamster,... giá cực tốt.</li>
                <li>Tuyển dụng, việc làm: Hàng triệu công việc hấp dẫn, phù hợp tại Việc Làm - Kênh tuyển dụng hiệu quả, uy tín được phát triển bởi Chợ Tốt.</li>
                <li>Đồ ăn, thực phẩm: Các món ăn được chế biến thơm ngon, hấp dẫn, thực phẩm tươi sống, an toàn & giá cả hợp lý.</li>
            </ul>
            <p style={{ fontSize: '13px', color: '#343a40', marginBottom: '10px' }}>
                Và còn rất nhiều mặt hàng khác nữa đã và đang được rao bán tại Chợ AB.
            </p>
            <p style={{ fontSize: '13px', color: '#343a40', marginBottom: '10px' }}>
                Mỗi người trong chúng ta đều có những sản phẩm đã qua sử dụng và không cần dùng tới nữa. Vậy còn chần chừ gì nữa mà không để nó trở nên giá trị hơn với người khác. Rất đơn giản, bạn chỉ cần chụp hình lại, mô tả cụ thể về sản phẩm và sử dụng ứng dụng Đăng tin miễn phí của Chợ AB là đã có thể đến gần hơn với người cần nó.
            </p>
            <p style={{ fontSize: '13px', color: '#343a40', marginBottom: '10px' }}>
                Chúc các bạn có những trải nghiệm mua bán tuyệt vời trên Chợ AB.
            </p>
              </>
            )}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button
                  onClick={toggleExpand}
                  style={{
                      padding: '10px 15px',
                      fontSize: '14px',
                      backgroundColor: 'transparent', // Nút không màu
                      color: '#007bff', // Màu chữ
                      border: 'none ', // Đường viền màu
                      borderRadius: '5px',
                      cursor: 'pointer',
                  }}
              >
                  {isExpanded ? 'Thu gọn' : 'Mở rộng'}
              </button>
            </div>
        </section>
       </Box>
       <Box sx={{ width: '60%', mx: 'auto', textAlign: 'left' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                Các từ khóa phổ biến
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {keywords.map((keyword, index) => (
                    <div key={index} style={{ flex: '0 0 23%', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <span style={{
                            display: 'inline-block',
                            width: '5px', // Đường kính chấm tròn
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#343a40', // Màu chấm tròn
                            marginRight: '5px'
                        }}></span>
                        <p style={{ fontSize: '14px', color: '#343a40', margin: 0 }}>
                            {keyword}
                        </p>
                    </div>
                ))}
            </div>
        </Box>
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


        {/* </Box> */}
    {showUserTextBox && (
<>
      <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền overlay (có thể điều chỉnh)
            zIndex: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(8px)', // Sử dụng backdrop-filter để làm mờ nền
          }}
        />
        <div style={{ 
          position: 'absolute',
          border: '0px solid #380B61', // Viền nằm trong nút
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor : '#B3D9FF',
          backgroundSize: 'cover',
          padding: '50px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          
        }}>
          <Stack>
                <Typography style={{fontWeight: 'bold'}} variant='h5'>ĐĂNG NHẬP</Typography>
                <Typography variant='h2' gutterBottom></Typography>
                <Typography variant='h2' gutterBottom></Typography>

                <UserButton onClick={handleAdminLoginClick} gutterBottom > Quản Lý </UserButton>
                <UserButton onClick={handleCustomersLoginClick} gutterBottom  > Khách Hàng </UserButton>
                <Button 
                    onClick={handleSignUp} // Hàm xử lý sự kiện đăng ký
                    style={{ 
                        fontSize: '0.8rem', 
                        marginTop: '10px', 
                        textTransform: 'none',
                        color: 'inherit', // Màu mặc định
                        backgroundColor: 'transparent', // Không có màu nền
                        border: 'none', // Không có viền
                        transition: 'color 0.3s', // Hiệu ứng chuyển màu
                        padding: 0, // Bỏ padding nếu cần
                    }} 
                    onMouseOver={(e) => e.currentTarget.style.color = 'red'} // Đổi màu khi hover
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} // Đổi lại màu khi không hover
                >
                    Bạn chưa có tài khoản ?
                </Button>
            </Stack>      
        </div>
        </>
    )
    }

    {showAdminLoginTextBox && (
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
            backgroundColor : '#B3D9FF',
            backgroundSize: 'cover',
            padding: '100px 100px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}>
          <Typography variant='h5' style={{fontWeight:'bold'}}>Quản Lý</Typography>
          <Typography gutterBottom variant='h5'></Typography>
          <TextField label='Tên tài khoản:' variant='standard' 
              fullWidth 
              required 
              onChange={(e)=>setAdminName(e.target.value)} 
              InputLabelProps={{style: { color: '#000000' }}}/>
          <TextField
              label="Mật khẩu:"
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
              InputLabelProps={{
                style: { color: '#000000' }, // Thay đổi màu sắc của nhãn ở đây
            }}
            />
          <Typography gutterBottom variant='h2'></Typography>
          <Button startIcon={<SendIcon/> } variant='contained' color={'inherit'} onClick={handleAdminDangNhap} style={{ 
            fontSize: '1.0rem', // Kích thước của nút
            marginRight: '10px', // Khoảng cách so với mép màn hình bên phải
            color: '#000000', // Màu chữ của nút
            backgroundColor: '#87CEEB', // Màu nền của nút
            border: '0px solid #87CEEB', // Viền nằm trong nút
            borderRadius: '9px', // Bo tròn góc của viền
            padding: '7px 25px',
            display: 'flex', // Sử dụng flexbox để căn chỉnh
            alignItems: 'center', 
            fontWeight: 'bold',
          }}>Đăng Nhập</Button>
        </div>
      </>

    )}

    {showCustomersLoginTextBox &&(
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
            backgroundColor : '#B3D9FF',
            backgroundSize: 'cover',
            padding: '100px 100px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}>
            <Typography variant='h5' style={{fontWeight:'bold'}}>Khách hàng</Typography>
            <Typography gutterBottom variant='h5'></Typography>
            <TextField label='Tên tài khoản:' variant='standard' 
              fullWidth 
              required 
              onChange={(e)=>setCustomersName(e.target.value)} 
              InputLabelProps={{style: { color: '#000000' }}}/>
            <TextField
                  label="Mật khẩu:"
                  variant="standard"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setCustomersPassword(e.target.value)}
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
                  InputLabelProps={{
                    style: { color: '#000000' }, // Thay đổi màu sắc của nhãn ở đây
                }}
                />
            <Typography gutterBottom variant='h2'></Typography>
            <Button startIcon={<SendIcon/> } variant='contained' color={'inherit'} onClick={handleCustomersDangNhap} style={{ 
              fontSize: '1.0rem', // Kích thước của nút
              marginRight: '10px', // Khoảng cách so với mép màn hình bên phải
              color: '#000000', // Màu chữ của nút
              backgroundColor: '#87CEEB', // Màu nền của nút
              border: '0px solid #87CEEB', // Viền nằm trong nút
              borderRadius: '9px', // Bo tròn góc của viền
              padding: '7px 25px',
              display: 'flex', // Sử dụng flexbox để căn chỉnh
              alignItems: 'center', 
              fontWeight: 'bold',
            }}>Đăng Nhập</Button>
        </div>
</>
    )}
    {showSignUpTextBox &&(
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
                backgroundColor : '#B3D9FF',
                backgroundSize: 'cover',
                padding: '100px 100px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }}>
                <Typography variant='h5' style={{fontWeight:'bold'}}>Đăng kí tài khoản</Typography>
                <Typography gutterBottom variant='h5'></Typography>
                <TextField label='Tên người dùng:' variant='standard' 
                  fullWidth 
                  required 
                  onChange={(e)=>setSignUpName(e.target.value)} 
                  InputLabelProps={{style: { color: '#000000' }}}/>
                <TextField label='Tên tài khoản:' variant='standard' 
                  fullWidth 
                  required 
                  onChange={(e)=>setSignUpEmail(e.target.value)} 
                  InputLabelProps={{style: { color: '#000000' }}}/>
                <TextField
                      label="Mật khẩu:"
                      variant="standard"
                      fullWidth
                      required
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => setSignUpPassword(e.target.value)}
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
                      InputLabelProps={{
                        style: { color: '#000000' }, // Thay đổi màu sắc của nhãn ở đây
                    }}
                    />
                <Typography gutterBottom variant='h2'></Typography>
                <Button startIcon={<SendIcon/> } variant='contained' color={'inherit'} onClick={handleSubmitSignUp} style={{ 
                  fontSize: '1.0rem', // Kích thước của nút
                  marginRight: '10px', // Khoảng cách so với mép màn hình bên phải
                  color: '#000000', // Màu chữ của nút
                  backgroundColor: '#87CEEB', // Màu nền của nút
                  border: '0px solid #87CEEB', // Viền nằm trong nút
                  borderRadius: '9px', // Bo tròn góc của viền
                  padding: '7px 25px',
                  display: 'flex', // Sử dụng flexbox để căn chỉnh
                  alignItems: 'center', 
                  fontWeight: 'bold',
                }}>Đăng Kí</Button>
            </div>
    </>
    )}
        {Noti_SignUp_Fail &&(
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
                backgroundColor : '#B3D9FF',
                backgroundSize: 'cover',
                padding: '100px 100px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }}>
                <Typography variant='h5' style={{fontWeight:'bold'}}>Đăng kí thất bại. Tài khoản đã tồn tại.</Typography>
            </div>
    </>
    )}
    </div>
  );
}

export default Home;
 