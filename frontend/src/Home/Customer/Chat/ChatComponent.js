import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../Chat/chat.css'; 
import StompService from '../Service/StompService'; // Adjust the import path if necessary
import UserService from '../Service/UserService'; // Adjust the import path if necessary
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import { styled} from '@mui/material';
import axios from 'axios'; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message'; // Biểu tượng tin nhắn
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {  Grid, Card,CardContent, CardMedia } from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';
import {  Popover, List, ListItem, ListItemText } from '@mui/material';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
function ChatComponent () {
  const navigate = useNavigate();
  const userService = new UserService();
  const stomp = new StompService();
  const CustomerUserID = localStorage.getItem('CustomerUserID');
  const [currentUser, setCurrentUser] = useState(userService.currentUser()); //id current user
  const [users, setUsers] = useState([]);
  const [userConversations, setUserConversations] = useState([]);

  const [selectedConversationId, setSelectedConversationId] = useState(-1);
  const [selectedConversationReceiverId, setSelectedConversationReceiverId] = useState(-1);
  const [selectedConversationReceiverName, setSelectedConversationReceiverName] = useState('');
  const [selectedConversation, setSelectedConversation] = useState([]);

  const [showUserState, setShowUserState] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    subscribeToCurrentUserConversation();
    // info();
    // return () => {
    //   stomp.unsubscribeAll();
    // };
  }, []);
  const info = async() => {
    try {
      const response = await axios.get(`http://localhost:9193/api/v1/users/${CustomerUserID}/user`);
      if (response.data.message === "Success") {
          // alert('két nôi thanh công');
          setCurrentUser(response.data.data.name);
      }
  } catch (error) {   
      console.error("Error fetching notifications:", error);
      // alert('fail rôi');
  }
  };
  const subscribeToCurrentUserConversation = () => {
    setTimeout(() => {
      stomp.subscribe(`user/${currentUser}`, (payload) => {
        const res = payload;
        if (res.type === 'ALL') {
          setUserConversations(res.data);
          // if (!res.data.find((item) => item.conversationId === selectedConversationId)) {
          //   onCloseChat();
          // }
        }
      });
      stomp.send('user', currentUser);
    }, 1000);
  };

  const onShowHideUserConversation = () => {
    setShowUserState(!showUserState);
    if (!showUserState) {
      userService.getAllUsersExceptCurrentUser().then((res) => {
        setUsers(res.data);
      });
    }
  };

  const onCloseChat = () => {
    //setSelectedConversationId(-1);
  };


  const onUserSelected = (receiverId, receiverName) => {
    setSelectedConversationReceiverId(receiverId);
    setSelectedConversationReceiverName(receiverName);
    userService
      .getConversationIdByUser1IdAndUser2Id(receiverId, currentUser)
      .then((res) => {
        setSelectedConversationId(res.data);
        onShowHideUserConversation();
        // setConversation();
      });
  };

  const onConversationSelected = (index) => {
    const conversation = userConversations[index];
    setSelectedConversationId(conversation.conversationId);
    setSelectedConversationReceiverId(conversation.otherUserId);
    setSelectedConversationReceiverName(conversation.otherUserName);
    setConversation();
  };

  const setConversation = () => {
    
    stomp.subscribe(`conv/${selectedConversationId}`, (payload) => {
      const res = payload;
      if (res.type === 'ALL') {
        setSelectedConversation(res.data);
      } else if (res.type === 'ADDED') {
        setSelectedConversation((prev) => [res.data, ...prev]);
      }
    });
    stomp.send('conv', selectedConversationId);
  };

  const onSendMessage = () => {
    if (message.trim().length === 0) return;
    
    const timestamp = new Date();
    const body = {
      conversationId: selectedConversationId,
      senderId: currentUser,
      receiverId: selectedConversationReceiverId,
      message: message.trim(),
      timestamp,
    };
    stomp.send('sendMessage', body);
    setMessage('');
  };

  const onDeleteConversation = () => {
    stomp.send('deleteConversation', {
      conversationId: selectedConversationId,
      user1Id: currentUser,
      user2Id: selectedConversationReceiverId,
    });
  };

  const onDeleteMessage = (messageId) => {
    stomp.send('deleteMessage', {
      conversationId: selectedConversationId,
      messageId,
    });
  };
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
const handleLogOut = (e) =>{
  localStorage.removeItem('CustomerUserID');
  localStorage.removeItem('CustomerName');
  navigate('/home');
}
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

            <Box sx={{ width: '70%', height: '600px', mx: 'auto', mt: 4, padding: 2, bgcolor: '#fff', borderRadius: '8px', boxShadow: 2 }}>
            <div className="row">
            <div
          className={`col-sm-5 col-md-4 col-lg-3 ${
            selectedConversationId === -1 ? 'd-block d-sm-block' : 'd-none d-sm-block'
          }`}
        >
          <div className="vh-100 d-flex flex-column">
            {/* <div className="py-2">
              <h4>Hello, {currentUser}</h4>
            </div> */}

            {showUserState ? (
              <>
                <h5 className="mt-2 m-0">Available Users</h5>
                <div className="scrollarea" style={{ flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(80vh - 100px)' }}>
                  {/* Giới hạn chiều cao cho danh sách người dùng */}
                  {users.map((u) => (
                    <div
                      key={u.userId}
                      // onClick={() => onUserSelected(u.id, `${u.name}`)}
                      className="p-2 mt-2 cursor-pointer bg-secondary-subtle rounded"
                    >
                      <h5>{`${u.name}`}</h5>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h5 className="mt-2 m-0">Các cuộc trò chuyện</h5>
                <div className="scrollarea" style={{ flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(80vh - 100px)' }}>
                  {/* Giới hạn chiều cao cho danh sách cuộc trò chuyện */}
                  {userConversations.map((c, i) => (
                    <div
                      key={c.conversationId}
                      onClick={() => onConversationSelected(i)}
                      className="p-2 mt-2 d-flex align-items-center cursor-pointer rounded bg-secondary-subtle"
                    >
                      <div>
                        <span className="circular-letter me-2">{c.otherUserName.charAt(0)}</span>
                      </div>
                      <div className="w-100">
                        <h6 className="m-0">{c.otherUserName}</h6>
                        <small className="m-0">{c.lastMessage}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className={`col-sm-7 col-md-8 col-lg-9 bg-body-tertiary p-0 border-start border-secondary-subtle ${
            selectedConversationId === -1 ? 'd-none d-sm-block' : 'd-block d-sm-block'
          }`}
          style={{ maxHeight: '78vh', overflowY: 'hidden',borderRadius: '15px' }} // Thêm overflowY
        >
          {selectedConversationId === -1 ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
              <div className="text-center">
                <i className="bi bi-chat-dots fs-1"></i>
                <h4>No conversation selected</h4>
                <p>Click on a conversation or find<br />new user to start chat</p>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column" style={{ height: '100%', overflowY: 'auto' , borderRadius: '15px'}}>
              <div className="p-2 d-flex justify-content-between bg-body-secondary">
                <div className="d-flex align-items-center">
                  <button onClick={onCloseChat} className="btn py-0 me-1 d-sm-none">
                    <i className="bi bi-list fs-4"></i>
                  </button>
                  <h4 className="m-0">{selectedConversationReceiverName}</h4>
                </div>
                <button
                  className="btn btn-light"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteChatModal"
                  style={{ backgroundColor: '#e57373' }}
                >
                  <i className="bi bi-trash-fill text-danger"></i><DeleteIcon  />
                </button>
              </div>

              <div className="main-flex-grow scrollarea p-2" style={{ flexGrow: 1, overflowY: 'auto' }}>
                {selectedConversation.map((m, index) => (
                  <div key={index} className="mt-2">
                    <div
                      className={`text-white rounded py-1 px-2 mw-75 ${
                        currentUser === m.senderId
                          ? 'float-end bg-primary-1 text-white'
                          : 'float-start bg-secondary-subtle text-dark'
                      }`}
                    >
                      <div className={`fs-6 word-break ${currentUser === m.senderId ? 'text-white' : 'text-dark'}`}>
                        {m.message}
                      </div>
                      <div
                        className={`fs-7 ${
                          currentUser === m.senderId
                            ? 'float-end text-white-50'
                            : 'float-start text-black-50'
                        }`}
                      >
                        {m.timestamp}
                      </div>
                    </div>
                    {currentUser === m.senderId && (
                      <i
                        onClick={() => onDeleteMessage(m.messageId)}
                        className="bi bi-trash text-danger p-2 cursor-pointer float-end opacity-hover"
                      ></i>
                    )}
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSendMessage();
                }}
              >
                <div className="d-flex px-4 py-2 bg-body-secondary">
                  <input
                    className="form-control"
                    type="text"
                    name="message"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="submit" className="btn bg-primary-1 ms-2">
                    <i className="material-icons text-white"><SendIcon/></i> 
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="modal fade" id="deleteChatModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete conversation
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure about to delete this conversation?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                onClick={onDeleteConversation}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      </Box>
    </div>
  );
};

export default ChatComponent;
