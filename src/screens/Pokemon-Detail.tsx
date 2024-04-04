import { useParams } from 'react-router-dom'

const PokemonDetail = () => {
    let { id } = useParams();

    return (
        <h1>PokemonDetail {id}</h1>
    )
}

export default PokemonDetail;