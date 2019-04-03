import React, { Component } from 'react'
import Searchbar from 'react-searchbar'
import styles from "./index.css"
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {search:""};
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(value) {
    this.setState({search:value})
  }
  searchExample = (ev) => {
    /* CUSTOM PROP FOR SEARCH
    this.setState({ isLoaded: false })
    fetch(searchapi + this.state.search).then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            results: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        })
    */
  }

  render () {
    return (
      <div>
        <Searchbar onChange={this.handleFieldChange} search={(e)=>this.searchExample()} stylesheet={styles}/>
      </div>
    )
  }
}
