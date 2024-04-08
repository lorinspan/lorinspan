export class Website {
  id: number;
  thumbnail: string | null;
  name: string | null;
  description: string | null;
  presentations: Presentation[];

  constructor(id: number, thumbnail: string | null, name: string | null, description: string | null, ...presentations: Presentation[]) {
    this.id = id;
    this.thumbnail = thumbnail;
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
  gif: string;
  title: string;
  description: string;

  constructor(id: number, gif: string, title: string, description: string) {
    this.id = id;
    this.gif = gif;
    this.title = title;
    this.description = description;
  }
}
