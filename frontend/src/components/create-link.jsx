import { useState } from "react";
import { useMutation, gql } from '@apollo/client';

const CREATE_LINK_MUTATION = gql`
    mutation PostMutation(
        $description: String!
        $url: String!
    ) {
        post (description: $description, url: $url) {
            id
            createdAt
            url
            description
        } 
    }
`

export default function CreateLink() {
    const [formState, setFormState] = useState({
        description: '',
        url: ''
    });

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description: formState.description,
            url: formState.url,
        }
    });

    return (
        <div className="flex flex-col gap-4 items-center justify-left px-6">
            <h3 className="uppercase">Create a Link</h3>
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                        value={formState.description}
                        placeholder=""
                        onChange={(e) => setFormState({
                            ...formState,
                            description: e.target.value
                        })} />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        name="url"
                        id="url"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">URL</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 uppercase focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    )
}
