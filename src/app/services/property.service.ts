import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../auth/auth-service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiurl = environment.API_URL;
  arrayPropertySubject: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor(private http: HttpClient,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  addproperty(file: File, property: any){
    const propertydata = new FormData();
    propertydata.append('image', file);
    propertydata.append('title', property.title);
    propertydata.append('description', property.description);
    propertydata.append('status', property.status);
    propertydata.append('type', property.type);
    propertydata.append('rooms', property.rooms);
    propertydata.append('price', property.price);
    propertydata.append('area', property.area);
    propertydata.append('address', property.address);
    propertydata.append('country', property.country);
    propertydata.append('state', property.state);
    propertydata.append('city', property.city);
    propertydata.append('latitude', property.latitude);
    propertydata.append('longitude', property.longitude);
    propertydata.append('age', property.age);
    propertydata.append('bed', property.bed);
    propertydata.append('bath', property.bath);

  return this.http.post<any>(`${this.apiurl}/property`, propertydata).subscribe(
    (resdata) => {
      const currentArray = this.arrayPropertySubject.getValue();
      const existingIndex = currentArray.findIndex((p: any) => p._id === resdata.data._id);
      if (existingIndex !== -1) {
        currentArray[existingIndex] = resdata.data;
      } else {
        currentArray.push(resdata.data);
      }
      this.arrayPropertySubject.next(currentArray);
      this.toaster.success(resdata.message, resdata.status);

      this.spinner.hide();
      this.router.navigate(['/home']);
    },
    (err) => {
      console.log(err);
      this.toaster.error(err.error.message, err.error.status);
      this.spinner.hide();
    }
  );
  }

  allProperties(){
    return this.http.get<any>(`${this.apiurl}/allProperties`).subscribe( properties => {
      this.arrayPropertySubject.next(properties.properties);
    },
    error => {
      console.error('Failed to fetch properties:', error);
    })
  }

  property(id:any){
    return this.http.get<any>(`${this.apiurl}/property/${id}`)
  }

  allowproperty(id:any,allow:boolean){
    let data={allowance:allow}
    return this.http.patch<any>(`${this.apiurl}/property/${id}`,data).subscribe(
      (resdata) => {
        const currentArray = this.arrayPropertySubject.getValue();
        const existingIndex = currentArray.findIndex((p: any) => p._id === resdata.property._id);
        if (existingIndex !== -1) {
          currentArray[existingIndex] = resdata.property;
        } else {
          currentArray.push(resdata.property);
        }
        this.arrayPropertySubject.next(currentArray);
        this.toaster.info(resdata.message, resdata.status);
        // this.arrayBehaviorSubject.next(resdata.data);
        this.router.navigate(['/admin/viewproperties']);
      },
      (err) => {
        this.toaster.error(err.error.message, err.error.status);
        this.spinner.hide();
      }
    );
  }

  booking(id:any,meg:String){
    const data={property_id:id,message:meg}
    return this.http.post<any>(`${this.apiurl}/booking`,data).subscribe(
      (resdata) => {
        this.toaster.info(resdata.message, resdata.status);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.toaster.error(err.error.message, err.error.status);
        this.spinner.hide();
      }
    );
  }

  findallbooking(){
    return this.http.get<any>(`${this.apiurl}/booking`).subscribe(
      (resdata) => {
        this.toaster.info(resdata.message, resdata.status);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.toaster.error(err.error.message, err.error.status);
        this.spinner.hide();
      }
    );
  }

}
