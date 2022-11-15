import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
interface val {
  value: string;
 
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private dialog:MatDialog) { }
  id:string="nikhil"

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  login(){
    const notnull = document.getElementById(this.id);
    if(notnull != null){
      notnull.style.display='block'
      console.log(notnull)
     }
    
  }


  openDialog() {
    // console.log('id????', action);
     const dialogRef1 = this.dialog.open(LoginComponent, {
       width: '50%',
       height: '80%',
      
     });
    //  dialogRef1.afterClosed().subscribe((result: any) => {
    //    //this.getAllproduct();
    //  });
   }

}
