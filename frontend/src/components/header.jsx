import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../lib/constants';
import { client } from '../lib/client';

export default function Header() {
    const navigate = useNavigate();
    const auth_token = localStorage.getItem(AUTH_TOKEN);
    console.log(`Token ${auth_token}`);
    return (
        <>
            <div className="flex px-2 py-1 justify-between no-wrap bg-main/80 text-white">
                <div className="flex gap-3 text-sm items-center justify-center">
                    <img src='/upload.svg' width={20} height={20} className='border' />
                    <div className='flex flex-col lg:flex-row justify-center items-start lg:items-center lg:gap-2'>
                        <div className='flex gap-1 items-center justify-center'>
                            <Link to="/" className="no-underline font-black text-base tracking-wider">
                                <p>Upload News</p>
                            </Link>
                        </div>
                        <div className='flex gap-1 text-sm items-center justify-center'>
                            <Link to="/" className="no-underline">
                                new
                            </Link>
                            <p>|</p>
                            <Link to="/top" className="no-underline">
                                top
                            </Link>
                            <p>|</p>
                            <Link to="/search" className="no-underline">
                                search
                            </Link>
                            <p>|</p>
                            <Link
                                to="/create"
                                className="no-underline"
                            >
                                <p>submit</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    {auth_token ? (
                        <button onClick={() => {
                            localStorage.removeItem(AUTH_TOKEN);
                            client.resetStore();
                            navigate('/');
                        }}>Logout</button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>
        </>
    )
}
