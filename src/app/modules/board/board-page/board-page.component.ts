import {Component, OnInit} from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { CommonModule } from '@angular/common';
import { Node, Edge } from '@swimlane/ngx-graph';
import { GraphService } from '../../../core/services/graph.service';

/**
 * Main board page with graph visualization.
 */
@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [CommonModule, NgxGraphModule],
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  /**
   * List of graph nodes.
   */
  nodes: Node[] = [
    {
      id: '1',
      label: 'Node 1',
    },
    {
      id: '2',
      label: 'Node 2',
    },
    {
      id: '3',
      label: 'Node 3',
    }
  ];

  /**
   * List of edges between nodes.
   */
  links: Edge[] = [
    {
      id: '1-2',
      source: '1',
      target: '2',
      label: 'Link A'
    },
    {
      id: '2-3',
      source: '2',
      target: '3',
      label: 'Link B'
    }
  ];


  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.graphService.getGraph().subscribe(({ nodes, edges }) => {
      this.nodes = nodes;
      this.links = edges;
    });
  }
}
