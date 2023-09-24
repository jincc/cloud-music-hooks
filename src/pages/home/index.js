import { Navigate, Outlet, useMatch } from "react-router-dom";
import Navbar from "../../components/navbar";

const Home = () => {
  // 首页直接重定向到推荐页
  const match = useMatch('/')
  if (match) {
    return <Navigate to='recommend' />
  }
  return <div>
    <Navbar />
    <Outlet />
  </div>
};

export default Home;