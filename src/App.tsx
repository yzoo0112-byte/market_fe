
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TableView from './components/TableView'
import { SearchProvider } from './contexts/SearchProvider'
import Test from './contexts/Test'

function App() {

  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TableView />} />
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App
