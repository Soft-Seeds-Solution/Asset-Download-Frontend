import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryProvider from './ContextApi/CategoryProvider';
import SubCategoryProvider from './ContextApi/SubCategoryProvider';
import SignUp from './Pages/AuthPage/SignUp';
import UserProvider from './ContextApi/UserProvider';
import Login from './Pages/AuthPage/Login';
import AdminPanel from './Adminside/AdminPanel';
import UploadProduct from './Adminside/Products/UploadProduct';
import ProductProvider from './ContextApi/ProductProvider';
import ManageCategory from './Adminside/Category/ManageCategory';
import ManageSubCategory from './Adminside/SubCategory/ManageSubCategory';
import HomePage from './Pages/Home/HomePage';
import ProductDetailPage from './Pages/ProductDetail/ProductDetailPage';
import AdBlockCheck from './Pages/AdBlock/AdBlockCheckPage';
import ManageProducts from './Adminside/Products/ManageProducts';
import MembershipPlans from './UserSide/MemberShip';
import MembershipProvider from './ContextApi/MembershipProvider';
import MainNavbar from './Components/Navbar';
import CategorySpecificProducts from './Pages/Category/CategorySpecificProducts';
import SubCategorySpecificProducts from './Pages/Category/SubCategorySpecificProducts';
import Footer from './Components/Footer';
import AllProducts from './Pages/ProductDetail/AllProducts';
import MoveToTop from './MoveToTop';
import UserPanel from './UserSide/UserPanel';
import ActiveMembershipPlan from './UserSide/ActiveMembershipPlan';
import StripePayment from './UserSide/Payment';

import ProtectedRoute from './Components/ProtectedRoute';
import AdminRoute from './Components/AdminRoute';
import AboutPage from './Pages/About/AboutPage';
import ContactUsPage from './Pages/Contact/ContactUsPage';
import PortfolioProducts from './Pages/ProductDetail/PortfolioProducts';

function App() {
  return (
    <Router>
      <UserProvider>
        <CategoryProvider>
          <SubCategoryProvider>
            <ProductProvider>
              <MembershipProvider>
                <MoveToTop />
                <MainNavbar />
                <AllRoutes />
                <Footer />
              </MembershipProvider>
            </ProductProvider>
          </SubCategoryProvider>
        </CategoryProvider>
      </UserProvider>
    </Router>
  );
}

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactUsPage />} />
      <Route path="/detail-page/:title" element={<ProductDetailPage />} />
      <Route path="/check-adblock" element={<AdBlockCheck />} />
      <Route path="/:category" element={<CategorySpecificProducts />} />
      <Route path="/:category/:subCategory" element={<SubCategorySpecificProducts />} />
      <Route path="/all/:productListing" element={<AllProducts />} />
      <Route path="/portfolio/:portfolio" element={<PortfolioProducts />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/adminPanel"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      >
        <Route path="upload-product" element={<UploadProduct />} />
        <Route path="manage-products" element={<ManageProducts />} />
        <Route path="manage-category" element={<ManageCategory />} />
        <Route path="manage-sub-category" element={<ManageSubCategory />} />
      </Route>

      {/* Protected User Routes */}
      <Route
        path="/userPanel"
        element={
          <ProtectedRoute>
            <UserPanel />
          </ProtectedRoute>
        }
      >
        <Route path="membership-plans" element={<MembershipPlans />} />
        <Route path="active-membership-plan" element={<ActiveMembershipPlan />} />
        <Route path="payment" element={<StripePayment />} />
      </Route>
    </Routes>
  );
}

export default App;
