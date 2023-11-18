import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/home'
import ErrorPage from '../pages/error'
import Recommend from '../pages/recommend'
import Singers from '../pages/singers'
import Rank from '../pages/rank'
import SearchPage from '../pages/search'
import PlaylistPage from '../pages/playlist'
import SingerDetailPage from '../pages/singers/detail'
import AlbumPage from '../pages/album'
export default createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
    element: <SearchPage />
  },
  {
    path: '/playlist/:id',
    element: <PlaylistPage />
  },
  {
    path: '/album/:id',
    element: <AlbumPage />
  },
  {
    path: '/singer/:id',
    element: <SingerDetailPage />
  }
])
