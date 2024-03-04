import { Navigate, RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LinkList from './components/link-list'
import './styles/App.css'
import CreateLink from './components/create-link'
import Layout from './components/layout'
import Login from './components/login'
import Search from './components/search'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Navigate replace to="/new/1" />} />
      <Route path='/top' element={<LinkList />} />
      <Route path='/new/:page' element={<LinkList />} />
      <Route path='/create' element={<CreateLink />} />
      <Route path='/login' element={<Login />} />
      <Route path='/search' element={<Search />} />
    </Route>
  )
)

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
