export interface CityItem {
  name: string;
  state: string;
  country: string;
}

export const POPULAR_CITIES: CityItem[] = [
  { name: "Pune", state: "Maharashtra", country: "India" },
  { name: "Mumbai", state: "Maharashtra", country: "India" },
  { name: "Delhi", state: "Delhi", country: "India" },
  { name: "Bengaluru", state: "Karnataka", country: "India" },
  { name: "Hyderabad", state: "Telangana", country: "India" },
  { name: "Chennai", state: "Tamil Nadu", country: "India" },
  { name: "Kolkata", state: "West Bengal", country: "India" },
  { name: "Ahmedabad", state: "Gujarat", country: "India" },
  { name: "Jaipur", state: "Rajasthan", country: "India" },
  { name: "Surat", state: "Gujarat", country: "India" },
  { name: "Lucknow", state: "Uttar Pradesh", country: "India" },
  { name: "Kanpur", state: "Uttar Pradesh", country: "India" },
  { name: "Nagpur", state: "Maharashtra", country: "India" },
  { name: "Indore", state: "Madhya Pradesh", country: "India" },
  { name: "Thane", state: "Maharashtra", country: "India" },
  { name: "Bhopal", state: "Madhya Pradesh", country: "India" },
  { name: "Visakhapatnam", state: "Andhra Pradesh", country: "India" },
  { name: "Pimpri-Chinchwad", state: "Maharashtra", country: "India" },
  { name: "Patna", state: "Bihar", country: "India" },
  { name: "Vadodara", state: "Gujarat", country: "India" },
  { name: "Ghaziabad", state: "Uttar Pradesh", country: "India" },
  { name: "Ludhiana", state: "Punjab", country: "India" },
  { name: "Agra", state: "Uttar Pradesh", country: "India" },
  { name: "Nashik", state: "Maharashtra", country: "India" },
  { name: "Faridabad", state: "Haryana", country: "India" },
  { name: "Meerut", state: "Uttar Pradesh", country: "India" },
  { name: "Rajkot", state: "Gujarat", country: "India" },
  { name: "Varanasi", state: "Uttar Pradesh", country: "India" },
  { name: "Srinagar", state: "Jammu & Kashmir", country: "India" },
  { name: "Aurangabad", state: "Maharashtra", country: "India" },
  { name: "Dhanbad", state: "Jharkhand", country: "India" },
  { name: "Amritsar", state: "Punjab", country: "India" },
  { name: "Navi Mumbai", state: "Maharashtra", country: "India" },
  { name: "Allahabad", state: "Uttar Pradesh", country: "India" },
  { name: "Ranchi", state: "Jharkhand", country: "India" },
  { name: "Howrah", state: "West Bengal", country: "India" },
  { name: "Coimbatore", state: "Tamil Nadu", country: "India" },
  { name: "Jabalpur", state: "Madhya Pradesh", country: "India" },
  { name: "Gwalior", state: "Madhya Pradesh", country: "India" },
  { name: "Vijayawada", state: "Andhra Pradesh", country: "India" },
  { name: "Jodhpur", state: "Rajasthan", country: "India" },
  { name: "Madurai", state: "Tamil Nadu", country: "India" },
  { name: "Raipur", state: "Chhattisgarh", country: "India" },
  { name: "Kota", state: "Rajasthan", country: "India" },
  { name: "Guwahati", state: "Assam", country: "India" },
  { name: "Chandigarh", state: "Chandigarh", country: "India" },
  { name: "Solapur", state: "Maharashtra", country: "India" },
  { name: "Hubli-Dharwad", state: "Karnataka", country: "India" },
  { name: "Bareilly", state: "Uttar Pradesh", country: "India" },
  { name: "Mysore", state: "Karnataka", country: "India" },
  { name: "Gurugram", state: "Haryana", country: "India" },
  { name: "Noida", state: "Uttar Pradesh", country: "India" },
  { name: "Dehradun", state: "Uttarakhand", country: "India" },
  { name: "Shimla", state: "Himachal Pradesh", country: "India" },
  { name: "Panaji", state: "Goa", country: "India" },
  { name: "London", state: "England", country: "United Kingdom" },
  { name: "New York", state: "NY", country: "USA" },
  { name: "Dubai", state: "Dubai", country: "UAE" },
  { name: "Toronto", state: "Ontario", country: "Canada" },
  { name: "Sydney", state: "NSW", country: "Australia" },
];

export function searchCities(query: string): CityItem[] {
  if (!query || !query.trim()) return POPULAR_CITIES;
  const q = query.toLowerCase().trim();
  return POPULAR_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
  );
}
