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
function Home() {

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




    
    async function authenticate(username, password,role) {
    
      try {
        const response = await axios.post('http://localhost:8080/user/authenticate', null, {
          params: {
            username,
            password,
            role,
          }
        });
        const { status, message, data } = response.data;
        if (status === 'success') {
          return { success: true, message, data };
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.log("fail")
        if (error.response) {
          // Lỗi từ phía máy chủ
          const { status, data } = error.response;
          if (status === 404) {
            // Xử lý lỗi 404 (Not Found)
            console.error('User not found:', data.message);
          } else if (status === 401) {
            // Xử lý lỗi 401 (Unauthorized)
            console.error('Authentication failed:', data.message);
          } else {
            // Xử lý lỗi khác
            console.error('Error:', data.message);
          }
        } else if (error.request) {
          // Lỗi khi gửi yêu cầu
          console.error('Request error:', error.message);
        } else {
          // Lỗi khác
          console.error('Error:', error.message);
        }
    
        return { success: false, message: error.message };
      }
    }



    const handleAdminDangNhap = async() => {
      if (Admin_name && Admin_password )
        {
            console.log('Student Loged In',Admin_name,Admin_password);
            //LoginSuccessPage(Admin_password)
            authenticate(Admin_name,Admin_password,"ADMIN")
            .then(result => {
              if (result.success) {
                
                  console.log('Authentication successful:', result.data.id);
                  AdminLoginSuccessPage(result.data.id,result.data.username)//sẽ truyền thêm các dữ liệu khác khi đây ko còn là user mà là đối tượng
                  navigate('/home/admin');
                
              } else {
                console.error('Authentication failed:', result.message);
                alert('Error: Đăng Nhập Thất Bại!');
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

    const handleStudentsDangNhap = (e) => {
      if (Students_name && Students_password )
        {
            console.log('Student Loged In',Students_name,Students_password);
            authenticate(Students_name,Students_password,"STUDENT")
            .then(result => {
              if (result.success) {

                  console.log('Authentication successful:', result.data.id);
                  StudentLoginSuccessPage(result.data.id,result.data.name)//sẽ truyền thêm các dữ liệu khác khi đây ko còn là user mà là đối tượng
                  navigate('/home/students');
                
              } else {
                console.error('Authentication failed:', result.message);
                alert('Error: Đăng Nhập Thất Bại!');
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

    const handleTeachersDangNhap = (e) => {
      if (Teachers_name && Teachers_password )
        {
            console.log('Teacher Loged In',Teachers_name,Teachers_password);
            authenticate(Teachers_name,Teachers_password,"TEACHER")
            .then(result => {
              if (result.success) {
                
                  console.log('Authentication successful:', result.data.id);
                  TeacherLoginSuccessPage(result.data.id,result.data.username)//sẽ truyền thêm các dữ liệu khác khi đây ko còn là user mà là đối tượng
                  navigate('/home/teachers');
                
              } else {
                console.error('Authentication failed:', result.message);
                alert('Error: Đăng Nhập Thất Bại!');
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
    function StudentLoginSuccessPage( StudentUserID, StudentName ) {
      // Lưu userId vào localStorage
      console.log(StudentUserID)
      localStorage.setItem('StudentUserID', StudentUserID);
      localStorage.setItem('StudentName', StudentName);

      // Chuyển hướng đến trang làm việc
    }
    function TeacherLoginSuccessPage( TeacherUserID, TeacherName ) {
      // Lưu userId vào localStorage
      console.log(TeacherUserID)
      localStorage.setItem('TeacherUserID', TeacherUserID);
      localStorage.setItem('TeacherName', TeacherName);

      // Chuyển hướng đến trang làm việc
    }

  
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
  const handlePost = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/post');
  };
  const handleMenuClose = () => {
      setAnchorEl(null);
  };
  const handleCardClick = (id) => {
    // Chuyển hướng đến trang thông tin chi tiết của sản phẩm
    // Giả sử bạn đang sử dụng react-router để điều hướng
    navigate(`/chi_tiet/${id}`);
};
  const items = [
    { name: 'Xe cộ', image: '/xe_co.png' },
    { name: 'Điện tử', image: '/dien_tu.png' },
    { name: 'Gia dụng', image: '/gia_dung.png' },
    { name: 'Đồ cho bé', image: '/do_cho_be.png' },
    { name: 'Thú cưng', image: '/thu_cung.png' },
    { name: 'Thực phẩm', image: '/thuc_pham.png' },
    { name: 'Văn phòng', image: '/van_phong.png' },
    { name: 'Việc làm', image: 'viec_lam.png' },
    { name: 'Thời trang', image: '/thoi_trang.png' },
    { name: 'Cho tặng', image: '/cho_tang.png' },
];
const listings = [
  { id: 1, name: 'Điện thoại Samsung Galaxy S21', image: '/sp1.png', price: '12.000.000 VNĐ' },
  { id: 2, name: 'Xe máy Honda SH 2020', image: '/sp2.png', price: '70.000.000 VNĐ' },
  { id: 3, name: 'Máy tính xách tay Dell XPS 13', image: '/sp3.png', price: '25.000.000 VNĐ' },
  { id: 4, name: 'Tủ lạnh Samsung 450L', image: '/sp4.png', price: '15.000.000 VNĐ' },
  { id: 5, name: 'Máy ảnh Canon EOS M50', image: '/sp5.png', price: '18.000.000 VNĐ' },
  { id: 6, name: 'Tai nghe Sony WH-1000XM4', image: '/sp6.png', price: '7.000.000 VNĐ' },
  { id: 7, name: 'Bàn phím cơ Logitech G Pro', image: '/sp7.png', price: '3.000.000 VNĐ' },
  { id: 8, name: 'Ghế gaming Corsair', image: '/sp8.png', price: '4.500.000 VNĐ' },
  { id: 9, name: 'Đồng hồ thông minh Apple Watch', image: '/sp9.png', price: '10.000.000 VNĐ' },
  { id: 10, name: 'Máy giặt LG 8kg', image: '/sp10.png', price: '8.000.000 VNĐ' },
  { id: 11, name: 'Điện thoại iPhone 12', image: '/sp11.png', price: '15.000.000 VNĐ' },
  { id: 12, name: 'Laptop HP Pavilion', image: '/sp12.png', price: '22.000.000 VNĐ' },
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
                        <Grid item xs={12} sm={2.4} key={index}>
                            <Card sx={{ maxWidth: '55%', margin: '0 auto',transition: 'transform 0.2s, box-shadow 0.2s', 
                                '&:hover': {
                                    transform: 'scale(1.05)', 
                                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)', 
                                  }, }}>
                                <Button 
                                // onClick={() => alert(`Bạn đã nhấn ${item.name}`)} 
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
            <Box sx={{ bgcolor: '#FFFFFF', height: '60%', width: '60%', mx: 'auto',borderRadius: '15px', mt: 2, padding: 2.,boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                    <Typography variant="h5" gutterBottom>
                        Tin đăng dành cho bạn
                    </Typography>
                    <Grid container spacing={2}>
                      {listings.map((listing) => (
                          <Grid item xs={12} sm={6} md={3} key={listing.id}>
                            <Button onClick={() => handleCardClick(listing.id)} sx={{ padding: 0, width: '100%' }}>
                              <Card sx={{ height: '100%',transition: 'transform 0.2s, box-shadow 0.2s', 
                                '&:hover': {
                                    transform: 'scale(1.05)', 
                                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)', 
                                  }, }}>
                                  <CardMedia component="img" height="180" image={listing.image} alt={listing.name} />
                                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                      <Typography variant="subtitle1" component="div" noWrap sx={{ fontSize: '0.9rem', flexShrink: 0 }}>
                                          {listing.name}
                                      </Typography>
                                      <Typography variant="body2" color="red" >
                                          {listing.price}
                                      </Typography>
                                  </CardContent>
                              </Card>
                            </Button>
                          </Grid>
                      ))}
                  </Grid>
            </Box>
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
    {/* {showUserTextBox && (
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
          backgroundImage: 'url("/gradient.jpg")', 
          backgroundSize: 'cover',
          padding: '50px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          
        }}>
          <Stack>
                <Typography style={{fontWeight: 'bold'}} variant='h5'>ĐĂNG NHẬP</Typography>
                <Typography variant='h2' gutterBottom></Typography>
                <Typography variant='h2' gutterBottom></Typography>


                <UserButton onClick={handleAdminLoginClick} gutterBottom > Admin </UserButton>
                <UserButton onClick={handleCustomersLoginClick} gutterBottom  > Khách Hàng </UserButton>
                <UserButton onClick={handleStudentsLoginClick} gutterBottom > Quản Lý </UserButton>
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

export default Home;
 