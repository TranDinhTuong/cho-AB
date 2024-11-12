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
function ChiTiet(){
    const { id } = useParams();
    const ProductID = id - 1 ; // ID sản phẩm từ URL

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
  const product = [
    {
      name: 'Điện thoại Samsung Galaxy S21',
      price: '12.000.000 VNĐ',
      storage: '128 GB',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Đen',
      description: 'Điện thoại thông minh với màn hình AMOLED 6.2 inch, camera kép 12MP.',
      image: '/sp1.png',
      location:'123 Nguyễn Văn Linh, Phường Bình Hiên, Đà Nẵng'
    },
    {
      name: 'Xe máy Honda SH 2020',
      price: '70.000.000 VNĐ',
      storage: '150cc',
      condition: 'Đã sử dụng',
      warranty: 'Hết bảo hành',
      color: 'Đỏ',
      description: 'Xe máy Honda SH 2020, chạy được 10.000 km, còn mới.',
      image: '/sp2.png',
      location:'456 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh',
    },
    {
      name: 'Máy tính xách tay Dell XPS 13',
       price: '25.000.000 VNĐ',
      storage: '512 GB SSD',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Bạc',
      description: 'Máy tính xách tay Dell XPS 13 với vi xử lý Intel i7, màn hình 13.3 inch.',
      image: '/sp3.png',
      location:'789 Lê Duẩn, Phường Trúc Bạch, Hà Nội',
    },
    {
      name: 'Tủ lạnh Samsung ',
      price: '15.000.000 VNĐ',
      storage: '450L',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Bạc',
      description: 'Tủ lạnh Samsung 450L, công nghệ inverter tiết kiệm điện.',
      image: '/sp4.png',
      location:'321 Đinh Tiên Hoàng, Thành phố Nha Trang, Khánh Hòa',
    },
    {
      name: 'Máy ảnh Canon EOS M50',
      price: '18.000.000 VNĐ',
      storage: '',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Đen',
      description: 'Máy ảnh mirrorless Canon EOS M50, 24.1 MP, quay video 4K.',
      image: '/sp5.png',
      location:'654 Hùng Vương, Thành phố Huế, Thừa Thiên Huế',
    },
    {
      name: 'Tai nghe Sony WH-1000XM4',
      price: '7.000.000 VNĐ',
      storage: '',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Đen',
      description: 'Tai nghe không dây Sony WH-1000XM4, chống ồn tuyệt đối.',
      image: '/sp6.png',
      location:'987 Hoàng Văn Thụ, Quận Hải Châu, Đà Nẵng',
    },
    {
      name: 'Bàn phím cơ Logitech G Pro',
      price: '3.000.000 VNĐ',
      storage: '',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Đen',
      description: 'Bàn phím cơ Logitech G Pro với switch GL và đèn LED RGB.',
      image: '/sp7.png',
      location:'135 Lê Thanh Nghị, Thành phố Hải Phòng',
    },
    {
      name: 'Ghế gaming Corsair',
      price: '4.500.000 VNĐ',
      storage: '',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Đen',
      description: 'Ghế gaming Corsair với thiết kế công thái học, phù hợp cho game thủ.',
      image: '/sp8.png',
      location:'246 Nguyễn Tất Thành, Thành phố Quy Nhơn, Bình Định',
    },
    {
      name: 'Đồng hồ thông minh Apple Watch',
      price: '10.000.000 VNĐ',
      storage: '',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Đen',
      description: 'Đồng hồ thông minh Apple Watch Series 6, theo dõi sức khỏe.',
      image: '/sp9.png',
      location:'369 Trần Phú, Thành phố Hạ Long, Quảng Ninh',
    },
    {
      name: 'Máy giặt LG ',
      price: '8.000.000 VNĐ',
      storage: '8kg',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Trắng',
      description: 'Máy giặt LG 8kg, công nghệ giặt 6 Motion, tiết kiệm nước.',
      image: '/sp10.png',
      location:'852 Nguyễn Hữu Thọ, Thành phố Cần Thơ',
    },
    {
      name: 'Điện thoại iPhone 12',
      price: '15.000.000 VNĐ',
      storage: '64 GB',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Xanh',
      description: 'Điện thoại thông minh iPhone 12 với chip A14 Bionic, camera kép.',
      image: '/sp11.png',
      location:'159 Phan Châu Trinh, Quận 3, TP. Hồ Chí Minh',
    },
    {
      name: 'Laptop HP Pavilion',
      price: '22.000.000 VNĐ',
      storage: '256 GB SSD',
      condition: 'Mới 100%',
      warranty: 'Còn bảo hành',
      color: 'Bạc',
      description: 'Laptop HP Pavilion với màn hình 15.6 inch, vi xử lý Intel i5.', 
      image: '/sp12.png',
      location:'753 Nguyễn Văn Thoại, Phường Mỹ An, Đà Nẵng',
    },
]
let content;
switch ( ProductID ) {
    case 0:
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Điện thoại Samsung Galaxy S21
                </Typography>
                <Typography variant='body1'>
                    Giá: 12.000.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Mới 100%
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: Còn bảo hành
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Màn hình: 6.2 inch Dynamic AMOLED 2X
                </Typography>
                <Typography variant='body1'>
                    Độ phân giải: 2400 x 1080 pixels
                </Typography>
                <Typography variant='body1'>
                    Vi xử lý: Exynos 2100 (5nm)
                </Typography>
                <Typography variant='body1'>
                    Dung lượng bộ nhớ: 128 GB
                </Typography>
                <Typography variant='body1'>
                    RAM: 8 GB
                </Typography>
                <Typography variant='body1'>
                    Camera sau: 12 MP (wide) + 64 MP (telephoto) + 12 MP (ultrawide)
                </Typography>
                <Typography variant='body1'>
                    Camera trước: 10 MP
                </Typography>
                <Typography variant='body1'>
                    Pin: 4000 mAh, hỗ trợ sạc nhanh
                </Typography>
            </>
        );
        break;

    case 1:
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Xe máy Honda SH 2020
                </Typography>
                <Typography variant='body1'>
                    Giá: 70.000.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Đã sử dụng
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: Hết bảo hành
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Kiểu dáng: Xe tay ga
                </Typography>
                <Typography variant='body1'>
                    Dung tích xy-lanh: 125cc
                </Typography>
                <Typography variant='body1'>
                    Công suất: 11.2 mã lực
                </Typography>
                <Typography variant='body1'>
                    Hệ thống phanh: Phanh ABS
                </Typography>
            </>
        );
        break;
    case 2: // Giả sử ID sản phẩm Dell XPS 13 là 2
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Máy tính xách tay Dell XPS 13
                </Typography>
                <Typography variant='body1'>
                    Giá: 25.000.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Mới 100%
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: 2 năm
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Màn hình: 13.3 inch FHD (1920 x 1080)
                </Typography>
                <Typography variant='body1'>
                    Vi xử lý: Intel Core i7-1165G7
                </Typography>
                <Typography variant='body1'>
                    RAM: 16 GB LPDDR4x
                </Typography>
                <Typography variant='body1'>
                    Dung lượng bộ nhớ: 512 GB SSD
                </Typography>
                <Typography variant='body1'>
                    Đồ họa: Intel Iris Xe Graphics
                </Typography>
                <Typography variant='body1'>
                    Pin: Lên đến 14 giờ sử dụng
                </Typography>
                <Typography variant='body1'>
                    Hệ điều hành: Windows 11 Home
                </Typography>
            </>
        );
        break;
    case 3: // Giả sử ID sản phẩm Tủ lạnh Samsung 450L là 3
            content = (
                <>
                    <Typography variant='body1' sx={{ marginTop: 2 }}>
                        Tên sản phẩm: Tủ lạnh Samsung 450L
                    </Typography>
                    <Typography variant='body1'>
                        Giá: 15.000.000 VNĐ
                    </Typography>
                    <Typography variant='body1'>
                        Tình trạng: Mới 100%
                    </Typography>
                    <Typography variant='body1'>
                        Bảo hành: 2 năm
                    </Typography>
                    <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                        Thông số kỹ thuật:
                    </Typography>
                    <Typography variant='body1'>
                        Dung tích: 450L
                    </Typography>
                    <Typography variant='body1'>
                        Kiểu tủ: Tủ lạnh ngăn đá trên
                    </Typography>
                    <Typography variant='body1'>
                        Công nghệ làm lạnh: Twin Cooling Plus
                    </Typography>
                    <Typography variant='body1'>
                        Tiết kiệm điện: Công nghệ Inverter
                    </Typography>
                    <Typography variant='body1'>
                        Chất liệu: Thép không gỉ
                    </Typography>
                    <Typography variant='body1'>
                        Kích thước: 700 x 700 x 1780 mm
                    </Typography>
                    <Typography variant='body1'>
                        Tính năng đặc biệt: Khóa an toàn trẻ em, đèn LED tiết kiệm điện
                    </Typography>
                </>
            );
        break;
    case 4: // Giả sử ID sản phẩm Máy ảnh Canon EOS M50 là 4
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Máy ảnh Canon EOS M50
                </Typography>
                <Typography variant='body1'>
                    Giá: 18.000.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Mới 100%
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: 1 năm
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Cảm biến: APS-C, 24.1 MP
                </Typography>
                <Typography variant='body1'>
                    ISO: 100 - 25600 (mở rộng tới 51200)
                </Typography>
                <Typography variant='body1'>
                    Tốc độ chụp: 10 khung hình/giây
                </Typography>
                <Typography variant='body1'>
                    Kính ngắm: OLED, 2.36 triệu điểm ảnh
                </Typography>
                <Typography variant='body1'>
                    Màn hình: 3.0 inch, cảm ứng, xoay lật
                </Typography>
                <Typography variant='body1'>
                    Video: 4K UHD 24p, Full HD 60p
                </Typography>
                <Typography variant='body1'>
                    Kết nối: Wi-Fi, Bluetooth
                </Typography>
                <Typography variant='body1'>
                    Pin: LP-E12, thời gian chụp khoảng 235 ảnh
                </Typography>
            </>
        );
        break;
        case 5: // Giả sử ID sản phẩm Tai nghe Sony WH-1000XM4 là 5
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Tai nghe Sony WH-1000XM4
                </Typography>
                <Typography variant='body1'>
                    Giá: 7.000.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Mới 100%
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: 1 năm
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Loại tai nghe: Over-ear, không dây
                </Typography>
                <Typography variant='body1'>
                    Công nghệ chống ồn: Adaptive Sound Control
                </Typography>
                <Typography variant='body1'>
                    Thời gian sử dụng pin: Lên đến 30 giờ
                </Typography>
                <Typography variant='body1'>
                    Thời gian sạc: 10 phút sạc cho 5 giờ sử dụng
                </Typography>
                <Typography variant='body1'>
                    Kết nối: Bluetooth 5.0, NFC
                </Typography>
                <Typography variant='body1'>
                    Chất liệu đệm: Da tổng hợp, tạo cảm giác thoải mái
                </Typography>
                <Typography variant='body1'>
                    Tính năng đặc biệt: Điều khiển cảm ứng, trợ lý ảo, chế độ nghe xung quanh
                </Typography>
            </>
        );
        break;
        case 6: // Giả sử ID sản phẩm Bàn phím cơ Logitech G Pro là 6
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Bàn phím cơ Logitech G Pro
                </Typography>
                <Typography variant='body1'>
                    Giá: 3.000.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Mới 100%
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: 2 năm
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Loại bàn phím: Cơ, không dây (có dây tùy chọn)
                </Typography>
                <Typography variant='body1'>
                    Switch: Logitech G Pro Mechanical Switches
                </Typography>
                <Typography variant='body1'>
                    Đèn nền: RGB tùy chỉnh với Logitech G HUB
                </Typography>
                <Typography variant='body1'>
                    Kết nối: USB, có thể tháo rời
                </Typography>
                <Typography variant='body1'>
                    Kích thước: 355 x 153 x 34 mm
                </Typography>
                <Typography variant='body1'>
                    Trọng lượng: 1.1 kg
                </Typography>
                <Typography variant='body1'>
                    Tính năng đặc biệt: Key rollover 26 phím, khả năng chống nước
                </Typography>
            </>
        );
        break;
        case 7: // Giả sử ID sản phẩm Ghế gaming Corsair là 7
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Ghế gaming Corsair
                </Typography>
                <Typography variant='body1'>
                    Giá: 4.500.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Mới 100%
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: 2 năm
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Kiểu ghế: Ghế gaming cao cấp
                </Typography>
                <Typography variant='body1'>
                    Chất liệu: Da PU, đệm mút cao cấp
                </Typography>
                <Typography variant='body1'>
                    Tính năng điều chỉnh: Chiều cao, góc ngả, tựa đầu và đệm lưng
                </Typography>
                <Typography variant='body1'>
                    Tải trọng tối đa: 120 kg
                </Typography>
                <Typography variant='body1'>
                    Kích thước: 450 x 450 x 1300 mm
                </Typography>
                <Typography variant='body1'>
                    Màu sắc: Đen/Đỏ (hoặc tùy chọn màu khác)
                </Typography>
                <Typography variant='body1'>
                    Tính năng đặc biệt: Thiết kế ergonomic, hỗ trợ tối ưu cho lưng và cổ
                </Typography>
            </>
        );
        break;
        case 8: // Giả sử ID sản phẩm Đồng hồ thông minh Apple Watch là 8
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Đồng hồ thông minh Apple Watch
                </Typography>
                <Typography variant='body1'>
                    Giá: 10.000.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Mới 100%
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: 1 năm
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Màn hình: Retina LTPO OLED, kích thước 1.78 inch
                </Typography>
                <Typography variant='body1'>
                    Độ phân giải: 448 x 368 pixels
                </Typography>
                <Typography variant='body1'>
                    Chip xử lý: S6 SiP với chip dual-core
                </Typography>
                <Typography variant='body1'>
                    Tính năng sức khỏe: Theo dõi nhịp tim, ECG, SpO2
                </Typography>
                <Typography variant='body1'>
                    Kết nối: Bluetooth 5.0, Wi-Fi, GPS
                </Typography>
                <Typography variant='body1'>
                    Thời lượng pin: Lên đến 18 giờ sử dụng
                </Typography>
                <Typography variant='body1'>
                    Chống nước: WR50 (khả năng chống nước lên đến 50 mét)
                </Typography>
                <Typography variant='body1'>
                    Tính năng đặc biệt: Nhận thông báo, điều khiển nhạc, theo dõi hoạt động thể chất
                </Typography>
            </>
        );
        break;
        case 9: // Giả sử ID sản phẩm Máy giặt LG 8kg là 9
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Máy giặt LG 8kg
                </Typography>
                <Typography variant='body1'>
                    Giá: 8.000.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Mới 100%
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: 2 năm
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Dung tích: 8kg
                </Typography>
                <Typography variant='body1'>
                    Kiểu máy: Cửa trước
                </Typography>
                <Typography variant='body1'>
                    Công nghệ giặt: Inverter, 6 Motion Direct Drive
                </Typography>
                <Typography variant='body1'>
                    Chương trình giặt: 14 chương trình giặt
                </Typography>
                <Typography variant='body1'>
                    Độ ồn: Nhỏ hơn 54 dB
                </Typography>
                <Typography variant='body1'>
                    Kích thước: 850 x 600 x 550 mm
                </Typography>
                <Typography variant='body1'>
                    Tính năng đặc biệt: Chế độ giặt nhanh, tự động cân trọng lượng
                </Typography>
            </>
        );
        break;
        case 10: // Giả sử ID sản phẩm Điện thoại iPhone 12 là 10
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Điện thoại iPhone 12
                </Typography>
                <Typography variant='body1'>
                    Giá: 15.000.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Mới 100%
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: 1 năm
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Màn hình: Super Retina XDR, 6.1 inch
                </Typography>
                <Typography variant='body1'>
                    Độ phân giải: 2532 x 1170 pixels
                </Typography>
                <Typography variant='body1'>
                    Chip xử lý: A14 Bionic
                </Typography>
                <Typography variant='body1'>
                    Camera sau: Đôi 12 MP (rộng và siêu rộng)
                </Typography>
                <Typography variant='body1'>
                    Camera trước: 12 MP
                </Typography>
                <Typography variant='body1'>
                    Dung lượng pin: 2815 mAh, hỗ trợ sạc nhanh
                </Typography>
                <Typography variant='body1'>
                    Bộ nhớ: 64GB, 128GB, 256GB
                </Typography>
                <Typography variant='body1'>
                    Kết nối: 5G, Wi-Fi 6, Bluetooth 5.0
                </Typography>
                <Typography variant='body1'>
                    Tính năng đặc biệt: Chống nước IP68, hỗ trợ MagSafe
                </Typography>
            </>
        );
        break;
        case 11: // Giả sử ID sản phẩm Laptop HP Pavilion - 256 GB SSD là 11
        content = (
            <>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                    Tên sản phẩm: Laptop HP Pavilion - 256 GB SSD
                </Typography>
                <Typography variant='body1'>
                    Giá: 22.000.000 VNĐ
                </Typography>
                <Typography variant='body1'>
                    Tình trạng: Mới 100%
                </Typography>
                <Typography variant='body1'>
                    Bảo hành: 1 năm
                </Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', marginTop: 2 }}>
                    Thông số kỹ thuật:
                </Typography>
                <Typography variant='body1'>
                    Màn hình: 15.6 inch, Full HD (1920 x 1080)
                </Typography>
                <Typography variant='body1'>
                    Bộ vi xử lý: Intel Core i5 (thế hệ mới)
                </Typography>
                <Typography variant='body1'>
                    RAM: 8 GB DDR4
                </Typography>
                <Typography variant='body1'>
                    Ổ cứng: 256 GB SSD
                </Typography>
                <Typography variant='body1'>
                    Card đồ họa: Intel Iris Xe Graphics
                </Typography>
                <Typography variant='body1'>
                    Hệ điều hành: Windows 10 Home
                </Typography>
                <Typography variant='body1'>
                    Kết nối: Wi-Fi 6, Bluetooth 5.0
                </Typography>
                <Typography variant='body1'>
                    Cổng kết nối: USB-C, USB 3.1, HDMI, đầu đọc thẻ SD
                </Typography>
            </>
        );
        break;
    default:
        content = null; // Khi không có trường hợp nào khớp
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
            <Paper sx={{ bgcolor: '#FFFFFF', width: '70%', borderRadius: '15px', mx: 'auto', mt: 2, padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                            <img src={product[ProductID].image} alt={product.name} style={{ width: '100%' }} />  
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" gutterBottom>
                            {product[ProductID].name} - {product[ProductID].storage}
                        </Typography>
                        <Typography variant="h6" color="red">
                            Giá: {product[ProductID].price}
                        </Typography>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <CheckCircleIcon color='white' sx={{ marginRight: 1 }} />
                        Tình trạng: {product[ProductID].condition}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <AccessTimeIcon color='white' sx={{ marginRight: 1 }} />
                        Bảo hành: {product[ProductID].warranty}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <ColorLensIcon color='white' sx={{ marginRight: 1 }} />
                        Màu sắc: {product[ProductID].color}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: 2 }}>
                        <LocationOnIcon color='white' sx={{ marginRight: 1}} />
                        Địa chỉ: {product[ProductID].location}
                    </Typography>
                    <Box sx={{ display: 'flex', marginTop: 4 }}>
                        <Button variant="contained" startIcon={<PhoneIcon />} sx={{ flex: 1, bgcolor: '#4CAF50', marginRight: 1 }}>
                            Gọi điện
                        </Button>
                        <Button variant="contained" startIcon={<MessageIcon />} sx={{ flex: 1, bgcolor: '#2196F3' }}>
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
                {content}
            </Paper> 
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