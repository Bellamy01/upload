import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LinkList from './components/link-list'
import './styles/App.css'
import CreateLink from './components/create-link'
import Header from './components/header'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Header />}>
      <Route index element={<LinkList />} />
      <Route path='/create' element={<CreateLink />} />
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
