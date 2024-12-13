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
import {useNavigate, useLocation}  from 'react-router-dom';
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
import {  Grid, Card,CardContent, CardMedia,Slider } from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';
import {  Popover, List, ListItem, ListItemText } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PeopleIcon from '@mui/icons-material/People';
function Home() {


    const navigate = useNavigate();

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
  const handleChat = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home/admin/chat');
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
//   const handleCardClick = (id) => {
//     // Chuyển hướng đến trang thông tin chi tiết của sản phẩm
//     // Giả sử bạn đang sử dụng react-router để điều hướng
//     navigate(`/chi_tiet/${id}`);
// };



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
const FilterBox = ({ address, setAddress, category, setCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, onFilter }) => {
    const [showAddress, setShowAddress] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const [addressButtonLabel, setAddressButtonLabel] = useState('Địa chỉ');
    const [priceButtonLabel, setPriceButtonLabel] = useState('Giá');
    function formatPrice(formattedPrice) {
        // const formattedPrice = price * 1000;
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
        }).format(formattedPrice) + ' VNĐ';
    }
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setAddressButtonLabel(e.target.value);
    };

    const handlePriceChange = () => {
        setPriceButtonLabel(`Từ ${formatPrice(minPrice)} đến ${formatPrice(maxPrice)}`);
    };

    const handleFilter = () => {
        onFilter(); // Gọi hàm lọc
        setShowAddress(false);
        setShowCategory(false);
        setShowPrice(false);
    };

    const handleClearFilters = () => {
        // Đặt lại tất cả các giá trị bộ lọc
        setAddress('');
        setCategory('');
        setMinPrice(0);
        setMaxPrice(50000000);
        setAddressButtonLabel('Địa chỉ');
        setPriceButtonLabel('Giá');
        
        // Đóng tất cả các phần
        setShowAddress(false);
        setShowCategory(false);
        setShowPrice(false);
        
        // Gọi hàm lọc để cập nhật dữ liệu
        onFilter(); // Gọi hàm lọc tại đây
    };

    return (
        <Box sx={{ bgcolor: '#FFFFFF', height: 'auto', width: '50%', mx: 'auto', borderRadius: '10px', mt: 2, padding: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                <Button variant="outlined" onClick={() => {setShowAddress(!showAddress);setShowCategory(false);setShowPrice(false); }}>
                    {addressButtonLabel}
                </Button>
                <Button variant="outlined" onClick={() => {setShowAddress(false);setShowCategory(false);setShowPrice(!showPrice); }}>
                    {priceButtonLabel}
                </Button>
                <Button variant="outlined" onClick={() => {setShowAddress(false);setShowCategory(!showCategory);setShowPrice(false); }}>
                    Danh mục
                </Button>
                <Box sx={{ flexGrow: 1 }} /> {/* Để tạo khoảng cách giữa các nút và nút cuối */}
                <Button variant="contained" color="primary" onClick={handleFilter}>
                    Lọc
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClearFilters} sx={{ ml: 1 }}>
                    Xóa Lọc
                </Button>
            </Box>

            {showAddress && (
                <TextField
                    fullWidth
                    label="Nhập địa chỉ"
                    value={address}
                    onChange={handleAddressChange}
                    sx={{ mb: 2 }}
                />
            )}

            {showCategory && (
                <TextField
                    select
                    fullWidth
                    label="Chọn danh mục"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        onFilter(); // Gọi hàm lọc khi danh mục thay đổi
                    }}
                    sx={{ mb: 2 }}
                >
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Điện thoại')}>Điện thoại</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Đồ gia dụng')}>Đồ gia dụng</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Phòng trọ')}>Phòng trọ</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Thú cưng')}>Thú cưng</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Sách')}>Sách</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Việc làm')}>Việc làm</MenuItem>
                        <MenuItem onClick={()=> navigate('/home/admin/search_category?category=Thời trang')}>Thời trang</MenuItem>
                    {/* Thêm các danh mục khác nếu cần */}
                </TextField>
            )}

            {showPrice && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">Giá:</Typography>
                    <Slider
                        value={[minPrice, maxPrice]}
                        onChange={(e, newValue) => {
                            setMinPrice(newValue[0]);
                            setMaxPrice(newValue[1]);
                            handlePriceChange();
                        }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={50000000} // Giá tối đa
                    />
                </Box>
            )}


        </Box>
    );
};

 const removeVietnameseTones = (str) => {
    const accents = [
        { base: 'a', letters: /[áàảãạâấầẩẫậăắằẳẵặ]/g },
        { base: 'e', letters: /[éèẻẽẹêếềểễệ]/g },
        { base: 'i', letters: /[íìỉĩị]/g },
        { base: 'o', letters: /[óòỏõọôốồổỗộơớờởỡợ]/g },
        { base: 'u', letters: /[úùủũụưứừửữự]/g },
        { base: 'y', letters: /[ýỳỷỹỵ]/g },
        { base: 'd', letters: /[đ]/g },
    ];

    accents.forEach(({ base, letters }) => {
        str = str.replace(letters, base);
    });

    return str;
};
const Search = () => {
    const location = useLocation();
    const [allData, setAllData] = useState([]);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm trạng thái loading
    const [imageUrls, setImageUrls] = useState({});

    const [addressFilter, setAddressFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [minPriceFilter, setMinPriceFilter] = useState(0);
    const [maxPriceFilter, setMaxPriceFilter] = useState(50000000);

    // Hàm để lấy giá trị của query string
    const getQueryParam = (param) => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get(param);
    };
    useEffect(() => {
        const category = getQueryParam('category'); // Lấy title từ query string

        if (category) {
            const fetchData = async () => {
                setLoading(true); // Bắt đầu tải
                try {
                    const response = await axios.get(`http://localhost:9193/api/v1/posts/post/all/posts?category=${encodeURIComponent(category)}`);
                    
                    if (response.data.message === "Success") {
                        setAllData(response.data.data || []); // Đảm bảo là mảng
                        setFilteredData(response.data.data || []);
                        fetchImages(response.data.data);
                    } else if (response.data.message === "No product found ") {
                        setAllData([]); // Không có dữ liệu
                        alert('Không tìm thấy sản phẩm.');
                    }
                } catch (err) {
                    setAllData([]);
                    // console.error('Error:', err);
                    // alert('Đã xảy ra lỗi khi lấy dữ liệu.');
                } finally {
                    setLoading(false); // Kết thúc quá trình tải
                }
            };
            fetchData(); // Gọi hàm fetchData
        } else {
            setAllData([]); // Nếu không có title, đặt mảng rỗng
        }
    }, [location.search]); 

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
    const handleFilter = () => {
        const filtered = allData.filter(post => {
            const normalizedLocation = removeVietnameseTones(post.location).toLowerCase();
            const normalizedAddressFilter = removeVietnameseTones(addressFilter).toLowerCase();

            const matchesAddress = normalizedLocation.includes(normalizedAddressFilter);
            const matchesCategory = post.category === categoryFilter || categoryFilter === '';
            const matchesMinPrice = post.price >= minPriceFilter;
            const matchesMaxPrice = post.price <= maxPriceFilter;

            return matchesAddress && matchesCategory && matchesMinPrice && matchesMaxPrice;
        });
        setFilteredData(filtered);
    };
    if (loading) {
        return <div>Loading...</div>; // Hiển thị khi đang tải
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Hiển thị thông báo lỗi 
    }
    const handleCardClick = (id) => {
        navigate(`/chi_tiet/${id}`);
    };
    function formatPrice(formattedPrice) {
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
        }).format(formattedPrice) + ' VNĐ';
    }
    return (
        <div>
            <FilterBox 
                address={addressFilter} 
                setAddress={setAddressFilter} 
                category={categoryFilter} 
                setCategory={setCategoryFilter} 
                minPrice={minPriceFilter} 
                setMinPrice={setMinPriceFilter} 
                maxPrice={maxPriceFilter} 
                setMaxPrice={setMaxPriceFilter} 
                onFilter={handleFilter} 
            />
        {filteredData.length > 0 ? (
            <Box sx={{ bgcolor: '#FFFFFF', height: 'auto', width: '50%', mx: 'auto', borderRadius: '15px', mt: 2, padding: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h5" gutterBottom>
                    Danh mục: {getQueryParam('category')}
                </Typography>
                <Grid container spacing={2}>
                    {filteredData.map((post) => (
                        <Grid item xs={12} key={post.id}>
                            <Button onClick={() => handleCardClick(post.id)} sx={{ padding: 0, width: '100%' }}>
                                <Card sx={{ display: 'flex', width:'100%', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', 
                                    '&:hover': {
                                        transform: 'scale(1.02)', 
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)', 
                                    },
                                }}>
                                    <CardMedia 
                                        component="img" 
                                        sx={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                                        alt={post.title} 
                                        image={imageUrls[post.id]} // Sử dụng URL từ trạng thái
                                    />
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 2,ml: 20, textAlign: 'left' }} >
                                    <Typography variant="subtitle1" component="div" sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 1 }}>
                                                Tiêu đề: {post.title} 
                                            </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', mb: 1 }}>Người đăng: {post.user.name}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', mb: 1 }}>Địa điểm: {post.location}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                                            {post.category === 'Viec Lam' ? `Lương: ${formatPrice(post.job.maxSalary)}` : `Giá: ${formatPrice(post.price)}`}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        ) : (
            <Box sx={{ bgcolor: '#FFFFFF', height: 'auto', width: '50%', mx: 'auto', borderRadius: '10px', mt: 2, padding: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                    <Typography variant="h5" gutterBottom>
                        Kết quả tìm kiếm cho: {getQueryParam('category')}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">Không có kết quả nào.</Typography>
                </Box>
        )}
    </div>
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
            <Search/>
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
 