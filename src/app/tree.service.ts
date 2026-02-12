import { Injectable, inject } from '@angular/core';
import { Database, ref, set, onValue } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { DecisionNode } from './Decision';

@Injectable({ providedIn: 'root' })
export class TreeService {
  private db = inject(Database);
  private treeSubject = new BehaviorSubject<Record<string, DecisionNode>>({});
  tree$ = this.treeSubject.asObservable();

  constructor() {
    console.log('TreeService: Attempting to connect to Firebase...');

    // Verificăm calea exactă.
    const treeRef = ref(this.db, 'ipmn_tree');

    onValue(treeRef, (snapshot) => {
      const data = snapshot.val();
      console.log('TreeService: Data received from Firebase:', data);

      if (data) {
        this.treeSubject.next(data);
      } else {
        console.warn('TreeService: Connected, but "ipmn_tree" is empty or missing.');
      }
    }, (error) => {
      console.error('TreeService: Firebase Connection Error:', error);
      alert('Firebase Error: ' + error.message);
    });
  }

  saveTree(tree: Record<string, DecisionNode>) {
    console.log('TreeService: Saving data...');
    const treeRef = ref(this.db, 'ipmn_tree');
    return set(treeRef, tree);
  }
}
