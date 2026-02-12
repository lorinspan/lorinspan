import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DecisionNode, DecisionOption } from "./Decision";
import { TreeService } from "./tree.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private treeService = inject(TreeService);

  // Date principale
  tree: Record<string, DecisionNode> = {};
  treeArray: DecisionNode[] = [];

  // Navigare utilizator
  currentNode: DecisionNode | null = null;
  history: string[] = [];

  // Admin / Login
  isLoggedIn = false;
  showLoginForm = false;
  username = '';
  password = '';

  ngOnInit() {
    this.treeService.tree$.subscribe(data => {
      if (data && Object.keys(data).length > 0) {
        this.tree = data;
        this.updateTreeArray();

        // Inițializare nod curent dacă nu există
        if (!this.currentNode || !this.tree[this.currentNode.id]) {
          this.currentNode = this.tree['START'] || this.treeArray[0];
        } else {
          // Refresh la datele curente
          this.currentNode = this.tree[this.currentNode.id];
        }
      }
    });
  }

  // --- LOGICA UTILIZATOR (Partea de sus) ---
  selectOption(nextNodeId: string): void {
    if (this.currentNode && this.tree[nextNodeId]) {
      this.history.push(this.currentNode.id);
      this.currentNode = this.tree[nextNodeId];
    } else {
      alert('Eroare: Următorul pas nu a fost configurat corect (ID invalid).');
    }
  }

  goBack(): void {
    if (this.history.length > 0) {
      const lastId = this.history.pop()!;
      this.currentNode = this.tree[lastId];
    }
  }

  reset(): void {
    this.history = [];
    this.currentNode = this.tree['START'];
  }

  // --- LOGICA ADMIN (Editorul) ---

  // 1. Adăugare Nod Nou
  addNewNode(type: 'QUESTION' | 'RESULT') {
    const newId = 'NODE_' + Date.now(); // Generăm un ID unic automat

    const newNode: DecisionNode = {
      id: newId,
      text: type === 'QUESTION' ? 'Scrie noua întrebare aici...' : 'Scrie recomandarea finală aici...',
    };

    if (type === 'QUESTION') {
      newNode.options = [{ label: 'Da', nextNodeId: 'START' }]; // Default option
    } else {
      newNode.result = 'RECOMANDARE';
    }

    this.treeArray.push(newNode);
    this.syncArrayToMap(); // Actualizăm obiectul intern

    // Scroll automat jos (opțional)
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
  }

  // 2. Ștergere Nod
  deleteNode(nodeId: string) {
    if (nodeId === 'START') {
      alert('Nu poți șterge nodul de START!');
      return;
    }
    if (confirm('Sigur vrei să ștergi acest pas? Legăturile către el se vor rupe.')) {
      this.treeArray = this.treeArray.filter(n => n.id !== nodeId);
      this.syncArrayToMap();
    }
  }

  // 3. Adăugare Opțiune (Buton de răspuns)
  addOptionToNode(node: DecisionNode) {
    if (!node.options) node.options = [];
    node.options.push({ label: 'Opțiune nouă', nextNodeId: 'START' });
  }

  // 4. Ștergere Opțiune
  removeOptionFromNode(node: DecisionNode, index: number) {
    if (node.options) {
      node.options.splice(index, 1);
    }
  }

  // 5. Conversie Întrebare <-> Rezultat
  toggleNodeType(node: DecisionNode) {
    if (node.result) {
      // Transformă în întrebare
      delete node.result;
      node.options = [{ label: 'Da', nextNodeId: 'START' }];
      node.text = 'Întrebare nouă...';
    } else {
      // Transformă în rezultat
      delete node.options;
      node.result = 'MONITORIZARE'; // Default category
      node.text = 'Recomandare finală...';
    }
  }

  // Ajutătoare pentru sincronizare
  private updateTreeArray() {
    this.treeArray = Object.values(this.tree);
  }

  private syncArrayToMap() {
    const newTree: Record<string, DecisionNode> = {};
    this.treeArray.forEach(node => newTree[node.id] = node);
    this.tree = newTree;
  }

  // --- FIREBASE & AUTH ---
  login() {
    if (this.username === 'admin' && this.password === 'bd-ipmn') {
      this.isLoggedIn = true;
      this.showLoginForm = false;
    } else {
      alert('Date incorecte');
    }
  }

  saveToFirebase() {
    this.syncArrayToMap();
    this.treeService.saveTree(this.tree)
      .then(() => alert('Modificările au fost salvate cu succes!'))
      .catch(err => alert('Eroare la salvare: ' + err.message));
  }
}
