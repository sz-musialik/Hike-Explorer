import './Navbar.css';
import logo from '../assets/logo.svg';

const Navbar = () => {
	return (
		<div className='navbar'>
			<div className='navbar-item'>
				<a href='/'><img src={logo}></img></a>
			</div>

			<div className='navbar-item'>
				<span className='navbar-item-span'>Saved trails</span>
			</div>
		</div>
	)
}
export default Navbar;
