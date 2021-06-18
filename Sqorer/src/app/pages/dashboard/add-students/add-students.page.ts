import { ParentService } from './../../../services/parent.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.page.html',
  styleUrls: ['./add-students.page.scss'],
})
export class AddStudentsPage implements OnInit {
  children: any[];

  constructor(private parentService: ParentService) { }

  ngOnInit() {
    this.getAllChildern();
  }

  getAllChildern() {
    this.parentService.getAllChildrens().subscribe((data) => this.children = data);
  }

  addChild(form){
    this.parentService.addChildren(form.value).subscribe((data)=>{
      if(data.msg){
        alert(data.msg);
        this.getAllChildern();
      }
    });
  }

}
