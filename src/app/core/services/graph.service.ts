import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {Node} from '@models/Node';
import {Edge} from '@models/Edge';
import {environment} from '@environments/environment';

/**
 * Service for managing graph data via the backend API.
 */
@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private readonly nodesUrl = `${environment.apiBaseUrl}/nodes`;
  private readonly edgesUrl = `${environment.apiBaseUrl}/edges`;

  constructor(private http: HttpClient) {
  }

  /**
   * Loads all graph nodes from backend and maps to project Node format.
   * Ensures each node has x, y and readable label.
   */
  getNodes(): Observable<Node[]> {
    return this.http.get<any[]>(this.nodesUrl).pipe(
      map(nodes =>
        nodes.map(node => ({
          id: node.id,
          label: node.label && node.label.trim().length > 0
            ? node.label
            : `Node ${node.id}`,
          x: node.x ?? 0,
          y: node.y ?? 0
        }))
      )
    );
  }

  /**
   * Loads all graph edges from backend and maps to project Edge format.
   */
  getEdges(): Observable<Edge[]> {
    return this.http.get<any[]>(this.edgesUrl).pipe(
      map(edges =>
        edges.map(edge => ({
          id: edge.id,
          sourceId: edge.sourceId,
          targetId: edge.targetId,
          description: edge.label || 'auto-generated'
        }))
      )
    );
  }

  /**
   * Sends request to create a new node.
   * @param label Display label for the node.
   */
  addNode(label: string): Observable<Node> {
    const body = {
      label,
      x: Math.random() * 500,
      y: Math.random() * 300
    };
    return this.http.post<any>(this.nodesUrl, body).pipe(
      map(node => ({
        id: node.id,
        label: node.label && node.label.trim().length > 0
          ? node.label
          : `Node ${node.id}`,
        x: node.x ?? 0,
        y: node.y ?? 0
      }))
    );
  }


  /**
   * Sends request to create an edge between two nodes.
   * @param sourceId Source node ID (unprefixed)
   * @param targetId Target node ID (unprefixed)
   */
  createEdge(sourceId: string, targetId: string): Observable<void> {
    // Backend expects raw numeric IDs
    return this.http.post<void>(this.edgesUrl, {
      sourceId: sourceId.replace('node-', ''),
      targetId: targetId.replace('node-', '')
    });
  }

  /**
   * Deletes a node by ID.
   * Automatically removes related edges on the backend side.
   * @param id Full node ID like 'node-3'
   */
  deleteNode(id: string): Observable<void> {
    return this.http.delete<void>(`${this.nodesUrl}/${id.replace('node-', '')}`);
  }

  /**
   * Renames a node with the given ID.
   * @param id - The ID of the node to rename
   * @param label - The new label for the node
   * @returns Observable of void
   */
  renameNode(id: string, label: string): Observable<void> {
    const numericId = id.replace('node-', '');
    return this.http.put<void>(`${this.nodesUrl}/${numericId}`, {label});
  }

}
