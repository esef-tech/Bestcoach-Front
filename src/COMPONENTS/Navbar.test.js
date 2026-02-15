const { render, screen } = require('@testing-library/react');
const Navbar = require('./Navbar');

test('renders Navbar component', () => {
	render(<Navbar />);
	const linkElement = screen.getByText(/navbar/i);
	expect(linkElement).toBeInTheDocument();
});