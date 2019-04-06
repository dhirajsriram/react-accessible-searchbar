import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

export default class Searchbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			displaySuggestions: false,
			suggestions: [],
			cursor: 0,
			SuggestionCount: 0
		};
	}

	searchInput(event) {
    event.persist();
		const text = event.target.value;
		
		if (event.target.value) {
			this.setState({ search: text }, () => {
				if (this.state.search.length >= 2 && this.props.prompt) {
					console.log("called autosuggest")
					this.showAutosuggest();
				}
			});
			if(this.props.handleFieldChange){
			this.props.handleFieldChange(text);
		}
		} else {
			this.clearSearch();
		}
	};

	suggestionClick(item,event){
		if (item === 'See more link') {
			this.expandList();
		} else {
      event.persist();
			const suggestion = item;
			this.setState({ search: item });
			this.props.handleSelectSuggestion(suggestion);
			this.resetSuggestions(event);
		}
	};

	resetSuggestions(event){
		this.setState({ displaySuggestions: false, suggestions: [], cursor: 0 });
	};

	showAutosuggest = () => {
		this.setState(
			{
				suggestions: this.props.prompt.filter(
					(option) => option.toLowerCase().indexOf(this.state.search.toLowerCase()) === 0
				)
			},
			() => {
				if (this.state.suggestions.length > 0) {
					this.setState({ displaySuggestions: true });
				}
			}
		);
	};

	handleSuggestNav(event){
    event.persist();
		const { cursor, suggestions } = this.state;
		switch (event.keyCode) {
			case 13:
				if (this.state.cursor !== this.props.autosuggestCount) {
					this.setState({
						search: this.state.suggestions[this.state.cursor],
						results: {},
						isLoaded: true,
						displaySuggestions: false
					});
				} else {
					event.preventDefault();
					this.expandList();
					this.setState({ search: this.state.suggestions[this.props.autosuggestCount] });
				}
				break;
      case 38:
				if (cursor > 0) {
					this.setState(
						{
							cursor: this.state.cursor - 1
						},
						() => {
							this.setState({
								search: this.state.suggestions[this.state.cursor]
							});
						}
					);
				}
				break;
			case 40:
				if (cursor < suggestions.length - 1 && cursor < this.state.SuggestionCount) {
					this.setState(
						{
							cursor: this.state.cursor + 1
						},
						() => {
							if (this.state.cursor !== this.state.SuggestionCount)
								this.setState({
									search: this.state.suggestions[this.state.cursor]
								});
						}
					);
				}
				break;
			case 27:
				this.resetSuggestions();
        break;
		}
	};

	clearSearch(){
		this.setState({
			results: {},
			isLoaded: true,
			displaySuggestions: false,
			search: '',
			SuggestionCount: this.props.autosuggestCount,
			cursor: 0
		});
  };

  submitHandler(event){
    event.persist();
    event.preventDefault();
    this.props.handleSearch();
  }

	expandList(){
		this.setState({ SuggestionCount: this.state.suggestions.length });
		document.querySelector('#searchbar-input').focus();
	};

	componentDidMount() {
		this.setState({ SuggestionCount: this.props.autosuggestCount });
	}

	render() {
		return (
			<form
				onSubmit={this.submitHandler.bind(this)}
			>
				<div className="searchbar-collection-container">
					<div className="searchbar-container">
						<input
							type="text"
							onKeyDown={this.handleSuggestNav.bind(this)}
							id="searchbar-input"
							name="searchbar-input"
							className="searchbar-input"
							onChange={this.searchInput.bind(this)}
							name="st"
							value={this.state.search}
							maxLength="90"
							placeholder="Search"
							aria-label="Type to search. Navigate below to hear suggestions"
							autoComplete="off"
							autoCorrect="off"
							autocapitolize="off"
              spellCheck="false"
						/>
						{this.state.displaySuggestions &&
						this.state.search && (
							<ul className="list-autosuggest" aria-label="Suggested Results">
								{this.state.suggestions.map((item, index) => (
									<React.Fragment key={index}>
										{ index + 1 <= this.state.SuggestionCount && (
											<li
												className={this.state.cursor === index ? 'active-suggestion' : null}
												data-index={index}
												key={index}
												onClick={this.suggestionClick.bind(this,item)}
											>
												<span className="autosuggest-links">
													<strong>{item.substring(0, this.state.search.length)}</strong>
													{item.substring(this.state.search.length, item.length)}
												</span>
											</li>
										)}
									</React.Fragment>
								))}
								{this.state.suggestions.length > this.state.SuggestionCount && (
									<li
										data-index={this.state.SuggestionCount}
										onClick={this.suggestionClick.bind(this,"See more link")}
										className={
											this.state.cursor === this.state.SuggestionCount ? (
												'active-suggestion'
											) : null
										}
									>
										<a href="javascript:void(0)" onClick={this.expandList.bind(this)}>
											See more results
										</a>
									</li>
								)}
							</ul>
						)}
					</div>
					<div className="searchbar-buttons-container">
						{this.state.search && (
							<button id="clear-button"
								type="button"
								aria-label="Clear search text"
								className="buttons"
								onClick={this.clearSearch.bind(this)}
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
