import axios from 'axios';

export default async function GetSneakers(setBrand) {
  const headers = {
    'x-api-key': 'cefe79da-294d-4afa-b530-69f24ad08e64',
  };

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ORIGIN}/api/v1/sneakers/brands`,
      { headers: headers, maxBodyLength: Infinity }
    );
    console.log(import.meta.env.VITE_API_ORIGIN);
    console.log(response.data.data);
    setBrand(response.data.data);
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
}
