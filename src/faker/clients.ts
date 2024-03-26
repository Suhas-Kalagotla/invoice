function dummyClient(id: string): Client {
  const currencies: CurrencyCode[] = ["USD", "EUR"];
  const languages: string[] = ["en", "fr", "de", "es"];
  const streetNames: string[] = ["Main", "Park", "Oak", "Cedar"];
  const cities: string[] = ["New York", "London", "Paris", "Tokyo"];
  const firstNames: string[] = ["John", "Jane", "Michael", "Emma"];
  const lastNames: string[] = ["Smith", "Johnson", "Brown", "Davis"];
  const organizationNames: string[] = [
    "Acme Inc",
    "XYZ Corporation",
    "ABC Co",
    "123 Company",
  ];

  const randomCurrency =
    currencies[Math.floor(Math.random() * currencies.length)];
  const randomLanguage =
    languages[Math.floor(Math.random() * languages.length)];
  const randomStreetName =
    streetNames[Math.floor(Math.random() * streetNames.length)];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomOrganizationName =
    organizationNames[Math.floor(Math.random() * organizationNames.length)];

  const clientType = Math.random() < 0.5 ? "PERSON" : "ORGANIZATION";

  if (clientType === "PERSON") {
    const client: Client = {
      id,
      currency_code: randomCurrency,
      language_code: randomLanguage,
      email: `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@example.com`,
      phone: "+1 555-555-5555",
      street_1: `${randomStreetName} St`,
      street_2: "",
      city: randomCity,
      state: "NY",
      postal: "10001",
      country_code: "US",
      type: clientType,
      first_name: randomFirstName,
      last_name: randomLastName,
      contact_first_name: "",
      contact_last_name: "",
      organization_name: "",
    };
    return client;
  } else {
    const client: Client = {
      id,
      currency_code: randomCurrency,
      language_code: randomLanguage,
      email: `${randomOrganizationName
        .replace(/\s/g, "")
        .toLowerCase()}@example.com`,
      phone: "+1 555-555-5555",
      street_1: `${randomStreetName} Ave`,
      street_2: "",
      city: randomCity,
      state: "NY",
      postal: "10001",
      country_code: "US",
      type: clientType,
      organization_name: randomOrganizationName,
      contact_first_name: randomFirstName,
      contact_last_name: randomLastName,
      first_name: "",
      last_name: "",
    };
    return client;
  }
}
export function generateDummyClients(count: number): Client[] {
  const dummyData = [];

  for (let i = 0; i < count; i++) {
    const c = dummyClient(`${i}`);
    dummyData.push(c);
  }

  return dummyData;
}
