import {Component, OnInit} from '@angular/core';
import {Node, Edge, GraphModule} from '@swimlane/ngx-graph';
import {GraphService} from '../../../core/services/graph.service';
import {curveLinear} from 'd3-shape';
import { NgIf } from '@angular/common';

/**
 * BoardPageComponent visualizes and manages the node graph.
 * Supports adding nodes and creating edges interactively.
 */
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
  imports: [
    GraphModule, NgIf
  ],
  standalone: true
})
export class BoardPageComponent implements OnInit {
  nodes: Node[] = [];
  links: Edge[] = [];
  selectedNodeId: string | null = null;
  curve = curveLinear;

  constructor(private graphService: GraphService) {
  }

  /**
   * Loads graph data on initialization.
   */
  ngOnInit(): void {
    this.loadGraph();
  }

  /**
   * Loads nodes and edges from the backend API.
   */
  loadGraph(): void {
    this.graphService.getNodes().subscribe(nodes => (this.nodes = nodes));
    this.graphService.getEdges().subscribe(links => (this.links = links));
  }

  /**
   * Adds a new node and reloads the graph.
   */
  addNode(): void {
    const label = `Node ${this.nodes.length + 1}`;
    this.graphService.addNode(label).subscribe(() => this.loadGraph());
  }

  /**
   * Handles click on a node to create edge between two selected nodes.
   * @param nodeId ID of the clicked node.
   */
  onNodeClick(nodeId: string): void {
    if (!this.selectedNodeId) {
      this.selectedNodeId = nodeId;
    } else if (this.selectedNodeId !== nodeId) {
      const source = this.selectedNodeId;
      const target = nodeId;
      this.graphService.createEdge(source, target).subscribe(() => {
        this.loadGraph();
        this.selectedNodeId = null;
      });
    } else {
      this.selectedNodeId = null;
    }
  }

  /**
   * Returns node fill color depending on selection.
   * @param id Node ID
   */
  getNodeColor(id: string): string {
    return this.selectedNodeId === id ? '#1976d2' : '#90caf9';
  }
}
