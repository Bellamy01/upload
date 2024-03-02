import { useState } from "react"
import { useLazyQuery } from '@apollo/client'
import { CiSearch } from 'react-icons/ci'
import { FEED_SEARCH_QUERY } from "../lib/mutations";
import Link from "./link";

export default function Search() {
    const [searchFilter, setSearchFilter] = useState('');
    const [executeSearch, { data }] = useLazyQuery(
        FEED_SEARCH_QUERY
    );

    return (
        <>
            <div className="flex items-center justify-center gap-2 py-4">
                <p>Search</p>
                <input type="text" className="border" width={60} onChange={(e) => setSearchFilter(e.target.value)} />
                <button className="bg-main p-1" onClick={() => {
                    executeSearch({
                        variables: { filter: searchFilter }
                    })
                }}>
                    <CiSearch color="white" size={18} />
                </button>
            </div>
            <div className="py-4">
                {data &&
                    data.feed.links.map((link, index) => (
                        <Link key={link.id} link={link} index={index} />
                    ))}
            </div>
        </>
    )
}
