import {Component, OnInit} from '@angular/core';
import {Node, Edge, GraphModule} from '@swimlane/ngx-graph';
import {GraphService} from '../../../core/services/graph.service';
import {curveLinear} from 'd3-shape';
import {NgIf} from '@angular/common';

/**
 * Visualizes and manages the interactive graph board.
 * Supports node creation, edge creation, and highlighting.
 */
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
  standalone: true,
  imports: [NgIf, GraphModule],
})
export class BoardPageComponent implements OnInit {
  nodes: Node[] = [];
  links: Edge[] = [];
  curve = curveLinear;

  /** Whether user is in edge creation mode */
  isCreatingEdge = false;

  /** ID of the first selected node (if any) */
  selectedNodeId: string | null = null;

  constructor(private graphService: GraphService) {
  }

  /**
   * Initializes the graph by loading nodes and edges.
   */
  ngOnInit(): void {
    this.loadGraph();
  }

  /**
   * Fetches current graph data.
   */
  loadGraph(): void {
    this.graphService.getNodes().subscribe(nodes => (this.nodes = nodes));
    this.graphService.getEdges().subscribe(links => (this.links = links));
  }

  /**
   * Adds a new node with default label and random position.
   */
  addNode(): void {
    const label = `Node ${this.nodes.length + 1}`;
    this.graphService.addNode(label).subscribe(() => this.loadGraph());
  }

  /**
   * Handles node click event based on interaction mode.
   * @param nodeId ID of the clicked node
   */
  onNodeClick(nodeId: string): void {
    if (!this.isCreatingEdge) return;

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
   * Toggles the edge creation mode on/off.
   */
  toggleEdgeMode(): void {
    this.isCreatingEdge = !this.isCreatingEdge;
    this.selectedNodeId = null;
  }

  /**
   * Determines node fill color depending on selection.
   * @param id Node ID
   */
  getNodeColor(id: string): string {
    return this.selectedNodeId === id ? '#1976d2' : '#90caf9';
  }
}
