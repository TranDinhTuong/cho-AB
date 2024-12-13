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
const AdminPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrls, setImageUrls] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [openApproveDialog, setOpenApproveDialog] = useState(false);
    const [postsToApprove, setPostsToApprove] = useState([]);
    const [posts1, setPosts1] = useState([]);
   
    // Hàm để lấy bài viết chưa duyệt cho admin
    const fetchPendingPosts = async () => {
        try {
            const response = await axios.get('http://localhost:9193/api/v1/posts/all?status=PENDING&page=0');
            if (response.data.message === "Success") {
                setPosts1(response.data.data);
                fetchImages(response.data.data);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            setError ('Không có bài đăng nào cần duyệt');
        } finally {
            setLoading(false);
        }
    };

    // Hàm để lấy bài viết đã duyệt cho người dùng
    // const fetchApprovedPosts = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:9193/api/v1/posts/all?status=APPROVED');
    //         if (response.data.message === "Success") {
    //             setPosts(response.data.data);
    //             fetchImages(response.data.data);
    //         } else {
    //             throw new Error(response.data.message);
    //         }
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchImages = async (posts) => {
        const urls = {};
        await Promise.all(posts.map(async (post) => {
            try {
                const response = await axios.get(`http://localhost:9193/api/v1/images/image/download/post/${post.id}`);
                if (response.data.message === "Success!") {
                    urls[post.id] = `http://localhost:9193${response.data.data[0].downloadUrl}`;
                }
            } catch (error) {
                console.error(`Lỗi khi tải ảnh cho bài viết ${post.id}:`, error);
            }
        }));
        setImageUrls(urls);
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:9193/api/v1/posts/product/${postId}/delete`);
            fetchPendingPosts(); // Làm mới danh sách bài viết chưa duyệt
            // fetchApprovedPosts();
        } catch (error) {
            console.error("Lỗi khi xóa bài viết:", error);
        }
    };

    const openConfirmationDialog = (postId) => {
        setPostToDelete(postId);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setPostToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (postToDelete) {
            handleDeletePost(postToDelete);
        }
        handleDialogClose();
    };

    const openApproveConfirmationDialog = (postIds) => {
        setPostsToApprove(postIds);
        setOpenApproveDialog(true);
    };

    const handleApproveDialogClose = () => {
        setOpenApproveDialog(false);
        setPostsToApprove([]);
    };

    const handleConfirmApprove = async () => {
        console.log(postsToApprove); // Kiểm tra nội dung
        if (postsToApprove.length > 0) {
            await handleApprovePosts(postsToApprove); // Gọi hàm duyệt bài viết
        }
        handleApproveDialogClose();
    };

    const handleApprovePosts = async (postIds) => {
        try {
            const promises = postIds.map(async (postId) => {
                const response = await axios.post(`http://localhost:9193/api/v1/posts/review/${postId}/true`);
                return response.data; // Trả về dữ liệu phản hồi
            });

            const results = await Promise.all(promises);
            console.log(results); // Log phản hồi từ máy chủ

            fetchPendingPosts(); // Làm mới danh sách bài viết chưa duyệt
        } catch (error) {
            console.error("Lỗi khi duyệt bài viết:", error);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
        }).format(price) + ' VNĐ';
    };

    useEffect(() => {
        // fetchApprovedPosts();
        fetchPendingPosts(); // Gọi hàm để lấy bài viết chưa duyệt
    }, []);

    if (loading) return <CircularProgress />;
    // if (error) return <Typography variant="h6" color="red"> {error}</Typography>;
    
    const handleApprove = async (id,userID) => {
       const ids = [id];
        // alert(id); // Hiển thị ID để xác nhận
        const type = 'Thông báo về tin đăng';
        const content = 'Tin đăng của bạn đã được duyệt';
        try {
            const response = await axios.post('http://localhost:9193/api/v1/posts/review/3/true', {
                ids, // Gửi mảng ids
              });
              fetchPendingPosts();
            if (response.data.message === "Success") {
                // Xử lý thành công (có thể thông báo cho người dùng)
                alert("Bài viết đã được duyệt!");
                
                const response = await axios.post(`http://localhost:9193/api/v1/notifications/${userID}/add`, {
                    type, // Gửi mảng ids
                    content,
                  });
                  if (response.data.message === "Success"){
                    alert("Thông báo okok!");
                    
                }
            } else {
                // Xử lý nếu message không phải là "Success"
                alert("Xảy ra lỗi: " + response.data.message);
            }
        } catch (error) {
            // Xử lý lỗi (có thể thông báo cho người dùng)
            console.error("Có lỗi xảy ra:", error); // In ra lỗi để kiểm tra
            alert("Không thể duyệt bài viết. Vui lòng thử lại.");
        }
    };

    return (
        <Box sx={{
            bgcolor: '#E8F0FE',
            width: '80%',
            borderRadius: '15px',
            mx: 'auto',
            mt: 2,
            padding: 3,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
        }}>
            {/* Khung cho Quản Lý Bài Viết */}
            {/* <Box sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '10px',
                padding: 2,
                boxShadow: 3,
                mb: 4,
            }}>
                <Typography variant="h4" align="center" sx={{
                    marginBottom: 4,
                    fontWeight: 'bold',
                    color: '#1976d2',
                    textTransform: 'uppercase',
                }}>
                    Quản Lý Bài Viết
                </Typography>
                <Grid container spacing={3} direction="column">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <Grid item xs={12} key={post.id}>
                                <Card sx={{
                                    display: 'flex',
                                    boxShadow: 3,
                                    transition: '0.3s',
                                    '&:hover': { transform: 'scale(1.02)', boxShadow: 12 },
                                    borderRadius: '15px',
                                    backgroundColor: '#98FF98',
                                    padding: 2,
                                    border: '1px solid #e0e0e0',
                                }}>
                                    {imageUrls[post.id] && (
                                        <img
                                            src={imageUrls[post.id]}
                                            alt={post.title}
                                            style={{
                                                width: '500px',
                                                height: '300px',
                                                borderRadius: '8px',
                                                objectFit: 'cover',
                                                marginRight: '16px',
                                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                            }}
                                        />
                                    )}
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography variant="h6" align="left" sx={{
                                            fontWeight: 'bold',
                                            color: '#333',
                                            marginBottom: 1,
                                        }}>
                                            Tiêu đề: {post.title}
                                        </Typography>
                                        <Typography variant="body2" align="left" sx={{
                                            marginTop: '5px',
                                            color: '#555',
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}>
                                            {post.category === 'Viec Lam'
                                                ? `Lương: ${formatPrice(post.job.maxSalary)}`
                                                : `Giá: ${formatPrice(post.price)}`}
                                        </Typography>
                                        <Typography variant="body2" align="left" sx={{
                                            marginTop: '5px',
                                            color: '#555',
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}>Địa chỉ: {post.location}</Typography>
                                        <Typography variant="body2" align="left" sx={{
                                            marginTop: '5px',
                                            fontStyle: 'italic',
                                            color: '#777',
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}>
                                            Mô tả: {post.description || 'Chưa có mô tả.'}
                                        </Typography>
                                        <Typography variant="body2" align="left" sx={{
                                            marginTop: '5px',
                                            color: '#555',
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}>
                                            Ngày đăng: {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                                        </Typography>
                                        <Typography variant="body2" align="left" sx={{
                                            marginTop: '5px',
                                            fontWeight: 'bold',
                                            color: post.status === 'active' ? 'green' : 'red',
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}>
                                            Trạng thái: {post.status === 'active' ? 'Đang hoạt động' : 'Đã ngừng'}
                                        </Typography>
    
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: -2 }}>
                                            <Button 
                                                variant="contained" 
                                                color="error" 
                                                onClick={() => openConfirmationDialog(post.id)} 
                                                sx={{ 
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
                                                    '&:hover': { 
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
                                                        backgroundColor: '#d32f2f', 
                                                    },
                                                    borderRadius: '20px', 
                                                }} 
                                            >
                                                Xóa
                                            </Button>
                                            {post.status === 'pending' && (
                                                <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    onClick={() => handleApprove(post.id)} 
                                                    sx={{ 
                                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
                                                        '&:hover': { 
                                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
                                                            backgroundColor: '#1976d2', 
                                                        },
                                                        borderRadius: '20px', 
                                                    }} 
                                                >
                                                    Duyệt
                                                </Button>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" align="center" sx={{
                            color: '#333',
                            fontStyle: 'italic',
                            marginTop: 4,
                        }}>Không có bài viết nào.</Typography>
                    )}
                </Grid>
            </Box> */}
    
            {/* Khung cho Quản Lý Bài Viết Cần Duyệt */}
            <Box sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '10px',
                padding: 2,
                boxShadow: 3,
                mb: 4,
            }}>
                <Typography variant="h4" align="center" sx={{
                    marginBottom: 4,
                    fontWeight: 'bold',
                    color: '#1976d2',
                    textTransform: 'uppercase',
                }}>
                    Quản Lý Bài Viết Cần Duyệt
                </Typography>
                <Grid container spacing={3} direction="column">
                    {posts1.length > 0 ? (
                        posts1.map(post => (
                            <Grid item xs={12} key={post.id}>
                                <Card sx={{
                                    display: 'flex',
                                    boxShadow: 3,
                                    transition: '0.3s',
                                    '&:hover': { transform: 'scale(1.02)', boxShadow: 12 },
                                    borderRadius: '15px',
                                    backgroundColor: '#98FF98',
                                    padding: 2,
                                    border: '1px solid #e0e0e0',
                                }}>
                                    {imageUrls[post.id] && (
                                        <img
                                            src={imageUrls[post.id]}
                                            alt={post.title}
                                            style={{
                                                width: '500px',
                                                height: '300px',
                                                borderRadius: '8px',
                                                objectFit: 'cover',
                                                marginRight: '16px',
                                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                            }}
                                        />
                                    )}
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography variant="h6" align="left" sx={{
                                            fontWeight: 'bold',
                                            color: '#333',
                                            marginBottom: 1,
                                        }}>
                                            Tiêu đề: {post.title}
                                        </Typography>
                                        <Typography variant="body2" align="left" sx={{
                                            marginTop: '5px',
                                            color: '#555',
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}>
                                            {post.category === 'Viec Lam'
                                                ? `Lương: ${formatPrice(post.job.maxSalary)}`
                                                : `Giá: ${formatPrice(post.price)}`}
                                        </Typography>
                                        <Typography variant="body2" align="left" sx={{
                                            marginTop: '5px',
                                            color: '#555',
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}>Địa chỉ: {post.location}</Typography>
                                        <Typography variant="body2" align="left" sx={{
                                            marginTop: '5px',
                                            fontStyle: 'italic',
                                            color: '#777',
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}>
                                            Mô tả: {post.description || 'Chưa có mô tả.'}
                                        </Typography>
                                        {/* <Typography variant="body2" align="left" sx={{
                                            marginTop: '5px',
                                            color: '#555',
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}>
                                            Ngày đăng: {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                                        </Typography>
                                        <Typography variant="body2" align="left" sx={{
                                            marginTop: '5px',
                                            fontWeight: 'bold',
                                            color: post.status === 'active' ? 'green' : 'red',
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}>
                                            Trạng thái: {post.status === 'active' ? 'Đang hoạt động' : 'Đã ngừng'}
                                        </Typography> */}
    
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: -2 }}>
                                            <Button 
                                                variant="contained" 
                                                color="error" 
                                                onClick={() => openConfirmationDialog(post.id)} 
                                                sx={{ 
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
                                                    '&:hover': { 
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
                                                        backgroundColor: '#d32f2f', 
                                                    },
                                                    borderRadius: '20px', 
                                                }} 
                                            >
                                                Xóa
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                onClick={() => handleApprove(post.id,post.user.id)} 
                                                sx={{ 
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
                                                    '&:hover': { 
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
                                                        backgroundColor: '#1976d2', 
                                                    },
                                                    borderRadius: '20px', 
                                                }} 
                                            >
                                                Duyệt
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" align="center" sx={{
                            color: '#333',
                            fontStyle: 'italic',
                            marginTop: 4,
                        }}>Không có bài viết nào cần duyệt.</Typography>
                    )}
                </Grid>
            </Box>
    
            {/* Dialog xác nhận xóa */}
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                sx={{ '& .MuiDialog-paper': { borderRadius: '15px', padding: 2 } }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>Xác Nhận Xóa</DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography align="center" sx={{ fontSize: '16px', color: '#333' }}>
                        Bạn có chắc chắn muốn xóa tin này không?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                    <Button onClick={handleDialogClose} color="primary" variant="outlined" sx={{ marginRight: 1 }}>
                        Hủy
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        Đồng Ý
                    </Button>
                </DialogActions>
            </Dialog>
    
            {/* Dialog xác nhận duyệt */}
            <Dialog
                open={openApproveDialog}
                onClose={handleApproveDialogClose}
                sx={{ '& .MuiDialog-paper': { borderRadius: '15px', padding: 2 } }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>Xác Nhận Duyệt</DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography align="center" sx={{ fontSize: '16px', color: '#333' }}>
                        Bạn có chắc chắn muốn duyệt tin này không?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                    <Button onClick={handleApproveDialogClose} color="primary" variant="outlined" sx={{ marginRight: 1 }}>
                        Hủy
                    </Button>
                    <Button onClick={handleConfirmApprove} color="primary" variant="contained">
                        Đồng Ý
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
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
                    <Button sx={{ color: 'white', marginLeft: 2, marginRight: 2 }} onClick ={handleQuanLi} ><ShoppingBagIcon /></Button>
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
    bgcolor: '#F0F4F8', // Màu nền nhẹ cho box
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
<AdminPosts />
    

  
          


   


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