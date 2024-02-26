import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <div className="flex px-2 py-1 justify-between no-wrap bg-main/80 text-white">
                <div className="flex gap-1 text-sm items-center justify-center">
                    <div className='flex gap-2 items-center justify-center'>
                        <img src='/upload.svg' width={20} height={20} className='border' />
                        <Link to="/" className="no-underline font-black text-base tracking-wider">
                            <p>Hacker News</p>
                        </Link>
                    </div>
                    <Link to="/" className="no-underline">
                        new
                    </Link>
                    <p>|</p>
                    <Link
                        to="/create"
                        className="no-underline"
                    >
                        <p>submit</p>
                    </Link>
                </div>
                <div>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </>
    )
}
