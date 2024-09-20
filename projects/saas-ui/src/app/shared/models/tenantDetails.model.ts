export class tenantDetails {
  id: string;
  name: string;
  contacts: {
    firstName: string;
    email: string;
  };
  address: {
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  subscription: {
    plan: {
      name: string;
      description: string;
      price: number;
      tier: string;
    };
    status: number;
    startDate: Date;
    endDate: Date;
  };

  constructor(
    id: string,
    name: string,
    firstName: string,
    email: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    planName: string,
    description: string,
    price: number,
    tier: string,
    status: number,
    startDate: Date,
    endDate: Date,
  ) {
    this.id = id;
    this.name = name;
    this.contacts = {
      firstName: firstName,
      email: email,
    };

    this.address = {
      city: city,
      state: state,
      zip: zipCode,
      country: country,
    };
    this.subscription = {
      status: status,
      startDate: startDate,
      endDate: endDate,
      plan: {
        name: planName,
        description: description,
        price: price,
        tier: tier,
      },
    };
  }
}
