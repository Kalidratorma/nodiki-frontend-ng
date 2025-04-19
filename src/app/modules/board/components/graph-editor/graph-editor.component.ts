import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Node } from '@models/Node';
import { Edge } from '@models/Edge';
import { GraphService } from '@core/services/graph.service';

/**
 * Graph editor component for displaying and interacting with nodes and edges.
 * Allows dragging nodes and visualizing connections.
 */
@Component({
  selector: 'app-graph-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-editor.component.html',
  styleUrls: ['./graph-editor.component.scss']
})
export class GraphEditorComponent implements OnInit {
  /** Reference to the SVG element */
  @ViewChild('svgRoot', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  /** List of nodes */
  nodes: Node[] = [];

  /** List of edges */
  edges: Edge[] = [];

  /** Currently dragged node ID */
  draggingNodeId: string | null = null;

  /** Drag offset within the node */
  dragOffset = { x: 0, y: 0 };

  constructor(private graphService: GraphService) {}

  /**
   * Initialize component by loading nodes and edges from the backend.
   */
  ngOnInit(): void {
    this.graphService.getNodes().subscribe(nodes => this.nodes = nodes);
    this.graphService.getEdges().subscribe(edges => this.edges = edges);
  }

  /**
   * Mouse down on a node: begin dragging
   */
  onNodeMouseDown(event: MouseEvent, node: Node): void {
    this.draggingNodeId = node.id;
    this.dragOffset = {
      x: event.offsetX - node.x,
      y: event.offsetY - node.y
    };
  }

  /**
   * Mouse move: update node position if dragging
   */
  onMouseMove(event: MouseEvent): void {
    if (!this.draggingNodeId) return;

    const node = this.nodes.find(n => n.id === this.draggingNodeId);
    if (!node) return;

    const svg = this.svgRef.nativeElement.getBoundingClientRect();
    node.x = event.clientX - svg.left - this.dragOffset.x;
    node.y = event.clientY - svg.top - this.dragOffset.y;
  }

  /**
   * Mouse up: stop dragging
   */
  onMouseUp(): void {
    this.draggingNodeId = null;
  }

  /**
   * Find a node by its ID
   */
  getNode(id: string): Node | undefined {
    return this.nodes.find(n => String(n.id) === String(id));
  }
  /**
   * Generate unique edge ID
   */
  generateEdgeId(): string {
    return 'e' + Math.random().toString(36).substring(2, 9);
  }
}
