import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Node, Edge } from '@swimlane/ngx-graph';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Service for fetching and transforming graph data (nodes and edges).
 */
@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetches nodes from the backend and transforms them for ngx-graph.
   */
  getNodes(): Observable<Node[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nodes`).pipe(
      map(nodes =>
        nodes.map(node => ({
          id: node.id.toString(),
          label: node.label,
          data: {
            x: node.x,
            y: node.y
          }
        }))
      )
    );
  }

  /**
   * Fetches edges from the backend and transforms them for ngx-graph.
   */
  getEdges(): Observable<Edge[]> {
    return this.http.get<any[]>(`${this.apiUrl}/edges`).pipe(
      map(edges =>
        edges.map(edge => ({
          id: edge.id.toString(),
          source: edge.source.toString(),
          target: edge.target.toString(),
          label: edge.label
        }))
      )
    );
  }

  /**
   * Fetches both nodes and edges as a combined observable.
   */
  getGraph(): Observable<{ nodes: Node[]; edges: Edge[] }> {
    return forkJoin({
      nodes: this.getNodes(),
      edges: this.getEdges()
    });
  }
}
