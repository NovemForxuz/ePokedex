import Header from "../components/Header"

interface UserPokemonListProp {
    mode: string
}

const UserPokemonList = ({ mode }: UserPokemonListProp) => {
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

export default UserPokemonList