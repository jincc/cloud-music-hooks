import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home'
import ErrorPage from '../pages/error'
import Recommend from '../pages/recommend'
import Singers from '../pages/singers'
import Rank from '../pages/rank'
import Search from '../pages/search'
import Album from '../pages/album'
export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Recommend /> },
      { path: 'recommend', element: <Recommend /> },
      { path: 'singers', element: <Singers /> },
      { path: 'rank', element: <Rank /> }
    ]
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/album/:id',
    element: <Album />
  }
])
