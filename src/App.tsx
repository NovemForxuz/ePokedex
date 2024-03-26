import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Section from './components/Section'
import Counter from './components/Counter'
import List from './components/List'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState<number>(1);

  return (
    <>
    <div className="container w-screen h-screen overflow-scroll">
      <Header title='PokeDex'/>
      <div className="p-2">
        <Card />
      </div>
      {/* <Section title='Different title'>This is my section.</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List items={["☕Coffee", "🌮Tacos", "👨‍💻Code"]} render={(item: string) => <span className='font-bold'>{item}</span>}></List> */}
    </div>
    </>
  )
}

export default App
