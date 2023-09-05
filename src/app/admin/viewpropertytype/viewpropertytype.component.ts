import { Component,  OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-viewpropertytype',
  templateUrl: './viewpropertytype.component.html',
  styleUrls: ['./viewpropertytype.component.css']
})
export class ViewpropertytypeComponent implements OnInit {
  property_type:any[];
  
  constructor(
    private service:AdminService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.service.findproperty_type().subscribe((res)=>{
    this.service.arrayBehaviorSubject.next(res.data);
    },
    (err)=>{
      console.log(err);
    });

    this.service.arrayBehaviorSubject.subscribe(
    (res)=>{
      this.property_type=res;
    },
    (err)=>{
      console.log(err)
    })
  }

  onDelete(id:any,name:any)
  {
    if(confirm('you wanted to delete! ')){
      this.service.deleteproperty_type(id,name);
    }else{
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      });
    }
    
  }

  onUpdate(id:any,name:string){
      if(confirm('you wanted to update! ')){
      this.router.navigate([`/admin/updatepropertytype/${id}/${name}`]);
    }
    else
    {
      
    }
  };
}
