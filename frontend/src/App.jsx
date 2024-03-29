import React from 'react'
import DateRange from './components/DateRange'
import EventFilter from './components/EventFilter'
import GoogleMap from './components/GoogleMap'
import { DateTimeProvider } from './components/DateTimeContext'

function App() {  
  return (
    <>
      <DateTimeProvider>
        <GoogleMap />
        <DateRange />
        <EventFilter />
      </DateTimeProvider>
    </>
  )
}

export default App