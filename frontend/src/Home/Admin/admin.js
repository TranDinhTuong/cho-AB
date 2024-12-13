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
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
function Home() {


    const navigate = useNavigate();
    
    const AdminUserID = localStorage.getItem('AdminUserID');
    const AdminName = localStorage.getItem("AdminName");
    // alert(AdminUserID + AdminName );
    const handleLogOut = (e) =>{
        localStorage.removeItem('AdminUserID');
        localStorage.removeItem('AdminName');
        navigate('/home');
    }

  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleHome = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/admin');
  };
  const handleMenuClose = () => {
      setAnchorEl(null);
  };
//   const handleCardClick = (id) => {
//     // Chuyển hướng đến trang thông tin chi tiết của sản phẩm
//     // Giả sử bạn đang sử dụng react-router để điều hướng
//     navigate(`/chi_tiet/${id}`);
// };
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
        navigate(`/home/admin/chi_tiet/${id}`);
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 12);
    };

    function formatPrice(price) {
        // const formattedPrice = price * 1000;
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
        }).format(price) + ' VNĐ';
    }
    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:9193/api/v1/posts/product/${postId}/delete`);
            fetchPost(); // Làm mới danh sách bài viết chưa duyệt
            // fetchApprovedPosts();
        } catch (error) {
            console.error("Lỗi khi xóa bài viết:", error);
        }
    };
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
                                {/* <Button 
                                    onClick={(e) => { e.stopPropagation(); handleDeletePost(post.id); }} 
                                    sx={{ 
                                        backgroundColor: '#f44336', // Màu đỏ nhạt
                                        color: 'white', // Màu chữ
                                        width: '100%', // Chiều rộng 100%
                                        '&:hover': {
                                            backgroundColor: '#f44336', // Màu nền khi hover
                                        },
                                    }}
                                    >
                                        <DeleteIcon/>Xóa</Button> */}
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
const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = (event) => {
      event.preventDefault();
      if (searchTerm) {
        navigate(`/home/admin/search?title=${encodeURIComponent(searchTerm)}`);
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
                    <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Xe Cộ')}>Xe cộ</MenuItem>
                    <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Điện thoại')}>Điện thoại</MenuItem>
                    <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Đồ gia dụng')}>Đồ gia dụng</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Phòng trọ')}>Phòng trọ</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Thú cưng')}>Thú cưng</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Sách')}>Sách</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Việc làm')}>Việc làm</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Thời trang')}>Thời trang</MenuItem>
                    </Menu>
                    <SearchComponent/>
                    <Button sx={{ color: 'white', marginLeft:0 }} onClick={handleOpen}><NotificationsIcon /></Button>
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
                                onClick={() => navigate(`/home/admin/search_category?category=${item.name}`)} 
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
    </div>
  );
}

export default Home;
 