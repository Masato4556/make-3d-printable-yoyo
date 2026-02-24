import { describe, it, expect } from 'vitest';
import { Point } from './Point';

describe('Point', () => {
  it('should be created with the correct coordinates and a unique ID', () => {
    const point = new Point({ x: 10, y: 20 });
    expect(point.x).toBe(10);
    expect(point.y).toBe(20);
    expect(point.id).toBeDefined();
  });

  it('should be created with a specific ID if provided', () => {
    const point = new Point({ x: 1, y: 2, id: 'test-id' });
    expect(point.id).toBe('test-id');
  });

  it('should correctly assign cornerEffect during construction', () => {
    const cornerEffect = { type: 'fillet' as const, size: 5 };
    const point = new Point({ x: 1, y: 2, cornerEffect });
    expect(point.cornerEffect).toEqual(cornerEffect);
  });

  describe('clone', () => {
    it('should create a new Point instance with the same properties', () => {
      const original = new Point({ x: 15, y: 25 });
      const clone = original.clone();
      expect(clone).not.toBe(original);
      expect(clone.x).toBe(original.x);
      expect(clone.y).toBe(original.y);
      expect(clone.id).toBe(original.id);
    });

    it('should correctly clone the cornerEffect', () => {
      const cornerEffect = { type: 'chamfer' as const, size: 3 };
      const original = new Point({ x: 1, y: 2, cornerEffect });
      const clone = original.clone();
      expect(clone.cornerEffect).toEqual(cornerEffect);
    });
  });

  describe('equals', () => {
    it('should return true for points with the same properties', () => {
      const point1 = new Point({ x: 5, y: 10, id: 'same-id' });
      const point2 = new Point({ x: 5, y: 10, id: 'same-id' });
      expect(point1.equals(point2)).toBe(true);
    });

    it('should return false for points with different coordinates', () => {
      const point1 = new Point({ x: 5, y: 10 });
      const point2 = new Point({ x: 10, y: 5 });
      expect(point1.equals(point2)).toBe(false);
    });

    it('should return true for cloned points', () => {
      const original = new Point({ x: 1, y: 2 });
      const clone = original.clone();
      expect(original.equals(clone)).toBe(true);
    });

    it('should return true for points with the same cornerEffect', () => {
      const cornerEffect = { type: 'fillet' as const, size: 2 };
      const point1 = new Point({ x: 1, y: 2, id: 'same-id', cornerEffect });
      const point2 = new Point({ x: 1, y: 2, id: 'same-id', cornerEffect });
      expect(point1.equals(point2)).toBe(true);
    });

    it('should return false for points with different cornerEffect', () => {
      const cornerEffect1 = { type: 'fillet' as const, size: 2 };
      const cornerEffect2 = { type: 'chamfer' as const, size: 2 };
      const point1 = new Point({ x: 1, y: 2, cornerEffect: cornerEffect1 });
      const point2 = new Point({ x: 1, y: 2, cornerEffect: cornerEffect2 });
      expect(point1.equals(point2)).toBe(false);
    });

    it('should return false if one point has a cornerEffect and the other does not', () => {
      const cornerEffect = { type: 'fillet' as const, size: 2 };
      const point1 = new Point({ x: 1, y: 2, cornerEffect });
      const point2 = new Point({ x: 1, y: 2 });
      expect(point1.equals(point2)).toBe(false);
    });
  });
});