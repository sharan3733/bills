import { useState, useEffect } from 'react'
import AddBill from './components/AddBill'
import AddCategory from './components/AddCategory'
import BillsTable from './components/BillsTable'
import NavBar from './components/NavBar'

function App() {
  const [shouldShowAddCategory, setShouldShowAddCategory] = useState(false)
  const [shouldShowAddBill, setShouldShowAddBill] = useState(false)
  const [categories, setCategories] = useState([])
  const [bills, setBills] = useState([])

  useEffect(() => {
    const categoriesInLocalStorage = JSON.parse(
        localStorage.getItem('categories')
    )

    const billsInLocalStorage = JSON.parse(localStorage.getItem('bills'))

    setCategories(categoriesInLocalStorage)
    setBills(billsInLocalStorage)

    if (!categoriesInLocalStorage) {
      setShouldShowAddCategory(true)
    }
    if (!billsInLocalStorage) {
      setShouldShowAddBill(true)
    }
  }, [])

  const showAddCategory = () => {
    setShouldShowAddCategory(true)
  }
  const showAddBill = () => {
    setShouldShowAddBill(true)
  }

  const addCategory = (category) => {
    const updatedCategories = [...(categories || []), category]
    setCategories(updatedCategories)
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
    setShouldShowAddCategory(false)
  }

  const addBill = (amount, category, date) => {
    const bill = { amount, category, date }
    const updatedBills = [...(bills || []), bill]
    setBills(updatedBills)
    setShouldShowAddBill(false)
    localStorage.setItem('bills', JSON.stringify(updatedBills))
  }
  const removeBill = index => {
    let updatedBills = [...bills]
    updatedBills = updatedBills
        .slice(0, index)
        .concat(updatedBills.slice(index + 1, updatedBills.length))
    setBills(updatedBills)
    localStorage.setItem('bills', JSON.stringify(updatedBills))
  }

  return (
      <div className='App'>
        {shouldShowAddCategory ? (
            <AddCategory onSubmit={addCategory} />
        ) : shouldShowAddBill ? (
            <AddBill onSubmit={addBill} categories={categories} />
        ) : (
            <div>
              <NavBar categories={categories} showAddCategory={showAddCategory} />
              <BillsTable bills={bills} showAddBill={showAddBill}
              removeBill={removeBill}/>
            </div>
        )}
      </div>
  )
}

export default App