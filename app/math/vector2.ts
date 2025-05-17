export class Vector2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public withX(x: number): Vector2 {
    return new Vector2(x, this.y);
  }

  public withY(y: number): Vector2 {
    return new Vector2(this.x, y);
  }

  public add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  public sub(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  public equals(v: Vector2): boolean {
    return this.x === v.x && this.y === v.y;
  }
}
