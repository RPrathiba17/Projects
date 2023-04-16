import { Component,ElementRef,EventEmitter,OnInit,Output,ViewChild,} from '@angular/core';
import { FlaskapiserviceService } from '../flaskapiservice.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [FlaskapiserviceService]
})
export class InputComponent implements OnInit{
  public file: any;
  predictForm: any;
  periodicity:any;
  num: any;
  ngOnInit(): void {
    this.predictForm = this.formBuilder.group({
      file: ['', Validators.required],
      periodicity: ['', Validators.required],
      num: ['', Validators.required],
    });
  }
 constructor(
   private flaskapiservice: FlaskapiserviceService, private formBuilder: FormBuilder, private router: Router,
   private dataService: DataService){}
 
 onFilechange(event: any) {

   this.file = event.target.files[0]
 }
 
 upload() {
   if (this.file) {
     this.flaskapiservice.postfile(this.file).subscribe(resp => {
       alert("Uploaded")
     })
   } else {
     alert("Please select a file first")
   }
 }
 predict() {
    this.flaskapiservice.postfile1(this.file,this.periodicity, this.num).subscribe((response) => {
      console.log(response);
      this.dataService.setData(response);
      this.router.navigate(['/dashboard']);
    }
    )
  }
}

