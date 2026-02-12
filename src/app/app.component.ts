import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {DecisionNode} from "./Decision";
import {IPMN_TREE} from "./IPMN_TREE";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentNode: DecisionNode = IPMN_TREE['START'];
  history: string[] = [];

  selectOption(nextNodeId: string): void {
    this.history.push(this.currentNode.id);
    this.currentNode = IPMN_TREE[nextNodeId];
  }

  goBack(): void {
    if (this.history.length > 0) {
      const lastId = this.history.pop()!;
      this.currentNode = IPMN_TREE[lastId];
    }
  }

  reset(): void {
    this.history = [];
    this.currentNode = IPMN_TREE['START'];
  }
}
