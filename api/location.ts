const url = 'https://geocodeapi.p.rapidapi.com/GetTimezone?latitude=37.785834&longitude=-122.406417';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '623459cc83msh1bfce463bd5b53ep1ba35ejsn8d4e6a1340d7',
		'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
	}
};

export const getAddressFromCoordinates = async({ latitude, longitude }) => {

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }

  
}