/**
 * Model representing an Edge connection between two nodes.
 */
export interface Edge {
  /** Unique identifier of the edge. */
  id: string;

  /** Identifier of the source node. */
  sourceId: string;

  /** Identifier of the target node. */
  targetId: string;

  /** Description or details about the edge. */
  description: string;
}
