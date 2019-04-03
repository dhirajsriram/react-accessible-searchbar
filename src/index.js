import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { FaSearch } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }

  searchInput = (e) => {
    const text = event.target.value;
    this.setState({search : text})
    this.props.onChange(text);
  }

  clearSearch = (e) => {
    this.setState({ search: "", results: {}, isLoaded: true });
  }

  render() {
    return (
      <form onSubmit={(e)=>{event.preventDefault();this.props.search()}}>
      <div className={this.props.stylesheet["searchbar-collection-container"]}>
        <div className={this.props.stylesheet["searchbar-container"]}>
          <input type="text" id="searchbar-input" className={this.props.stylesheet["searchbar-input"]} onChange={(e) => this.searchInput()} name="st" value={this.state.search} maxLength="90" placeholder="Search" aria-label="Type to search. Navigate forward to hear suggestions" autoComplete="off" autoCorrect="off" autocapitolize="off" spellCheck="false" /></div>
        <div className={this.props.stylesheet["searchbar-buttons-container"]}>
          <button aria-label="Clear search text" className={this.props.stylesheet["buttons"]} onClick={(e) => this.clearSearch()}><FaTimes /></button>
          <button type="submit" className={this.props.stylesheet["buttons"]} aria-label="submit search" title="Search"><FaSearch /></button></div>
      </div></form>
    )
  }
}

