export class Point {
  readonly __brand = "Point";
  readonly id: string = crypto.randomUUID();
  public x: number;
  public y: number;
  readonly option?: { editable?: boolean };

  constructor(x: number, y: number, option?: { editable?: boolean }) {
    this.x = x;
    this.y = y;
    this.option = option;
  }

  withPosition(x: number, y: number): Point {
    return new Point(x, y, this.option);
  }
}
