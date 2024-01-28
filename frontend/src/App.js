import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import store from './redux/store';

import AdminDashboard from './admin/AdminDashboard';

import ManagePosts from './admin/ManagePosts';
import CreatePost from './admin/CreatePost';
import EditPost from './admin/EditPost';

import ManageCategories from './admin/ManageCategories';
import CreateCategory from './admin/CreateCategory';
import EditCategory from './admin/EditCategory';

import ManageUsers from './admin/ManageUsers';
import CreateUser from './admin/CreateUser';
import EditUser from './admin/EditUser';

import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Layout from './admin/global/Layout';
import UserDashboard from './user/UserDashboard';
import SinglePost from './pages/SinglePost';


//HOC
// dashboard admin
const AdminDashboardHOC = Layout(AdminDashboard);

// manage posts
const ManagePostsHOC = Layout(ManagePosts);
const CreatePostHOC = Layout(CreatePost);
const EditPostHOC = Layout(EditPost);

// manage categories
const ManageCategoriesHOC = Layout(ManageCategories);
const CreateCategoryHOC = Layout(CreateCategory);
const EditCategoryHOC = Layout(EditCategory);

// manage categories
const ManageUsersHOC = Layout(ManageUsers);
const CreateUserHOC = Layout(CreateUser);
const EditUserHOC = Layout(EditUser);

const UserDashboardHOC = Layout(UserDashboard);

const App = () => {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/register' element={<Register />} />
              <Route path='/post/:id' element={<SinglePost />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
              
              {/* manage posts */}
              <Route path='/admin/posts' element={<AdminRoute><ManagePostsHOC /></AdminRoute>} />
              <Route path='/admin/post/create' element={<AdminRoute><CreatePostHOC /></AdminRoute>} />
              <Route path='/admin/post/edit/:id' element={<AdminRoute><EditPostHOC /></AdminRoute>} />

              {/* manage categories */}
              <Route path='/admin/categories' element={<AdminRoute><ManageCategoriesHOC /></AdminRoute>} />
              <Route path='/admin/category/create' element={<AdminRoute><CreateCategoryHOC /></AdminRoute>} />
              <Route path='/admin/category/edit/:id' element={<AdminRoute><EditCategoryHOC /></AdminRoute>} />

              {/* manage users */}
              <Route path='/admin/users' element={<AdminRoute><ManageUsersHOC /></AdminRoute>} />
              <Route path='/admin/user/create' element={<AdminRoute><CreateUserHOC /></AdminRoute>} />
              <Route path='/admin/user/edit/:id' element={<AdminRoute><EditUserHOC /></AdminRoute>} />

              <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC /></UserRoute>} />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>

      </Provider>
    </>
  )
}

export default App