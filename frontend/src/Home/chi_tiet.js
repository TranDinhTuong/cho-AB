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
import { useParams } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message'; // Biểu tượng tin nhắn
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {  Grid,Paper, Card,CardContent, CardMedia } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import NoteIcon from '@mui/icons-material/Note';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TransgenderIcon from '@mui/icons-material/Transgender';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import {
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
function ChiTiet(){
    
    const handleLogInClick = () => {
        // Hiển thị ô vuông khi bấm nút SignUp
      };
      const [anchorEl, setAnchorEl] = useState(null);
const navigate = useNavigate();
  const handleHome = () => {
    // Hiển thị ô vuông khi bấm nút SignUp
    navigate('/home');
  };
  const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
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
  const { id } = useParams();
    // const id = 1;
    function formatPrice(price) {
        // Nhân giá với 1.000 để thêm ba số 0
        // const formattedPrice = price * 1000; 
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
        }).format(price) + ' VNĐ';
    }
    const ImageGallery = () => {
        const [imageUrls, setImageUrls] = useState({});
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
        const [imageKeys, setImageKeys] = useState([]);
    
        const fetchImages = async () => {
            const urls = {};
            try {
                const response = await axios.get(`http://localhost:9193/api/v1/images/image/download/post/${id}`);
                if (response.data.message === "Success!") {
                    response.data.data.forEach((image, index) => {
                        urls[`${id}-${index}`] = `http://localhost:9193${image.downloadUrl}`;
                    });
                    setImageKeys(Object.keys(urls));
                    setImageUrls(urls);
                }
            } catch (error) {
                console.error(`Error fetching images for post ${id}:`, error);
            }
        };
    
        useEffect(() => {
            fetchImages();
        }, [id]);
    
        const handleNextImage = () => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageKeys.length);
        };
    
        const handlePreviousImage = () => {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageKeys.length) % imageKeys.length);
        };
    
        return (
            <Grid item xs={12} sm={6}>
                {imageKeys.length > 0 && (
                    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                        <img 
                            src={imageUrls[imageKeys[currentImageIndex]]} 
                            alt={`Image for post ${imageKeys[currentImageIndex]}`} 
                            style={{ width: '100%', height: '300px' }} 
                        />
                        <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}>
                            <Button 
                                onClick={handlePreviousImage} 
                                disabled={imageKeys.length <= 1}
                                style={{ backgroundColor: 'gray', color: 'black' }} // Nền xám, mũi tên đen
                            >
                                <ArrowBackIcon style={{ color: 'black' }} />
                            </Button>
                        </div>
                        <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                            <Button 
                                onClick={handleNextImage} 
                                disabled={imageKeys.length <= 1}
                                style={{ backgroundColor: 'gray', color: 'black' }} // Nền xám, mũi tên đen
                            >
                                <ArrowForwardIcon style={{ color: 'black' }} />
                            </Button>
                        </div>
                    </div>
                )}
            </Grid>
        );
    };
    
    const ProductDetails = () => {
        const [details, setDetails] = useState(null);
    
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:9193/api/v1/posts/post/${id}/post`);
                if (response.data.message === "Success") {
                    // alert(response.data.data.user.name);
                    setDetails(response.data.data);
                } else {
                    alert('Không tìm thấy sản phẩm');
                }
            } catch (error) { 
                console.error("Error fetching posts:", error);
                alert('Lấy dữ liệu thất bại');
            }
        };

        useEffect(() => {
            fetchPost();
        }, [id]);
    
        if (!details) {
            return <Typography variant="h6">Đang tải dữ liệu...</Typography>;
        }
        if (details.category === 'Xe Co')
        {
        return (
            <>
                <Paper sx={{ bgcolor: '#FFFFFF', width: '70%', borderRadius: '15px', mx: 'auto', mt: 2, padding: 2 }}>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12} sm={6}> */}
                            {/* {Object.keys(imageUrls).map((key) => (
                            <img key={key} src={imageUrls[key]} alt={`Image for post ${key}`} style={{ width: '100%' }} /> ))} */}
                        {/* </Grid> */}
                        <ImageGallery />
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" gutterBottom>
                                {details.title}
                            </Typography>
                            <Typography variant="h6" color="red">
                                Giá: {formatPrice(details.price)}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <CheckCircleIcon color='green' sx={{ marginRight: 1 }} />
                                Tình trạng: {details.vehicle.mileage > 0 ? 'Đã qua sử dụng' : 'Còn mới' }
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <AccessTimeIcon color='blue' sx={{ marginRight: 1 }} />
                                Năm sản xuất: {details.vehicle.year}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <ColorLensIcon color='orange' sx={{ marginRight: 1 }} />
                                Màu sắc: {details.vehicle.color}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <LocationOnIcon color='purple' sx={{ marginRight: 1 }} />
                                Địa chỉ: {details.location}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4, padding: 1, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                <PersonIcon sx={{ fontSize: 40, marginRight: 2 }} /> {/* Tăng kích thước biểu tượng */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        {details.user.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left' }}>
                                        <strong>Đánh giá:</strong> {details.user.rating ? details.user.rating : 'Chưa có đánh giá'}
                                    </Typography>
                                </Box>
                                <Button variant="contained" startIcon={<MessageIcon />} sx={{ bgcolor: '#2196F3' }}>
                                    Nhắn tin
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper> 
                 <Paper sx={{ bgcolor: '#FFFFFF', width: '40%', borderRadius: '15px', textAlign: 'left', mt: 2, padding: 2,marginLeft: 27 }}> 
                 <Typography variant='h5' style={{ fontWeight: 'bold' }} color='#000000'>
                    Mô tả chi tiết 
                </Typography>
                <List sx={{ padding: 0 }}>
                    {[
                        `Hãng sản xuất: ${details.vehicle.manufacturer}`,
                        `Năm sản xuất: ${details.vehicle.year}`,
                        `Loại nhiên liệu: ${details.vehicle.fuelType}`,
                        `Xuất xứ: ${details.vehicle.origin}`,
                        `Biển số: ${details.vehicle.licensePlate}`,
                        `Màu sắc: ${details.vehicle.color}`,
                        `Số km đã đi: ${details.vehicle.mileage}` + ' km',
                    ].map((text, index) => (
                        <ListItem key={index} sx={{ padding: '4px 0' }}>
                            <ListItemText 
                                primary={
                                    <span style={{ fontSize: '1.2rem' }}> {/* Tăng kích thước chữ */}
                                        <span style={{
                                            display: 'inline-block',
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: 'black',
                                            marginRight: '20px', // Khoảng cách giữa dấu chấm và văn bản
                                            verticalAlign: 'middle', // Căn giữa với văn bản
                                        }} />
                                        {text}
                                    </span>
                                } 
                            />
                        </ListItem>
                    ))}
                </List>
                </Paper> 
            </>
        );
    }
    else if (details.category === 'Dien Thoai') {
        return (
        <>
        <Paper sx={{ bgcolor: '#FFFFFF', width: '70%', borderRadius: '15px', mx: 'auto', mt: 2, padding: 2 }}>
            <Grid container spacing={2}>
                <ImageGallery/>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" gutterBottom>
                        {details.title}
                    </Typography>
                    <Typography variant="h6" color="red">
                        Giá: {formatPrice(details.price)}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <CheckCircleIcon color='green' sx={{ marginRight: 1 }} />
                        Tình trạng: {details.phone.condition}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <LocalShippingIcon color='blue' sx={{ marginRight: 1 }} />
                        Nguồn gốc : {details.phone.origin}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <ColorLensIcon color='orange' sx={{ marginRight: 1 }} />
                        Màu sắc: {details.phone.color}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <LocationOnIcon color='purple' sx={{ marginRight: 1 }} />
                        Địa chỉ: {details.location}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4, padding: 1, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                        <PersonIcon sx={{ fontSize: 40, marginRight: 2 }} /> {/* Tăng kích thước biểu tượng */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                {details.user.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left' }}>
                                <strong>Đánh giá:</strong> {details.user.rating ? details.user.rating : 'Chưa có đánh giá'}
                            </Typography>
                        </Box>
                        <Button variant="contained" startIcon={<MessageIcon />} sx={{ bgcolor: '#2196F3' }}>
                            Nhắn tin
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper> 
         <Paper sx={{ bgcolor: '#FFFFFF', width: '40%', borderRadius: '15px', textAlign: 'left', mt: 2, padding: 2,marginLeft: 27 }}> 
         <Typography variant='h5' style={{ fontWeight: 'bold' }} color='#000000'>
            Mô tả chi tiết 
        </Typography>
        <List sx={{ padding: 0 }}>
            {[
                `Hãng sản xuất: ${details.phone.brand}`,
                `Phiên bản: ${details.phone.model}`,
                `Nguốn gốc: ${details.phone.origin}`,
                `Màu sắc: ${details.phone.color}`,
                `Dung lượng: ${details.phone.storage}`,
            ].map((text, index) => (
                <ListItem key={index} sx={{ padding: '4px 0' }}>
                    <ListItemText 
                        primary={
                            <span style={{ fontSize: '1.2rem' }}> 
                                <span style={{
                                    display: 'inline-block',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: 'black',
                                    marginRight: '20px', // Khoảng cách giữa dấu chấm và văn bản
                                    verticalAlign: 'middle', // Căn giữa với văn bản
                                }} />
                                {text}
                            </span>
                        } 
                    />
                </ListItem>
            ))}
        </List>
        </Paper> 
    </>
        )
    }  else if (details.category === 'Viec Lam') {
        return (
        <>
        <Paper sx={{ bgcolor: '#FFFFFF', width: '70%', borderRadius: '15px', mx: 'auto', mt: 2, padding: 2 }}>
            <Grid container spacing={2}>
                <ImageGallery/>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" gutterBottom>
                        {details.title}
                    </Typography>
                    <Typography variant="h6" color="red">
                        Lương :{formatPrice(details.job.minSalary)  + ' - ' + formatPrice(details.job.maxSalary)}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <CategoryIcon color='green' sx={{ marginRight: 1 }} />
                        Loại công việc : {details.job.jobType}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <AccessTimeIcon color='blue' sx={{ marginRight: 1 }} />
                        Độ tuổi : {details.job.minAge + ' - ' + details.job.maxAge} 
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <TransgenderIcon color='orange' sx={{ marginRight: 1 }} />
                        Giới tính: {details.job.gender}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <LocationOnIcon color='purple' sx={{ marginRight: 1 }} />
                        Địa chỉ: {details.location}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4, padding: 1, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                <PersonIcon sx={{ fontSize: 40, marginRight: 2 }} /> {/* Tăng kích thước biểu tượng */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        {details.user.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left' }}>
                                        <strong>Đánh giá:</strong> {details.user.rating ? details.user.rating : 'Chưa có đánh giá'}
                                    </Typography>
                                </Box>
                                <Button variant="contained" startIcon={<MessageIcon />} sx={{ bgcolor: '#2196F3' }}>
                                    Nhắn tin
                                </Button>
                            </Box>
                </Grid>
            </Grid>
        </Paper> 
         <Paper sx={{ bgcolor: '#FFFFFF', width: '40%', borderRadius: '15px', textAlign: 'left', mt: 2, padding: 2,marginLeft: 27 }}> 
         <Typography variant='h5' style={{ fontWeight: 'bold' }} color='#000000'>
            Mô tả chi tiết 
        </Typography>
        <List sx={{ padding: 0 }}>
            {[
                `Công ty: ${details.job.companyName}`,
                `Số lượng cần tuyển: ${details.job.quantity}`,
                `Ngành nghề: ${details.job.industry}`,
                `Loại công việc: ${details.job.jobType}`,
                `Mức lương: ${details.job.salaryType} từ ${details.job.minSalary.toLocaleString()} đến ${details.job.maxSalary.toLocaleString()}`,
                `Độ tuổi: Từ ${details.job.minAge} đến ${details.job.maxAge}`,
                `Giới tính: ${details.job.gender}`,
                `Trình độ học vấn: ${details.job.educationLevel}`,
                `Kinh nghiệm: ${details.job.experience}`,
                `Chứng chỉ: ${details.job.certificates}`
            ].map((text, index) => (
                <ListItem key={index} sx={{ padding: '4px 0' }}>
                    <ListItemText 
                        primary={
                            <span style={{ fontSize: '1.2rem' }}> 
                                <span style={{
                                    display: 'inline-block',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: 'black',
                                    marginRight: '20px', // Khoảng cách giữa dấu chấm và văn bản
                                    verticalAlign: 'middle', // Căn giữa với văn bản
                                }} />
                                {text}
                            </span>
                        } 
                    />
                </ListItem>
            ))}
        </List>
        </Paper> 
    </>
        )
    } else if (details.category === 'Phong tro') {
        return (
        <>
        <Paper sx={{ bgcolor: '#FFFFFF', width: '70%', borderRadius: '15px', mx: 'auto', mt: 2, padding: 2 }}>
            <Grid container spacing={2}>
                <ImageGallery/>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" gutterBottom>
                        {details.title}
                    </Typography>
                    <Typography variant="h6" color="red">
                        Giá : {formatPrice(details.price)}    
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <SquareFootIcon color='green' sx={{ marginRight: 1 }} />
                        Diện tích : {details.motel.area}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <MonetizationOnIcon color='blue' sx={{ marginRight: 1 }} />
                        Tiền cọc : {formatPrice(details.motel.deposit)} 
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <LocationOnIcon color='purple' sx={{ marginRight: 1 }} />
                        Địa chỉ: {details.location}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4, padding: 1, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                <PersonIcon sx={{ fontSize: 40, marginRight: 2 }} /> {/* Tăng kích thước biểu tượng */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        {details.user.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left' }}>
                                        <strong>Đánh giá:</strong> {details.user.rating ? details.user.rating : 'Chưa có đánh giá'}
                                    </Typography>
                                </Box>
                                <Button variant="contained" startIcon={<MessageIcon />} sx={{ bgcolor: '#2196F3' }}>
                                    Nhắn tin
                                </Button>
                            </Box>
                </Grid>
            </Grid>
        </Paper> 
         <Paper sx={{ bgcolor: '#FFFFFF', width: '40%', borderRadius: '15px', textAlign: 'left', mt: 2, padding: 2,marginLeft: 27 }}> 
         <Typography variant='h5' style={{ fontWeight: 'bold' }} color='#000000'>
            Mô tả chi tiết 
        </Typography>
        <List sx={{ padding: 0 }}>
            {[
                `Giá thuê: ${formatPrice(details.price)}`,
                `Diện tích: ${details.motel.area}`,
                `Tiền cọc: ${formatPrice(details.motel.deposit)} `,
                `Địa chỉ: ${details.location}`
            ].map((text, index) => (
                <ListItem key={index} sx={{ padding: '4px 0' }}>
                    <ListItemText 
                        primary={
                            <span style={{ fontSize: '1.2rem' }}> 
                                <span style={{
                                    display: 'inline-block',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: 'black',
                                    marginRight: '20px', // Khoảng cách giữa dấu chấm và văn bản
                                    verticalAlign: 'middle', // Căn giữa với văn bản
                                }} />
                                {text}
                            </span>
                        } 
                    />
                </ListItem>
            ))}
        </List>
        </Paper> 
    </>
        )
    } else if (details.category === 'Do gia dung') {
        return (
            <>
                <Paper sx={{ bgcolor: '#FFFFFF', width: '70%', borderRadius: '15px', mx: 'auto', mt: 2, padding: 2 }}>
                    <Grid container spacing={2}>
                    <ImageGallery/>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" gutterBottom>
                                {details.title}
                            </Typography>
                            <Typography variant="h6" color="red">
                                Giá: {formatPrice(details.price)}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <InventoryIcon   color='purple' sx={{ marginRight: 1 }} />
                                Sản phẩm: {details.household.name}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <LocalShippingIcon color='purple' sx={{ marginRight: 1 }} />
                                Xuất xứ: {details.household.origin}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <CheckCircleIcon color='purple' sx={{ marginRight: 1 }} />
                                Tình trạng: {details.household.status}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <LocationOnIcon color='purple' sx={{ marginRight: 1 }} />
                                Địa chỉ: {details.location}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4, padding: 1, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                <PersonIcon sx={{ fontSize: 40, marginRight: 2 }} /> {/* Tăng kích thước biểu tượng */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        {details.user.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left' }}>
                                        <strong>Đánh giá:</strong> {details.user.rating ? details.user.rating : 'Chưa có đánh giá'}
                                    </Typography>
                                </Box>
                                <Button variant="contained" startIcon={<MessageIcon />} sx={{ bgcolor: '#2196F3' }}>
                                    Nhắn tin
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper> 
                <Paper sx={{ bgcolor: '#FFFFFF', width: '40%', borderRadius: '15px', textAlign: 'left', mt: 2, padding: 2, marginLeft: 27 }}>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }} color='#000000'>
                        Mô tả chi tiết 
                    </Typography>
                    <List sx={{ padding: 0 }}>
                        {[
                            `Tên sản phẩm: ${details.household.name}`,
                            `Xuất xứ: ${details.household.origin}`,
                            `Tình trạng: ${details.household.status}`,
                            `Giá: ${formatPrice(details.price)}`,
                        ].map((text, index) => (
                            <ListItem key={index} sx={{ padding: '4px 0' }}>
                                <ListItemText 
                                    primary={
                                        <span style={{ fontSize: '1.2rem' }}> 
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: 'black',
                                                marginRight: '20px',
                                                verticalAlign: 'middle',
                                            }} />
                                            {text}
                                        </span>
                                    } 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper> 
            </>
        );
    } else if (details.category === 'Thoi trang') {
        return (
            <>
                <Paper sx={{ bgcolor: '#FFFFFF', width: '70%', borderRadius: '15px', mx: 'auto', mt: 2, padding: 2 }}>
                    <Grid container spacing={2}>
                    <ImageGallery/>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" gutterBottom>
                                {details.title}
                            </Typography>
                            <Typography variant="h6" color="red">
                                Giá: {formatPrice(details.price)}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <InventoryIcon   color='purple' sx={{ marginRight: 1 }} />
                                Sản phẩm: {details.fashion.name}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <CategoryIcon color='purple' sx={{ marginRight: 1 }} />
                                Loại sản phẩm: {details.fashion.type}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <CheckCircleIcon color='purple' sx={{ marginRight: 1 }} />
                                Tình trạng: {details.fashion.status}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <LocationOnIcon color='purple' sx={{ marginRight: 1 }} />
                                Địa chỉ: {details.location}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4, padding: 1, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                <PersonIcon sx={{ fontSize: 40, marginRight: 2 }} /> {/* Tăng kích thước biểu tượng */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        {details.user.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left' }}>
                                        <strong>Đánh giá:</strong> {details.user.rating ? details.user.rating : 'Chưa có đánh giá'}
                                    </Typography>
                                </Box>
                                <Button variant="contained" startIcon={<MessageIcon />} sx={{ bgcolor: '#2196F3' }}>
                                    Nhắn tin
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper> 
                <Paper sx={{ bgcolor: '#FFFFFF', width: '40%', borderRadius: '15px', textAlign: 'left', mt: 2, padding: 2, marginLeft: 27 }}>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }} color='#000000'>
                        Mô tả chi tiết 
                    </Typography>
                    <List sx={{ padding: 0 }}>
                        {[
                            `Tên sản phẩm: ${details.fashion.name}`,
                            `Loại sản phẩm: ${details.fashion.type}`,
                            `Tình trạng: ${details.fashion.status}`,
                            `Giá: ${formatPrice(details.price)}`,
                        ].map((text, index) => (
                            <ListItem key={index} sx={{ padding: '4px 0' }}>
                                <ListItemText 
                                    primary={
                                        <span style={{ fontSize: '1.2rem' }}> 
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: 'black',
                                                marginRight: '20px',
                                                verticalAlign: 'middle',
                                            }} />
                                            {text}
                                        </span>
                                    } 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper> 
            </>
        );
    } else if (details.category === 'Sach') {
        return (
            <>
                <Paper sx={{ bgcolor: '#FFFFFF', width: '70%', borderRadius: '15px', mx: 'auto', mt: 2, padding: 2 }}>
                    <Grid container spacing={2}>
                    <ImageGallery/>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" gutterBottom>
                                {details.title}
                            </Typography>
                            <Typography variant="h6" color="red">
                                Giá: {formatPrice(details.price)}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <InventoryIcon   color='purple' sx={{ marginRight: 1 }} />
                                Tên sách: {details.book.name}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <LocalShippingIcon color='purple' sx={{ marginRight: 1 }} />
                                Nhà xuất bản: {details.book.origin}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <CheckCircleIcon color='purple' sx={{ marginRight: 1 }} />
                                Tình trạng: {details.book.status}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <LocationOnIcon color='purple' sx={{ marginRight: 1 }} />
                                Địa chỉ: {details.location}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4, padding: 1, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                <PersonIcon sx={{ fontSize: 40, marginRight: 2 }} /> {/* Tăng kích thước biểu tượng */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        {details.user.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left' }}>
                                        <strong>Đánh giá:</strong> {details.user.rating ? details.user.rating : 'Chưa có đánh giá'}
                                    </Typography>
                                </Box>
                                <Button variant="contained" startIcon={<MessageIcon />} sx={{ bgcolor: '#2196F3' }}>
                                    Nhắn tin
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper> 
                <Paper sx={{ bgcolor: '#FFFFFF', width: '40%', borderRadius: '15px', textAlign: 'left', mt: 2, padding: 2, marginLeft: 27 }}>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }} color='#000000'>
                        Mô tả chi tiết 
                    </Typography>
                    <List sx={{ padding: 0 }}>
                        {[
                            `Tên sách: ${details.book.name}`,
                            `Nhà xuất bản: ${details.book.origin}`,
                            `Thể loại: ${details.book.type}`,
                            `Năm xuất bản: ${details.book.year}`,
                            `Tình trạng: ${details.book.status}`,
                            `Giá: ${formatPrice(details.price)}`,
                        ].map((text, index) => (
                            <ListItem key={index} sx={{ padding: '4px 0' }}>
                                <ListItemText 
                                    primary={
                                        <span style={{ fontSize: '1.2rem' }}> 
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: 'black',
                                                marginRight: '20px',
                                                verticalAlign: 'middle',
                                            }} />
                                            {text}
                                        </span>
                                    } 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper> 
            </>
        );
    } else if (details.category === 'Thu cung') {
        return (
            <>
                <Paper sx={{ bgcolor: '#FFFFFF', width: '70%', borderRadius: '15px', mx: 'auto', mt: 2, padding: 2 }}>
                    <Grid container spacing={2}>
                        <ImageGallery/>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" gutterBottom>
                                {details.title}
                            </Typography>
                            <Typography variant="h6" color="red">
                                Giá: {formatPrice(details.price)}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <CategoryIcon   color='purple' sx={{ marginRight: 1 }} />
                                Giống chó: {details.pet.name}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <AccessTimeIcon color='purple' sx={{ marginRight: 1 }} />
                                Tuổi: {details.pet.age} năm
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <CheckCircleIcon color='purple' sx={{ marginRight: 1 }} />
                                Kích cỡ: {details.pet.size}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                                <LocationOnIcon color='purple' sx={{ marginRight: 1 }} />
                                Địa chỉ: {details.location}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4, padding: 1, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                <PersonIcon sx={{ fontSize: 40, marginRight: 2 }} /> {/* Tăng kích thước biểu tượng */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        {details.user.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left' }}>
                                        <strong>Đánh giá:</strong> {details.user.rating ? details.user.rating : 'Chưa có đánh giá'}
                                    </Typography>
                                </Box>
                                <Button variant="contained" startIcon={<MessageIcon />} sx={{ bgcolor: '#2196F3' }}>
                                    Nhắn tin
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper sx={{ bgcolor: '#FFFFFF', width: '40%', borderRadius: '15px', textAlign: 'left', mt: 2, padding: 2, marginLeft: 27 }}>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }} color='#000000'>
                        Mô tả chi tiết
                    </Typography>
                    <List sx={{ padding: 0 }}>
                        {[
                            `Giống chó: ${details.pet.name}`,
                            `Tuổi: ${details.pet.age} năm`,
                            `Kích cỡ: ${details.pet.size}`,
                            `Giá: ${formatPrice(details.price)}`,
                        ].map((text, index) => (
                            <ListItem key={index} sx={{ padding: '4px 0' }}>
                                <ListItemText 
                                    primary={
                                        <span style={{ fontSize: '1.2rem' }}> 
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: 'black',
                                                marginRight: '20px',
                                                verticalAlign: 'middle',
                                            }} />
                                            {text}
                                        </span>
                                    } 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </>
        );
    }

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
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
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
                    <Button variant='outlined' color={'inherit'} onClick={handleLogInClick} sx={{ 
                        fontSize: '1.0rem', 
                        marginRight: '10px', 
                        color: '#380B61', 
                        borderRadius: '9px', 
                        // padding: '7px 25px',
                        display: 'flex', 
                        alignItems: 'center', 
                        fontWeight: 'bold',
                    }}>
                        <NoteIcon fontSize='small' style={{ textTransform: 'none', marginRight: '8px', fontWeight: 'bold' }} /> ĐĂNG TIN
                    </Button>
                    <Button variant='outlined' color={'inherit'} onClick={handleLogInClick} sx={{ 
                        fontSize: '1.0rem', 
                        marginRight: '10px', 
                        color: '#380B61', 
                        borderRadius: '9px', 
                        // padding: '7px 25px',
                        display: 'flex', 
                        alignItems: 'center', 
                        fontWeight: 'bold',
                    }}>
                        <LoginIcon fontSize='small' style={{ textTransform: 'none', marginRight: '8px', fontWeight: 'bold' }} /> ĐĂNG NHẬP
                    </Button>
                </Toolbar>
            </AppBar>

            <ProductDetails/>
            {/* <Paper sx={{ bgcolor: '#FFFFFF', width: '40%', borderRadius: '15px', textAlign: 'left', mt: 2, padding: 2,marginLeft: 27 }}>
            <Typography variant='h5' style={{ fontWeight: 'bold' }} color='#000000'>
                Mô tả chi tiết 
            </Typography>
            </Paper>  */}
            <Box sx={{ width: '100%', mx: 'auto',marginTop: 5, backgroundColor: '#FFFFFF' , textAlign: 'left'}}>
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
export default ChiTiet;