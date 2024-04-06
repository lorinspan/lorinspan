export class Picture {
  id: number;
  src: string;
  alt: string;
  description: string;

  constructor(id: number, alt: string, description: string) {
    this.id = id;
    this.src = 'assets/pictures/' + alt + '.png';
    this.alt = alt;
    this.description = description;
  }

}
