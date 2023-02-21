import config from "../config";

export type UTMDto = {
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  pt?: string;
  ct?: string;
  mt?: string;
  vt?: string;
};

export type AddressDto = {
  latitude: number;
  longitude: number;
  fullAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export const defaultAddress = {
  latitude: 0,
  longitude: 0,
  city: "",
  state: "",
  country: "",
  postalCode: "",
  fullAddress: "",
};

export type CreateCDLLeadDto = {
  firstName: string;
  phone: string;
  email: string;
  alertType: string;
  driverClass: string;
  jobsSearchRadiusInMiles: string;
  personalInfoAddress: AddressDto;
};

export async function createCDLLead(lead: CreateCDLLeadDto) {
  const res = await fetch(`${config.apiUrl}/lead-public/job-alert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  });

  const data = await res.json();

  if (data.statusCode >= 400) {
    const message = data?.message
      ? data.message
      : "An error occurred while trying to save data";
    throw new Error(message);
  }

  return data;
}
