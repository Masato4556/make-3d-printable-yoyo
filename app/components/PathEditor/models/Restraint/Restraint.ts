import { FollowRestraint } from "./FollowRestraint";

export type Restraint = FollowRestraint;

export const RESTRAINT_MAP = {
  Follow: FollowRestraint,
} as const;

export type RestraintType = keyof typeof RESTRAINT_MAP;
