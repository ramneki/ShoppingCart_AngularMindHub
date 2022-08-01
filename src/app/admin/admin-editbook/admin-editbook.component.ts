import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookserviceService } from 'src/app/services/books.service';
import { BookDetails } from 'src/app/shared/data/BookDetails';


@Component({
  selector: 'app-admin-editbook',
  templateUrl: './admin-editbook.component.html',
  styleUrls: ['./admin-editbook.component.scss']
})
export class AdminEditbookComponent implements OnInit {
  addBook: FormGroup=new FormGroup({});
  name:string;
  bookDetails:BookDetails;
  isActive:any=true;
  userId : any;
  ItemId:any;
  ourFile: File; 
  constructor(private fb:FormBuilder,private bookService:BookserviceService,private activateRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    this.userId=parseInt(localStorage.getItem('mnd:uid'));
    this.ItemId = this.activateRoute.snapshot.paramMap.get('id');
    this.getBookById();
    this.addBook = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(10)]],
      producttype: [null, [Validators.required]],
      menuid: [null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
      contenttype: [null, [Validators.required]],
      certification: [null, [Validators.required]],
      publisher: [null, [Validators.required]],
      details: [null],
      demo: [null],
      description: [null ],
      SystemReq: [null],
      ourprice: [null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
      listprice: [null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]],
      rating: [null, [Validators.required, Validators.minLength(1)]],
      
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      
      
    });
   
  }
getBookById(){
  const apiUrl:string=`books/GetBookById?id=${this.ItemId}&userId=${this.userId}`;
  this.bookService.getBookById(apiUrl).subscribe((data:any)=>{
    this.bookDetails=data;
    this.addBook.patchValue(this.bookDetails);

  })
}
  openInput(){ 
    // your can use ElementRef for this later
    document.getElementById("fileInput").click();
  }
  fileChange(files: File[]) {
    debugger;
    if (files.length > 0) {
      this.ourFile = files[0];
      console.log("file ",this.ourFile);
    }
  }
  validateControl(controllerName:string){
    debugger;
        if(this.addBook.get(controllerName)?.invalid && this.addBook.get(controllerName)?.touched){
          return true
        }else
        {return false;}
        
    
      }
      errorHandling(control:string,error:string)
      {
        return this.addBook.controls[control].hasError(error);
      }
      updateDetails(form:any){
        
      }

}
