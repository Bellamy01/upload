import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <Link to='/'  className='mb-5'>
                <p>My first Apollo app 🚀</p>
            </Link>
            <Outlet />
        </>
    )
}
