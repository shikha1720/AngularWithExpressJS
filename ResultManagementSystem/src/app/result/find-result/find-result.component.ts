import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultService } from '../service/result.service';
import { Observable } from 'rxjs';
import { Result } from '../model/result';

@Component({
  selector: 'app-find-result',
  templateUrl: './find-result.component.html',
  styleUrls: ['./find-result.component.css']
})
export class FindResultComponent implements OnInit {
  result$!: Observable<Result>
  resultForm: any = new FormGroup({
    roll_no: new FormControl("", [Validators.required]),
    date_of_birth: new FormControl("", [Validators.required]),
  });
  get roll_no() {
    return this.resultForm.get('roll_no');
  }
  get date_of_birth() {
    return this.resultForm.get('date_of_birth');
  }

  constructor(private router: Router,
    private resultService: ResultService,) { }

  ngOnInit(): void {
  }

  findResult() {
    //console.log(this.resultForm.value.date_of_birth)
    if (this.resultForm.valid) {
      this.resultService.getRoll(this.resultForm.value.roll_no);
      this.resultService.getDate(this.resultForm.value.date_of_birth);
      this.result$ = this.resultService.findResult(this.resultForm.value.roll_no, this.resultForm.value.date_of_birth);

      this.result$.forEach(value => {
        if (value != null) {
          this.router.navigate(["/results/display-result/" + this.resultForm.value.date_of_birth + "/" + this.resultForm.value.roll_no]);
        }
        else {
          alert("Rollno or DateOfBirth is not valid.Please check once");
        }
      });
    }

  }
}
