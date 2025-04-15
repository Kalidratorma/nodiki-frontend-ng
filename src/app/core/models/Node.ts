/**
 * Model representing a Node entity in the system.
 */
export interface Node {
  /** Unique identifier of the node. */
  id: string;

  /** Label or name associated with the node. */
  label: string;

  /** X coordinate of the node position. */
  x: number;

  /** Y coordinate of the node position. */
  y: number;
}
