import { useCounterStore } from './state'

const Statistics = () => {
  const good = useCounterStore(state => state.counters.good)
  const neutral = useCounterStore(state => state.counters.neutral)
  const bad = useCounterStore(state => state.counters.bad)
  const all = useCounterStore(state => state.counters.all)
  const average = useCounterStore(state => state.counters.average)
  const positive = useCounterStore(state => state.counters.positive)
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive} %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
