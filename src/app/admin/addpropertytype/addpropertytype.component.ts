import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-addpropertytype',
  templateUrl: './addpropertytype.component.html',
  styleUrls: ['./addpropertytype.component.css']
})
export class AddpropertytypeComponent implements OnInit {
 constructor(private service:AdminService,
  private spinner: NgxSpinnerService){}
  ngOnInit(): void {
   
  }

  onSubmit(forms: NgForm){
    const name=forms.form.value.name;
    this.service.addproperty_type(name);
  }

}
