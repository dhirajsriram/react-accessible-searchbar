import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
export default class Searchbar extends Component {
	constructor(props) {
		super(props);
		this.state = { search: '', displaySuggestions: false, suggestions: [], cursor: 0 };
	}

	searchInput = (e) => {
		const text = event.target.value;
		this.setState({ search: text }, () => {
			if (this.state.search.length >= 2) {
				this.showAutosuggest();
			}
		});
		this.props.onChange(text);
	};

	suggestionClick = (item) => {
		const suggestion = item;
		this.setState({ search: item });
		this.props.selectSuggestion(suggestion);
		this.resetSuggestions();
	};

	resetSuggestions = () => {
		this.setState({ displaySuggestions: false, suggestions: [], cursor: 0 });
	};

	showAutosuggest = () => {
		this.setState({
			suggestions: this.props.prompt.filter(
				(option) => option.toLowerCase().indexOf(this.state.search.toLowerCase()) === 0
			)
		});
		if (this.state.suggestions.length > 0) {
			this.setState({ displaySuggestions: true }, () => {});
		}
	};

	handleSuggestNav = () => {
		const { cursor, suggestions } = this.state;
		if (event.which == 13 || event.keyCode == 13) {
			//code to execute here
			this.setState({
				search: this.state.suggestions[this.state.cursor],
				results: {},
				isLoaded: true,
				displaySuggestions: false
			});
		} else {
			if (event.keyCode === 38 && cursor > 0) {
        event.preventDefault();
				this.setState(
					{
						cursor: this.state.cursor - 1
					},
					() => {
            this.setState({ search: this.state.suggestions[this.state.cursor] });
          }
          
				);
			} else if (event.keyCode === 40 && cursor < suggestions.length - 1) {
				this.setState(
					{
						cursor: this.state.cursor + 1
					},
					() => {
						this.setState({ search: this.state.suggestions[this.state.cursor] });
					}
				);
			}
		}
	};

	clearSearch = (e) => {
		this.setState({ results: {}, isLoaded: true, displaySuggestions: false, search: '' });
  };
  
  componentDidUpdate(){
  }

	render() {
		return (
			<form
				onSubmit={(e) => {
					event.preventDefault();
					this.props.search();
				}}
			>
				<div className="searchbar-collection-container">
					<div className="searchbar-container">
						<input
							type="text"
							onKeyDown={(e) => this.handleSuggestNav()}
							id="searchbar-input"
							className="searchbar-input"
              onChange={(e) => this.searchInput()}
              onFocus={this.setCursor}
							name="st"
							value={this.state.search}
							maxLength="90"
							placeholder="Search"
							aria-label="Type to search. Navigate forward to hear suggestions"
							autoComplete="off"
							autoCorrect="off"
							autocapitolize="off"
							spellCheck="false"
						/>
						{this.state.displaySuggestions &&
						this.state.search && (
							<ul className="list-autosuggest" aria-label="Suggested Results">
								{this.state.suggestions.map((item, index) => (
									<li
										className={this.state.cursor === index ? 'active-suggestion' : null}
										data-index={index}
										key={index}
										onClick={(e) => this.suggestionClick(item)}
									>
										<span className="autosuggest-links">
											<strong>{item.substring(0, this.state.search.length)}</strong>
											{item.substring(this.state.search.length, item.length)}
										</span>
									</li>
								))}
							</ul>
						)}
					</div>
					<div className="searchbar-buttons-container">
						{this.state.search && (
							<button
								type="button"
								aria-label="Clear search text"
								className="buttons"
								onClick={(e) => this.clearSearch()}
							>
								<FaTimes />
							</button>
						)}
						<button type="submit" className="buttons" aria-label="submit search" title="Search">
							<FaSearch />
						</button>
					</div>
				</div>
			</form>
		);
	}
}
