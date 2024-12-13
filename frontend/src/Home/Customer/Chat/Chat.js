import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StompService from '../Service/StompService';
import UserService from '../Service/UserService';

const styles = {
  imgAvatar: {
    height: '50px',
    width: '50px',
  },
  mainFlexGrow: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  scrollarea: {
    overflowY: 'auto',
  },
  scrollareaHideScrollbar: {
    display: 'none',
  },
  fs7: {
    fontSize: '0.65rem',
  },
  opacityHover: {
    opacity: 0,
  },
  opacityHoverVisible: {
    opacity: 1,
  },
  mw75: {
    maxWidth: '75%',
  },
  wordBreak: {
    wordWrap: 'break-word',
  },
  wordBreakAll: {
    wordBreak: 'break-all',
  },
  circularLetter: {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgb(0, 140, 235)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '18px',
  },
  bgPrimary1: {
    backgroundColor: 'rgb(0, 140, 235)',
  },
};

function ChatComponent() {
  const navigate = useNavigate();
  const userService = new UserService();
  const stomp = new StompService();

  const [currentUser, setCurrentUser] = useState(userService.currentUser());
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
    return () => {
      stomp.unsubscribeAll();
    };
  }, []);

  const subscribeToCurrentUserConversation = () => {
    setTimeout(() => {
      stomp.subscribe(`user/${currentUser}`, (payload) => {
        const res = payload;
        if (res.type === 'ALL') {
          setUserConversations(res.data);
          if (!res.data.find((item) => item.conversationId === selectedConversationId)) {
            onCloseChat();
          }
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
    setSelectedConversationId(-1);
  };

  const onUserLogout = () => {
    localStorage.removeItem('CustomerUserID');
    localStorage.removeItem('CustomerName');
    navigate('/');
  };

  const onUserSelected = (receiverId, receiverName) => {
    setSelectedConversationReceiverId(receiverId);
    setSelectedConversationReceiverName(receiverName);
    userService
      .getConversationIdByUser1IdAndUser2Id(receiverId, currentUser)
      .then((res) => {
        setSelectedConversationId(res.data);
        onShowHideUserConversation();
        setConversation();
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className={`col-sm-5 col-md-4 col-lg-3 ${
            selectedConversationId === -1 ? 'd-block d-sm-block' : 'd-none d-sm-block'
          }`}
        >
          <div className="vh-100 d-flex flex-column">
            <div className="py-2">
              <h4>Hello, {currentUser}</h4>
              <div className="d-flex">
                <button onClick={onShowHideUserConversation} className="btn btn-sm btn-success">
                  {showUserState ? 'Show Conversations' : 'Show Available Users'}
                </button>
                <button onClick={onUserLogout} className="btn btn-sm btn-danger ms-2">
                  Logout
                </button>
              </div>
            </div>

            {showUserState ? (
              <>
                <h5 className="mt-2 m-0">Available Users</h5>
                <div style={styles.scrollarea}>
                  {users.map((u) => (
                    <div
                      key={u.userId}
                      onClick={() => onUserSelected(u.id, `${u.name}`)}
                      className="p-2 mt-2 cursor-pointer bg-secondary-subtle rounded"
                    >
                      <h5>{`${u.name}`}</h5>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h5 className="mt-2 m-0">Conversations</h5>
                <div style={styles.scrollarea}>
                  {userConversations.map((c, i) => (
                    <div
                      key={c.conversationId}
                      onClick={() => onConversationSelected(i)}
                      className="p-2 mt-2 d-flex align-items-center cursor-pointer rounded bg-secondary-subtle"
                    >
                      <div>
                        <span style={styles.circularLetter} className="me-2">{c.otherUserName.charAt(0)}</span>
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
        >
          {selectedConversationId === -1 ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="text-center">
                <i className="bi bi-chat-dots fs-1"></i>
                <h4>No conversation selected</h4>
                <p>Click on a conversation or find<br />new user to start chat</p>
              </div>
            </div>
          ) : (
            <div className="vh-100 d-flex flex-column">
              <div className="p-2 d-flex justify-content-between bg-body-secondary">
                <div className="d-flex align-items-center justify-content-center">
                  <button onClick={onCloseChat} className="btn py-0 me-1 d-sm-none">
                    <i className="bi bi-list fs-4"></i>
                  </button>
                  <h4 className="m-0">{selectedConversationReceiverName}</h4>
                </div>
                <button
                  className="btn btn-light"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteChatModal"
                >
                  <i className="bi bi-trash-fill text-danger"></i> Delete Chat
                </button>
              </div>

              <div style={{ ...styles.mainFlexGrow, ...styles.scrollarea }} className="p-2">
                {selectedConversation.map((m, index) => (
                  <div key={index} className="mt-2">
                    <div
                      className={`text-white rounded py-1 px-2 ${styles.mw75} ${
                        currentUser === m.senderId
                          ? 'float-end bg-primary-1 text-white'
                          : 'float-start bg-secondary-subtle text-dark'
                      }`}
                    >
                      <div style={styles.wordBreak} className={`fs-6 ${currentUser === m.senderId ? 'text-white' : 'text-dark'}`}>
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
                    <i className="bi bi-send text-white"></i>
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
    </div>
  );
}

export default ChatComponent;