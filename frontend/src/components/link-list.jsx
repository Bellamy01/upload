import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import Link from "./link"
import { FEED_QUERY, NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../lib/mutations';
import { LINKS_PER_PAGE } from '../lib/constants';
import Pagination from './pagination';

export default function LinkList() {
    const location = useLocation();
    const isNewPage = location.pathname.includes('new');
    const pageIndexParams = location.pathname.split('/');
    const page = parseInt(
        pageIndexParams[pageIndexParams.length - 1]
    );

    const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

    const { loading, error, data, subscribeToMore } = useQuery(FEED_QUERY, {
        variables: getQueryVariables(isNewPage, page)
    });

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
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

    return (
        <>
            <div className='bg-orange-50 flex flex-col gap-2 py-2 min-h-[84vh]'>
                {getLinksToRender(isNewPage, data).map(
                    (link, index) => (
                        <Link key={link.id} link={link} index={index + pageIndex} />
                    ))}
            </div>
            <Pagination data={data} isNewPage={isNewPage} page={page} />
        </>
    )
}

const getQueryVariables = (isNewPage, page) => {
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const take = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = { createdAt: 'desc' };

    return { skip, take, orderBy };
}

const getLinksToRender = (isNewPage, data) => {
    if (isNewPage) {
        return data.feed.links;
    }

    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort(
        (l1, l2) => l2.votes.length - l1.votes.length
    );

    return rankedLinks;
}