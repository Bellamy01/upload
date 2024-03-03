import { useQuery } from '@apollo/client'
import Link from "./link"
import { FEED_QUERY, NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../lib/mutations';

export default function LinkList() {
    const { loading, error, data, subscribeToMore } = useQuery(FEED_QUERY);

    subscribeToMore({
        document: NEW_LINKS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newLink = subscriptionData.data.newLink;
            const exists = prev.feed.links.find(
                ({ id }) => id === newLink.id
            );
            if (exists) return prev;

            return Object.assign({}, prev, {
                feed: {
                    links: [newLink, ...prev.feed.links],
                    count: prev.feed.links.length + 1,
                    __typename: prev.feed.__typename
                }
            });
        }
    });

    subscribeToMore({
        document: NEW_VOTES_SUBSCRIPTION
    });

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