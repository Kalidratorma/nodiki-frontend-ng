import {Component, OnInit} from '@angular/core';
import {Node, Edge, GraphModule} from '@swimlane/ngx-graph';
import {GraphService} from '../../../core/services/graph.service';
import {curveLinear} from 'd3-shape';
import {NgIf} from '@angular/common';

/**
 * Component responsible for rendering and managing the graph board.
 * Includes functionality for adding, deleting, selecting and linking nodes.
 */
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
  standalone: true,
  imports: [NgIf, GraphModule],
})
export class BoardPageComponent implements OnInit {
  /** Graph nodes */
  nodes: Node[] = [];

  /** Graph links */
  links: Edge[] = [];

  /** Selected node ID */
  selectedNodeId: string | null = null;

  /** Edge creation mode flag */
  isCreatingEdge = false;

  /** Graph rendering readiness flag */
  graphReady = false;

  /** D3 curve function used for rendering edges */
  curve = curveLinear;

  constructor(private graphService: GraphService) {
  }

  /**
   * Initializes the component by loading the graph.
   */
  ngOnInit(): void {
    this.loadGraph();
  }

  /**
   * Loads nodes and edges from the backend and filters invalid links.
   * Sets the `graphReady` flag when both are available.
   */
  loadGraph(): void {
    this.graphReady = false;

    this.graphService.getNodes().subscribe((nodes) => {
      this.nodes = nodes;

      this.graphService.getEdges().subscribe((links) => {
        this.links = links;
        this.filterValidLinks();
        this.graphReady = true;
      });
    });
  }

  /**
   * Filters out links that point to non-existent nodes.
   */
  filterValidLinks(): void {
    const nodeIds = new Set(this.nodes.map((n) => n.id));
    this.links = this.links.filter(
      (link) => nodeIds.has(link.source) && nodeIds.has(link.target)
    );
  }

  /**
   * Adds a new node with default label.
   */
  addNode(): void {
    const label = `Node ${this.nodes.length + 1}`;
    this.graphService.addNode(label).subscribe(() => this.loadGraph());
  }

  /**
   * Deletes the currently selected node.
   */
  deleteSelectedNode(): void {
    if (!this.selectedNodeId) return;
    this.graphService.deleteNode(this.selectedNodeId).subscribe(() => {
      this.selectedNodeId = null;
      this.loadGraph();
    });
  }

  /**
   * Renames the selected node using a prompt dialog.
   * Updates the label on the backend and refreshes the graph.
   */
  renameSelectedNode(): void {
    if (!this.selectedNodeId) return;

    const currentLabel = this.nodes.find(n => n.id === this.selectedNodeId)?.label || '';
    const newLabel = prompt('Enter new label for the node:', currentLabel);

    if (newLabel && newLabel.trim() !== currentLabel) {
      this.graphService.renameNode(this.selectedNodeId, newLabel.trim()).subscribe(() => {
        this.loadGraph();
      });
    }
  }

  /**
   * Handles selection of nodes or edges.
   * Currently only nodes are processed.
   */
  onElementSelect(event: any): void {
    if (event && 'id' in event) {
      this.onNodeClick(event.id);
    }
  }

  /**
   * Handles logic depending on edge creation mode or selection.
   */
  onNodeClick(nodeId: string): void {
    if (this.isCreatingEdge) {
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
    } else {
      this.selectedNodeId = nodeId;
    }
  }

  /**
   * Toggles the edge creation mode on or off.
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
