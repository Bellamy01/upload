import { useQuery } from '@apollo/client'
import Link from "./link"
import { FEED_QUERY } from '../lib/mutations';


export default function LinkList() {
    const { loading, error, data } = useQuery(FEED_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='bg-orange-50 flex flex-col gap-2 py-2 min-h-[84vh]'>
            {data.feed.links.map((link, index) => (
                <Link key={link.id} link={link} index={index} />
            ))}
        </div>
    )
}