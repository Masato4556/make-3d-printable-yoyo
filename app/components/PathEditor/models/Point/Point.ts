type Option = {
  editable?: boolean;
  fixed?: { x?: boolean; y?: boolean };
};

type ConstructorProps = {
  x: number;
  y: number;
  id?: string;
  option?: Option;
};

export class Point {
  readonly __brand = "Point";
  readonly id: string;
  public x: number;
  public y: number;
  readonly option?: Option;

  private constructor({ x, y, option, id }: ConstructorProps) {
    this.x = x;
    this.y = y;
    this.option = option;
    this.id = id || crypto.randomUUID();
  }

  static fromPosition(x: number, y: number, option?: Option): Point {
    return new Point({ x, y, option });
  }

  public clone(): Point {
    return new Point({
      x: this.x,
      y: this.y,
      option: this.option,
      id: this.id,
    });
  }
}
