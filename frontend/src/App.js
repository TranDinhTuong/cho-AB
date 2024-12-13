
import './App.css';

import { BrowserRouter, Routes, Route } from  'react-router-dom'
import Home from './Home/home';
import Initial from  './Home/initial';
import ChiTiet from './Home/chi_tiet';
import Search from './Home/search';
import Search2 from './Home/search_category';


import Admin from './Home/Admin/admin';
import QuanLiTinAdmin from './Home/Admin/quan_li_tin';
import ChiTiet2 from './Home/Admin/chi_tiet';
import QuanLiUser from './Home/Admin/quan_li_nguoi_dung';
import SearchAd from './Home/Admin/search';
import SearchAd2 from './Home/Admin/search_category';


import Customer from './Home/Customer/customer';
import QuanLiTin from './Home/Customer/quan_li_tin';
import Member from './Home/Customer/member';
import ChiTiet1 from './Home/Customer/chi_tiet';
import Post from './Home/Customer/post';
import Post_XeCo from './Home/Customer/post_xeco';
import Post_ViecLam from './Home/Customer/post_vieclam';
import Post_DoDienTu from './Home/Customer/post_dodientu';
import Post_ThoiTrang from './Home/Customer/post_thoitrang';
import Post_PhongTro from './Home/Customer/post_phongtro';
import Post_DoGiaDung from './Home/Customer/post_dogiadung';
import Post_Sach from './Home/Customer/post_sach';
import Post_ThuCung from './Home/Customer/post_thucung';
import ChatComponent from './Home/Customer/Chat/ChatComponent';
import SearchCus from './Home/Customer/search';
import SearchCus2 from './Home/Customer/search_category';
function App() {
  return (
    <BrowserRouter>
      < Routes>
        <Route path='/home' exact element={<Home />} />
        <Route path='/chi_tiet/:id' exact element={<ChiTiet />} />
        <Route path='/search' exact element={<Search />} />
        <Route path='/search_category' exact element={<Search2 />} />

        <Route path='/home/admin' exact element={<Admin />} />
        <Route path='/home/admin/chi_tiet/:id' exact element={<ChiTiet2 />} />
        <Route path='/home/admin/quan_li_tin' exact element={<QuanLiTinAdmin />} />
        <Route path='/home/admin/quan_li_nguoi_dung' exact element={<QuanLiUser />} />
        <Route path='/home/admin/search' exact element={<SearchAd />} />
        <Route path='/home/admin/search_category' exact element={<SearchAd2 />} />



        <Route path='/home/customer' exact element={<Customer />} />
        <Route path='/home/customer/search' exact element={<SearchCus />} />
        <Route path='/home/customer/search_category' exact element={<SearchCus2 />} />
        <Route path='/home/customer/member' exact element={<Member />} />
        <Route path='/home/customer/chat' exact element={<ChatComponent />} />
        <Route path='/home/customer/quan_li_tin' exact element={<QuanLiTin />} />
        <Route path='/home/customer/chi_tiet/:id' exact element={<ChiTiet1 />} />
        <Route path='/home/customer/post' exact element={<Post />} />
        <Route path='/home/customer/post_xeco' exact element={<Post_XeCo />} />
        <Route path='/home/customer/post_vieclam' exact element={<Post_ViecLam />} />
        <Route path='/home/customer/post_dodientu' exact element={<Post_DoDienTu />} />
        <Route path='/home/customer/post_thoitrang' exact element={<Post_ThoiTrang />} />
        <Route path='/home/customer/post_phongtro' exact element={<Post_PhongTro />} />
        <Route path='/home/customer/post_dogiadung' exact element={<Post_DoGiaDung />} />
        <Route path='/home/customer/post_sach' exact element={<Post_Sach />} />
        <Route path='/home/customer/post_thucung' exact element={<Post_ThuCung />} />
        <Route path='/initial' exact element={<Initial />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
