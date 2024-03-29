import { ReactNode } from 'react'

type CounterProps = {
    setCount: React.Dispatch<React.SetStateAction<number>>,
    children: ReactNode
}

const Counter = ({ children, setCount }: CounterProps) => {

  return (
    <>
        <h1>{children}</h1>
        <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)}>+</button>
        <button onClick={() => setCount(prev => prev - 1)}>-</button>
    </>
  )
}

export default Counter