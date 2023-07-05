import { Component } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';
  isModalOpen = false;

  constructor(private crudServcie: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  closeModal() {
    this.isModalOpen = false;
  }
  getAllTask() {
    this.crudServcie.getAllTask().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (err) => alert('Unable to get all tasks')
    );
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudServcie.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => alert(err)
    );
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudServcie.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.editTaskValue = '';
      },
      (err) => alert('Failed to update task')
    );
    this.closeModal();
  }

  deleteTask(etask: Task) {
    this.crudServcie.deleteTask(etask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => alert('Failed to delete task')
    );
  }

  call(etask: Task) {
    this.isModalOpen = true;
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
