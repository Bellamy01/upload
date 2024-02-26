import { useQuery, gql } from '@apollo/client'
import Link from "./link"

const FEED_QUERY = gql`
    {
        feed {
            id
            links {
                id
                createdAt
                url
                description
            }
        }
    }
`
    ;

export default function LinkList() {
    const { loading, error, data } = useQuery(FEED_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='bg-orange-50 flex flex-col gap-2 py-2 min-h-[84vh]'>
            {data.feed.links.map((link) => (
                <Link key={link.id} link={link} />
            ))}
        </div>
    )
}