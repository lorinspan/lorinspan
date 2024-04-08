export class Website {
  id: number;
  thumbnail: string | null;
  name: string | null;
  description: string | null;
  presentations: Presentation[];

  constructor(id: number, thumbnail: string | null, name: string | null, description: string | null, ...presentations: Presentation[]) {
    this.id = id;
    this.thumbnail = 'assets/websites/' + thumbnail + ".png"
    this.name = name;
    this.description = description;
    this.presentations = [];

    for (const presentation of presentations) {
      this.presentations.push(presentation);
    }
  }
}


export class Presentation {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;

  constructor(id: number, alt: string, title: string, description: string) {
    this.id = id;
    this.src = 'assets/websites/' + alt + ".gif";
    this.alt = alt;
    this.title = title;
    this.description = description;
  }
}
