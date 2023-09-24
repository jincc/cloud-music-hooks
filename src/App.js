import { RouterProvider } from 'react-router-dom'
import { IconStyle } from './assets/iconfont/iconfont'
import { GlobalStyle } from './styles/global'
import routes from './routes'
import { Provider } from 'react-redux'
import store from './store'

function App () {
  return (
    <>
      <GlobalStyle />
      <IconStyle />
      <Provider store={store}>
      <RouterProvider router={routes}></RouterProvider>
      </Provider>
    </>
  )
}

export default App
