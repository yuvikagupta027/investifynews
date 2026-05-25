import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import './App.css';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import AddCategory from './admin/AddCategory';
import AddArticle from './admin/AddArticle';
import AllArticles from './admin/AllArticles';
import EditArticle from './admin/EditArticle';
import BulkUploadArticles from './admin/BulkUploadArticles';
import Home from './user/Home';
import Categories from './user/Categories';
import Latest from './user/Latest';
import Trending from './user/Trending';
import FullStory from './user/FullStory';
import CategoryArticles from './user/CategoryArticles';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/admin/Login' element={<Login />} />
          <Route path='/admin/Dashboard' element={<Dashboard />} />
          <Route path='/admin/AddCategory' element={<AddCategory />} />
          <Route path='/admin/AddArticle' element={<AddArticle />} />
          <Route path='/admin/AllArticles' element={<AllArticles />} />
          <Route path="/admin/EditArticle/:id" element={<EditArticle />} />
          <Route path="/admin/BulkUploadArticles" element={<BulkUploadArticles />} />
          <Route path="/" element={<Home />} />
          <Route path="/user/Categories" element={<Categories />} />
          <Route path="/user/Latest" element={<Latest />} />
          <Route path="/user/Trending" element={<Trending />} />
          <Route path='/user/FullStory' element={<FullStory />} />
          <Route path='/user/CategoryArticles' element={<CategoryArticles />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;