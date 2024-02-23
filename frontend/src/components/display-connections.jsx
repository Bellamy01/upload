import { useQuery, gql } from '@apollo/client'

const GET_LOCATIONS = gql`
    query GetLocations {
        locations {
            id
            name
            description
            photo
        }
    }
`;

export default function DisplayConnections() {
    const { loading, error, data } = useQuery(GET_LOCATIONS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(data);

    return data.locations.map(({ id, name, description, photo }) => (
        <div key={id} className='text-black flex flex-col items-start justify-center gap-2 px-10'>
            <h3 className='font-bold text-xl'>{name}</h3>
            <img src={`${photo}`} width='400' height='250' alt='location-interference' />
            <br />
            <b>About this location:</b>
            <p>{description}</p>
            <br />
        </div>
    ));
}