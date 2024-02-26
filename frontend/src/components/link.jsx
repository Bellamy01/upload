/* eslint-disable react/prop-types */

export default function Link(props) {
    const { link } = props;
    return (
        <div className="flex gap-1 px-2 items-center justify-start">
            <p className="text-base">{link.description}</p>
            <p className="text-sm text-gray-500">({link.url})</p>
        </div>
    )
}