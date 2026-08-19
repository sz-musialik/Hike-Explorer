import './WeatherConditionsCard.css';

interface WeatherConditionsCardProps {
	title: string;
	value: string;
	icon: string;
};

const WeatherConditionsCard = ( {title, value, icon}: WeatherConditionsCardProps ) => {
	return (
		<div className='weather-card'>
			<img src={icon} alt={icon} className='weather-card-icon'/>
			<span className='weather-card-title'>{title}</span>
			<span className='weather-card-value'>{value}</span>
		</div>
	)
}
export default WeatherConditionsCard;
