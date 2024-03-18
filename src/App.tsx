import { useState } from 'react'
import './App.css'
import Heading from './components/Heading'
import Section from './components/Section'
import Counter from './components/Counter'
import List from './components/List'

function App() {
  const [count, setCount] = useState<number>(1);

  return (
    <>
      <Heading title='Hello'/>
      <Section title='Different title'>This is my section.</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List items={["☕Coffee", "🌮Tacos", "👨‍💻Code"]} render={(item: string) => <span className='font-bold'>{item}</span>}></List>
    </>
  )
}

export default App
