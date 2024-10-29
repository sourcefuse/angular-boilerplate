export class TenantDetails {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  status: number;
  key: string;
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

    startDate: Date;
    endDate: Date;
  };

  constructor(
    id: string,
    name: string,
    firstName: string,
    lastName: string,
    email: string,
    key: string,
    status: number,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    planName: string,
    description: string,
    price: number,
    tier: string,

    startDate: Date,
    endDate: Date,
  ) {
    this.id = id;
    this.name = name;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.key = key;
    this.status = status;
    this.address = {
      city: city,
      state: state,
      zip: zipCode,
      country: country,
    };
    this.subscription = {
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
