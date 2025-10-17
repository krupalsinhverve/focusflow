import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
    addDoc,
    collection,
    collectionData,
    CollectionReference,
    deleteDoc,
    doc,
    Firestore,
    orderBy,
    query,
    updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
    constructor(private firestore: Firestore, private auth: Auth) { }

    private userTasksCollection(userId: string): CollectionReference {
        return collection(this.firestore, `users/${userId}/tasks`) as CollectionReference;
    }

    // Realtime task stream (sorted by createdAt desc)
    getTasksObservable(userId: string): Observable<Task[]> {
        const q = query(this.userTasksCollection(userId), orderBy('createdAt', 'desc'));
        return collectionData(q, { idField: 'id' }) as Observable<Task[]>;
    }

    async addTask(userId: string, task: Task): Promise<string> {
        if (!userId) throw new Error('User not logged in');
        const taskToAdd = {
            title: task.title,
            description: task.description || '',
            status: task.status || 'Pending',
            createdAt: Date.now()
        };
        const ref = await addDoc(this.userTasksCollection(userId), taskToAdd);
        return ref.id;
    }

    async updateTask(userId: string, task: Task): Promise<void> {
        if (!userId) throw new Error('User not logged in');
        if (!task.id) throw new Error('Task id is required to update');
        const taskRef = doc(this.firestore, `users/${userId}/tasks/${task.id}`);
        await updateDoc(taskRef, {
            title: task.title,
            description: task.description || '',
            status: task.status || 'Pending'
        });
    }

    async deleteTask(userId: string, taskId: string): Promise<void> {
        if (!userId) throw new Error('User not logged in');
        const taskRef = doc(this.firestore, `users/${userId}/tasks/${taskId}`);
        await deleteDoc(taskRef);
    }
}
