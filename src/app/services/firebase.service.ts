import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    userEmail?: string;
}

@Injectable({ providedIn: 'root' })
export class FirebaseService {
    constructor(private auth: Auth, private firestore: Firestore) { }

    // 🔹 AUTH
    register(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    logout() {
        return signOut(this.auth);
    }

    getCurrentUser() {
        return new Promise<any>((resolve) => {
            onAuthStateChanged(this.auth, (user) => resolve(user));
        });
    }

    // 🔹 TASKS
    getUserTasks(email: string): Observable<Task[]> {
        const tasksRef = collection(this.firestore, 'tasks');
        const q = query(tasksRef, where('userEmail', '==', email));
        return collectionData(q, { idField: 'id' }) as Observable<Task[]>;
    }

    addTask(task: Task) {
        const tasksRef = collection(this.firestore, 'tasks');
        return addDoc(tasksRef, task);
    }

    updateTask(task: Task) {
        const taskDoc = doc(this.firestore, `tasks/${task.id}`);
        return updateDoc(taskDoc, { ...task });
    }

    deleteTask(id: string) {
        const taskDoc = doc(this.firestore, `tasks/${id}`);
        return deleteDoc(taskDoc);
    }
}
