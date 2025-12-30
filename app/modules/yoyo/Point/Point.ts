import type { CornerEffect } from "../CornerEffect";

type Option = {
  editable?: boolean;
  fixed?: { x?: boolean; y?: boolean };
};

type ConstructorProps = {
  x: number;
  y: number;
  id?: string;
  option?: Option;
  cornerEffect?: CornerEffect;
};

export class Point {
  readonly __brand = "Point";
  readonly id: string;
  public x: number;
  public y: number;
  readonly option?: Option;
  readonly cornerEffect?: CornerEffect;

  public constructor({ x, y, option, id, cornerEffect }: ConstructorProps) {
    this.x = x;
    this.y = y;
    this.option = option;
    this.id = id || crypto.randomUUID();
    this.cornerEffect = cornerEffect;
  }

  static fromPosition(
    x: number,
    y: number,
    option?: Option,
    cornerEffect?: CornerEffect,
  ): Point {
    return new Point({ x, y, option, cornerEffect });
  }

  public clone(): Point {
    return new Point({
      x: this.x,
      y: this.y,
      option: this.option,
      id: this.id,
      cornerEffect: this.cornerEffect,
    });
  }

  public equals(other: Point): boolean {
    return (
      this.x === other.x &&
      this.y === other.y &&
      this.id === other.id &&
      JSON.stringify(this.cornerEffect) === JSON.stringify(other.cornerEffect)
    );
  }
}
