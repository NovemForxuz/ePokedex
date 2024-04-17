import Header from "../components/Header"

interface CustomPokemonListProp {
    mode: string
}

const CustomPokemonList = ({ mode }: CustomPokemonListProp) => {
  return (
    <>
        <div className="flex flex-col container w-screen h-dvh">
            <Header title='PokeDex' />
            {mode === 'favourites' ? 
            <>
                <h1>Favourites</h1>
            </> 
            : 
            <>
                <h1>Captured</h1>
            </>
            }
        </div>
    </>
  )
}

export default CustomPokemonList