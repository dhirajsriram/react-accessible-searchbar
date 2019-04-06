import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { mount, shallow } from 'enzyme';
import Searchbar from './index';
configure({ adapter: new Adapter() });
describe('Searchbar', () => {
	let props;
	let searchbar;
	const searchbarRender = () => {
		searchbar = mount(<Searchbar {...props} />);
		return searchbar;
	};

	beforeEach(() => {
		props = {
			autosuggestCount: 15,
			prompt: [ 'apple', 'bear', 'March', 'Mary', 'Mars' ]
		};
	});

	it('always renders a form', () => {
		const form = searchbarRender().find('form');
		expect(form.length).toBeGreaterThan(0);
	});
	it('always renders an input field', () => {
		const input = searchbarRender().find('input');
		expect(input.length).toBeGreaterThan(0);
	});
	it('always renders an search button', () => {
		const button = searchbarRender().find('button');
		expect(button.length).toBeGreaterThan(0);
	});
	it('Never renders the close button in the beggining', () => {
		const closeButton = searchbarRender().find('#clear-button');
		expect(closeButton.length).toBe(0);
	});
	it('sets the autosuggest count from props and should be a number', () => {
		expect(typeof props.autosuggestCount).toBe('number');
	});
	it('sets the autosuggest list from props and should be an array', () => {
		expect(Array.isArray(props.prompt)).toBe(true);
	});
	it('does not display autosuggest by default', () => {
		const list = searchbarRender().find('.list-autosuggest');
		expect(list.length).toBe(0);
	});
	it('The handleFieldChange handler is triggered on input change', () => {
		const onChange = jest.fn();
		const component = mount(<Searchbar handleFieldChange={onChange} />);
		const input = component.find('input');
		input.instance().value = 'hi';
		input.simulate('change');
		expect(onChange).toHaveBeenCalled();
	});
	it('The handleSearch handler is triggered on form', () => {
		const Search = jest.fn();
		const component = mount(<Searchbar handleSearch={Search} />);
		const input = component.find('input');
		const form = component.find('form');
		input.simulate('change');
		form.simulate('submit');
		expect(Search).toHaveBeenCalled();
  });
});
