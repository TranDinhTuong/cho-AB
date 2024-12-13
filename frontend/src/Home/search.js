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
import {  Grid, Card,CardContent, CardMedia } from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';
import {  Popover, List, ListItem, ListItemText,    Accordion,
    AccordionSummary,
    AccordionDetails,Slider } from '@mui/material';
    import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
                  CustomerLoginSuccessPage(result.data.id,Customers_name)//sẽ truyền thêm các dữ liệu khác khi đây ko còn là user mà là đối tượng
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
    function CustomerLoginSuccessPage( CustomerUserID, TeacherName ) {
      // Lưu userId vào localStorage
      console.log(CustomerUserID)
      localStorage.setItem('CustomerUserID', CustomerUserID);
      localStorage.setItem('CustomerName', TeacherName);

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
                        <MenuItem onClick={()=> navigate('/search_category?category=Xe Cộ')}>Xe cộ</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Điện thoại')}>Điện thoại</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Đồ gia dụng')}>Đồ gia dụng</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Phòng trọ')}>Phòng trọ</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Thú cưng')}>Thú cưng</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Sách')}>Sách</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Việc làm')}>Việc làm</MenuItem>
                        <MenuItem onClick={()=> navigate('/search_category?category=Thời trang')}>Thời trang</MenuItem>
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
    const navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrls, setImageUrls] = useState({});
    
    const [addressFilter, setAddressFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [minPriceFilter, setMinPriceFilter] = useState(0);
    const [maxPriceFilter, setMaxPriceFilter] = useState(50000000);

    const getQueryParam = (param) => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get(param);
    };

    useEffect(() => {
        const title = getQueryParam('title');
        if (title) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:9193/api/v1/posts/post/all/posts?title=${encodeURIComponent(title)}`);
                    
                    if (response.data.message === "Success") {
                        setAllData(response.data.data || []);
                        setFilteredData(response.data.data || []);
                        fetchImages(response.data.data);
                    } else {
                        setAllData([]);
                        alert('Không tìm thấy sản phẩm.');
                    }
                } catch (err) {
                    setAllData([]);
                    console.error('Error:', err);
                    // setError(err);
                    // alert('Đã xảy ra lỗi khi lấy dữ liệu.');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        } else {
            setAllData([]);
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
        setImageUrls(urls);
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
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
                <Box sx={{ bgcolor: '#FFFFFF', height: 'auto', width: '50%', mx: 'auto', borderRadius: '10px', mt: 2, padding: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                    <Typography variant="h5" gutterBottom>
                        Kết quả tìm kiếm cho: {getQueryParam('title')}
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
                                            image={imageUrls[post.id]}
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
                        Kết quả tìm kiếm cho: {getQueryParam('title')}
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
                    <Button sx={{ color: 'white', marginLeft: 2, marginRight: 1 }} onClick={handlePost} ><ShoppingCartIcon /></Button>
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
 