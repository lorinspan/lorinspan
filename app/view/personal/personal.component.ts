import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  pin: string = '';
  correctPin: string = '2910';
  isUnlocked: boolean = false;
  checklist$!: Observable<any[]>;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {

    // Fetch all checklist items from Firestore
    const checklistCollection = collection(this.firestore, 'checklist');
    getDocs(checklistCollection).then(snapshot => {
      if (snapshot.empty) {
      } else {
        snapshot.forEach(doc => {
        });
      }
    }).catch(error => {
    });

    // Subscribe to real-time updates
    this.checklist$ = collectionData(checklistCollection, { idField: 'id' });
  }

  onPinChange() {
    if (this.pin === this.correctPin) {
      this.isUnlocked = true;

      // Subscribe to Firestore updates
      const checklistCollection = collection(this.firestore, 'checklist');
      this.checklist$ = collectionData(checklistCollection, { idField: 'id' });

      this.checklist$.subscribe(data => {
      });
    }
  }

  toggleCheckbox(item: any) {
    item.checked = !item.checked;
    this.updateCheckbox(item);
  }

  onCheckboxChange(item: any) {
    if (!item.checked) {
      item.response = null; // Dacă este debifat, eliminăm răspunsul pozitiv/negativ
    }
    this.updateCheckbox(item);
  }

  setResponse(item: any, response: string) {
    if (item.checked) {
      item.response = response; // Salvăm răspunsul doar dacă checkbox-ul este bifat
      this.updateCheckbox(item);
    }
  }

  updateCheckbox(item: any) {
    const checklistItemRef = doc(this.firestore, `checklist/${item.id}`);
    updateDoc(checklistItemRef, {
      checked: item.checked,
      response: item.checked ? item.response : null // Resetăm răspunsul când checkbox-ul e debifat
    })
      .then(() => console.log(`Updated: ${item.text}`))
      .catch(error => console.error('Error updating document: ', error));
  }


}
