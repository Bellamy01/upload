/* eslint-disable react/prop-types */

export default function Link(props) {
    const { link } = props;
    return (
        <div>
            <div>
                <p>{link.description}</p>
                <p>{link.url}</p>
            </div>
        </div>
    )
}