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

	searchInput = (e) => {
		const text = event.target.value;
		if (event.target.value) {
			this.setState({ search: text }, () => {
				if (this.state.search.length >= 2) {
					this.showAutosuggest();
				}
			});
			this.props.onChange(text);
		} else {
			this.clearSearch();
		}
	};

	suggestionClick = (item) => {
		if (item === 'See more link') {
			this.expandList();
		} else {
			const suggestion = item;
			this.setState({ search: item });
			this.props.selectSuggestion(suggestion);
			this.resetSuggestions();
		}
	};

	resetSuggestions = () => {
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

	handleSuggestNav = () => {
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
					event.preventDefault();
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

	clearSearch = (e) => {
		this.setState({
			results: {},
			isLoaded: true,
			displaySuggestions: false,
			search: '',
			SuggestionCount: this.props.autosuggestCount,
			cursor: 0
		});
	};

	expandList = (e) => {
		this.setState({ SuggestionCount: this.state.suggestions.length });
		document.querySelector('#searchbar-input').focus();
	};

	componentDidMount() {
		this.setState({ SuggestionCount: this.props.autosuggestCount });
	}

	render() {
		return (
			<form
				onSubmit={(e) => {
					event.preventDefault();
					this.props.handleSearch();
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
										{index + 1 <= this.state.SuggestionCount && (
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
										)}
									</React.Fragment>
								))}
								{this.state.suggestions.length > this.state.SuggestionCount && (
									<li
										data-index={this.state.SuggestionCount}
										onClick={(e) => this.suggestionClick('See more link')}
										className={
											this.state.cursor === this.state.SuggestionCount ? (
												'active-suggestion'
											) : null
										}
									>
										<a href="javascript:void(0)" onClick={(e) => this.expandList()}>
											See more results
										</a>
									</li>
								)}
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
