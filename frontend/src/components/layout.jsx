import { Outlet } from 'react-router-dom'
import Header from './header'
import Footer from './footer'

export default function Layout() {
  return (
    <div className='relative min-h-screen flex flex-col px-6 py-2'>
      <div className='bg-orange-50'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}
