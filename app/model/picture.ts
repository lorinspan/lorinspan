export class Picture {
  id: number;
  src: string;
  alt: string;
  about: Description;
  lazySrc: string | null; // New property for lazy loading
  categories: string[];

  constructor(
    alt: string,
    description: string | null,
    date: string | null,
    location: string | null,
    locationHref: string | null,
    model: string | null,
    modelHref: string | null,
    settings: string | null,
    ...categories: string[]
  ) {
    this.id = 0;
    this.src = 'assets/pictures/' + alt;
    this.alt = alt;
    this.lazySrc = null; // Initialize the lazySrc property
    this.about = new Description(description, date, new Location(location, locationHref), new Model(model, modelHref), settings);
    this.categories = categories;
  }
}


export class Description {
  description: string | null;
  date: string | null;
  location: Location | null;
  model: Model | null;
  settings: string | null;

  constructor(description: string | null, date: string | null, location: Location, model: Model, settings: string | null) {
    this.description = description;
    this.date = date;
    this.location = location;
    this.model = model;
    this.settings = settings;
  }
}

export class Location {
  location: string | null;
  href: string | null;

  constructor(location: string | null, href: string | null) {
    this.location = location;
    if(this.location) {
      this.href = href;
    } else {
      this.href = null;
    }
  }
}

export class Model {
  model: string | null;
  href: string | null;

  constructor(model: string | null, href: string | null) {
    this.model = model;
    if(this.model) {
      this.href = href;
    } else {
      this.href = null;
    }
  }
}
