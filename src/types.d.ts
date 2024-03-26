type LIGHT_MODE = "dark" | "light";

type Setting = {
  company_name: string;
  email: string;
  website: string;
  logo: UploadedFile | Blob | null;

  // Address
  street_1: string;
  street_2: string;

  city: string;
  state: string;
  postal: string;
  country_code: string;
};
