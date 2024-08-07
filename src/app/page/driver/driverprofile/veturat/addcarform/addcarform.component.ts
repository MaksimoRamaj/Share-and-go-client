import { Component } from '@angular/core';
import { VeturatService } from '../veturat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addcarform',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './addcarform.component.html',
  styleUrl: './addcarform.component.css'
})
export class AddcarformComponent {

  toggle(){
    return this.veturatService.toggleAddCarForm();
  }

  addCarForm: FormGroup;
  carImage: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient,private veturatService : VeturatService) {
    this.addCarForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      licencePlateNumber: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.carImage = file;
    }
  }

  onSubmit() {
    if (this.addCarForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('make', this.addCarForm.get('make')?.value);
    formData.append('model', this.addCarForm.get('model')?.value);
    formData.append('licencePlateNumber', this.addCarForm.get('licencePlateNumber')?.value);
    
    if (this.carImage) {
      formData.append('carImage', this.carImage);
    }

    this.http.post('http://localhost:8080/api/car/add-car', formData).subscribe(
      {
        next: (response) => {
          alert('Car added successfully');
          this.toggle();
        },
        error: (error) => {
          if(error.status === 400){
            alert('Car already exists');
          }
          else if(error.status === 403){
            alert('You are not authorized to add a car');
          }
          else if(error.status === 200){
            alert('Makina u shtua me sukses!');
            this.toggle();
            this.veturatService.updateCars.next(true);
          }
      }  }
    );
  }
}

