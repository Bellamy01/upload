/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { LINKS_PER_PAGE } from '../lib/constants';

export default function Pagination({ isNewPage, page, data }) {
    const navigate = useNavigate();
    return (
        <>
            {isNewPage && (
                <div className="flex ml-4 my-3 gap-10">
                    <div className="cursor-pointer mr-2" onClick={() => {
                        if (page > 1) {
                            navigate(`/new/${page - 1}`)
                        }
                    }}>Prev</div>
                    <div className="cursor-pointer" onClick={() => {
                        if (page <= data.feed.count / LINKS_PER_PAGE) {
                            const nextPage = page + 1;
                            navigate(`/new/${nextPage}`);
                        }
                    }}>Next</div>
                </div>
            )}
        </>
    )
}
