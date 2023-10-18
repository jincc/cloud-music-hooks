import { NavLink, useNavigate } from 'react-router-dom'
import { NavbarStyled, tabSelectLineStyled } from './style'

const TabItem = ({ to, title }) => {
  return (
    <NavLink className='item' to={to} style={({isActive}) => {
      return {
        borderBottom: isActive ? '1px solid #fff' : 'none'
      }
    }}>
      <span>{title}</span>
    </NavLink>
  )
}

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleClickSearch = () => {
    navigate('/search');
  }
  return (
    <NavbarStyled>
      <div className='menu'>
        <span className='iconfont'>&#xe65c;</span>
        <span className='title'>WebApp</span>
        <span className='iconfont' onClick={handleClickSearch}>&#xe62b;</span>
      </div>
      <div className='tab'>
        <TabItem to='/recommend' title='推荐' />
        <TabItem to='/singers' title='歌手' />
        <TabItem to='/rank' title='排行榜' />
      </div>
    </NavbarStyled>
  )
}
export default Navbar
