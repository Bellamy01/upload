import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { CREATE_LINK_MUTATION, FEED_QUERY } from "../lib/mutations";
import { LINKS_PER_PAGE } from "../lib/constants";

export default function CreateLink() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        description: '',
        url: ''
    });
    const take = LINKS_PER_PAGE;
    const skip = 0;
    const orderBy = { createdAt: 'desc' };

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description: formState.description,
            url: formState.url,
        },
        update: (cache, { data: { post } }) => {
            const data = cache.readQuery({
                query: FEED_QUERY,
                variables: {
                    take,
                    skip,
                    orderBy
                }
            });

            cache.writeQuery({
                query: FEED_QUERY,
                data: {
                    feed: {
                        links: [post, ...data.feed.links]
                    }
                },
                variables: {
                    take,
                    skip,
                    orderBy
                }
            });
        },
        onCompleted: () => navigate('/')
    });

    return (
        <div className="flex flex-col gap-4 items-center justify-left px-6 bg-orange-50 py-24">
            <h3 className="uppercase font-semibold text-2xl text-orange-400">Create a Link</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    createLink()
                }}
                className="w-1/2"
                autoComplete="off"
            >
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="description"
                        id="description"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                        required
                        value={formState.description}
                        placeholder=""
                        onChange={(e) => setFormState({
                            ...formState,
                            description: e.target.value
                        })} />
                    <label
                        htmlFor="description"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        name="url"
                        id="url"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                        placeholder=""
                        required
                        value={formState.url}
                        type="text"
                        onChange={(e) => setFormState({
                            ...formState,
                            url: e.target.value
                        })}
                    />
                    <label
                        htmlFor="url"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">URL</label>
                </div>
                <button type="submit" className="text-white bg-main hover:bg-main/60 focus:ring-1 uppercase focus:outline-none focus:ring-main/20 text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    )
}
