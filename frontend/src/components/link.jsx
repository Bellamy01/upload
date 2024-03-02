/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client'
import { AUTH_TOKEN } from '../lib/constants';
import { timeDifferenceForDate } from '../lib/utils';
import { FEED_QUERY, VOTE_MUTATION } from '../lib/mutations';

export default function Link(props) {
    const { link } = props;
    const auth_token = localStorage.getItem(AUTH_TOKEN);

    const [vote] = useMutation(VOTE_MUTATION, {
        variables: {
            linkId: link.id
        },
        update: (cache, { data: { vote } }) => {
            const { feed } = cache.readQuery({
                query: FEED_QUERY
            });

            const updateLinks = feed.links.map((feedLink) => {
                if (feedLink.id === link.id) {
                    return {
                        ...feedLink,
                        votes: [...feedLink.votes, vote]
                    };
                }
                return feedLink;
            });

            cache.writeQuery({
                query: FEED_QUERY,
                data: {
                    feed: {
                        links: updateLinks
                    }
                }
            })
        }
    })

    return (
        <div className="flex gap-1 px-2 items-start justify-start">
            <div className="flex items-center text-base text-gray-500">
                <p>{props.index + 1}.</p>
                {auth_token && (
                    <div className="cursor-pointer text-xs" onClick={vote}>▲</div>
                )}
            </div>
            <div className='flex items-start flex-col'>
                <div className='flex items-center gap-1 justify-center'>
                    <p className="text-base">{link.description}</p>
                    <p className="text-xs text-gray-500">({link.url})</p>
                </div>
                {(
                    <div className='flex items-start gap-1 text-xs text-gray-500'>
                        <p>{link.votes.length} votes | by</p>{' '}
                        <p className='underline'>{link.postedBy ? link.postedBy.name : 'Unknown'}</p>{' '}
                        <p>{timeDifferenceForDate(link.createdAt)}</p>
                    </div>
                )}
            </div>
        </div>
    )
}