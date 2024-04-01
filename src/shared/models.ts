export interface PokemonProps {
    name: string,
    order: string,
    types: [{
        slot: string,
        type: {
            name: string
        }
    }],
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    }
    genus?: string
}