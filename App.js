import React, { Component } from 'react'
import './App.css'
import ItemList from './components/itemList'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      currentItems: {
        key: '',
        text: ''
      }
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    const newItem = this.state.currentItems
    if (newItem.text !== '') {
      const newItems = [...this.state.items, newItem]
      console.log(newItem)
      this.setState({
        items: newItems,
        currentItems: {
          text: '',
          key: ''
        }
      })
    }
  }
  handleChange = e => {
    this.setState({
      currentItems: {
        text: e.target.value,
        key: Date.now
      }
    })
  }
  deleteItem = index => {
    const filterItems = this.state.items.filter(item => item.key !== index)
    this.setState({ items:filterItems })
  }
  render () {
    return (
      <div className='container'>
        <h1>TODO APP</h1>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <FormControl fullWidth>
            <InputLabel htmlFor='standard-adornment-amount'>
              Enter your todos
            </InputLabel>
            <Input
              value={this.state.currentItems.text}
              onChange={this.handleChange}
            />
          </FormControl>
          <button type='submit' className='btn btn-primary btn-block'>
            Add Todo
          </button>
        </form>
        <ItemList
          items={this.state.items}
          deleteItem={this.deleteItem}
        ></ItemList>
      </div>
    )
  }
}

export default App
