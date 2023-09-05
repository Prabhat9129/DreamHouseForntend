import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-updatepropertytype',
  templateUrl: './updatepropertytype.component.html',
  styleUrls: ['./updatepropertytype.component.css']
})
export class UpdatepropertytypeComponent implements OnInit {
  id:any;
  pname:any;

  constructor(private service:AdminService,
    private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.pname=this.route.snapshot.params['name'];
  }

  onSubmit(form:NgForm){
    this.id=this.route.snapshot.params['id'];
    this.service.updateproperty_type(this.id,this.pname);
  }
}
