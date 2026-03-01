import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Rental, RentalForm} from '../../../core/models/rental.model';
import {Property} from '../../../core/models/property.model';
import {User} from '../../../core/models/user.model';
import {PropertyService} from '../../property/services/property.service';
import {UserService} from '../../user/services/user.service';

function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const start = control.get('startDate')?.value;
  const end = control.get('endDate')?.value;

  if (!start || !end) return null;

  return new Date(end) > new Date(start)
    ? null
    : {dateRange: true};
}

@Component({
  selector: 'app-rental-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.scss']
})
export class RentalFormComponent implements OnChanges, OnInit {
  @Input() rental?: Rental;
  @Output() save = new EventEmitter<RentalForm>();
  @Output() cancel = new EventEmitter<void>();

  properties: Property[] = [];
  tenants: User[] = [];

  form = new FormGroup({
    propertyId: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    userId: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  }, {validators: dateRangeValidator});

  constructor(
    private propertyService: PropertyService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.propertyService.getAllProperties().subscribe({
      next: data => {
        this.properties = data;
        if (this.rental) {
          const match = this.properties.find(p => p.name === this.rental!.propertyName);
          this.form.patchValue({propertyId: match ? match.id : 0});
        }
      },
      error: err => console.error(err)
    });

    this.userService.getTenants().subscribe({
      next: data => {
        this.tenants = data;
        if (this.rental) {
          const match = this.tenants.find(t =>
            t.firstName + ' ' + t.lastName === this.rental!.userFullName
          );
          this.form.patchValue({userId: match ? match.id : 0});
        }
      },
      error: err => console.error(err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rental'] && this.rental) {
      this.form.patchValue({
        propertyId: 0,
        userId: 0,
        startDate: this.rental.startDate,
        endDate: this.rental.endDate
      });
    } else {
      this.form.reset({propertyId: 0, userId: 0});
    }
  }

  get f() {
    return this.form.controls;
  }

  get dateRangeError(): boolean {
    return this.form.errors?.['dateRange'] &&
      this.f.startDate.touched &&
      this.f.endDate.touched;
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.save.emit(this.form.value as RentalForm);
  }

  onCancel() {
    this.cancel.emit();
  }

  openDatePicker(event: MouseEvent) {
    const input = event.target as HTMLInputElement;
    input.showPicker();
  }

  get minEndDate(): string {
    return this.f.startDate.value ?? '';
  }

  get maxStartDate(): string {
    return this.f.endDate.value ?? '';
  }
}
