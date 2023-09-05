import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  arrayBehaviorSubject: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  private apiurl = environment.API_URL;

  constructor(private http: HttpClient,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }


    addproperty_type(name:any){
     let data={name:name};
      return this.http.post<any>(`${this.apiurl}/addProperty_type`, data).subscribe(
        (resdata) => {
          this.toaster.info(resdata.message, resdata.status);
          this.spinner.hide();
          this.arrayBehaviorSubject.next(resdata.data);
        },
        (err) => {
          console.log(err);
          this.toaster.error(err.error.message, err.error.status);
          this.spinner.hide();
        }
      );
    }

    findproperty_type(){
      return this.http.get<any>(`${this.apiurl}/getProperty_type`)
    }

    findusers(){
      return this.http.get<any>(`${this.apiurl}/getalluser`)
    }

    deleteproperty_type(id:any,name:any){
      return this.http.delete<any>(`${this.apiurl}/deleteProperty_type/${id}`).subscribe(
        (resdata) => {
          this.toaster.success(resdata.message, resdata.status);
          this.router.navigate(['/admin/viewpropertytype']);
          this.arrayBehaviorSubject.next(resdata.data);
        },
        (err) => {
          this.toaster.error(err.error.message, err.error.status);
          this.spinner.hide();
        }
      );
    }

    updateproperty_type(id:any,name:string){
      let data={name:name}
      return this.http.patch<any>(`${this.apiurl}/updateProperty_type/${id}`,data).subscribe(
        (resdata) => {
          this.toaster.info(resdata.message, resdata.status);
          this.arrayBehaviorSubject.next(resdata.data);
          this.router.navigate(['/admin/viewpropertytype']);
        },
        (err) => {
          this.toaster.error(err.error.message, err.error.status);
          this.spinner.hide();
        }
      );
    }

    

}
