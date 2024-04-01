export interface PokemonProps {
    id: number,
    name: string,
    order: number,
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