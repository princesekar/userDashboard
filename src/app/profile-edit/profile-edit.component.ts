import { Component, OnInit } from '@angular/core'
import { SharedService } from '../shared.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profile: any;
  isEditing: boolean = false;
  formSubmitted: boolean = false;
  profileform: FormGroup = new FormGroup({});

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.profileform = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      secondname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      age: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{2}')]),
      address: new FormControl(null, Validators.required),
      pincode: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      district: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      number: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')])
    })
  }

  getUserProfile() {
    this.sharedService.fetchUserProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.setValueForm();
      },
      error: (error) => {
      }
    });
  }

  setValueForm() {
    this.profileform.patchValue({
      firstname: this.profile.firstname,
      secondname: this.profile.secondname,
      email: this.profile.email,
      age: this.profile.age,
      address: this.profile.address,
      pincode: this.profile.pincode,
      district: this.profile.district,
      country: this.profile.country,
      password: this.profile.password,
      number: this.profile.number,
    });
  }

  saveProfile() {
    this.formSubmitted = true;
    if (this.profileform.invalid) {
      return;
    }

    const profile = {
      firstname: this.profileform.value.firstname,
      secondname: this.profileform.value.secondname,
      email: this.profileform.value.email,
      age: this.profileform.value.age,
      address: this.profileform.value.address,
      pincode: this.profileform.value.pincode,
      district: this.profileform.value.district,
      country: this.profileform.value.country,
      password: this.profileform.value.password,
      number: this.profileform.value.number,
      imgUrl: this.profile.imgUrl,
      dashboard: this.profile.dashboard
    }
    this.sharedService.updateUserProfile(profile, this.profile.id).subscribe({
      next: (response) => {
        this.isEditing = false;
        alert('updated successfully')
        window.location.reload();
      },
      error: (error) => {
        alert('Error updating profile')
      }
    });
  }

  editProfile() {
    this.isEditing = !this.isEditing;
  }

  checkValidation(field: AbstractControl): boolean {
    return (
      field.invalid && (field.dirty || field.touched || this.formSubmitted)
    );
  }

  getAbstractControl(fieldName: string): AbstractControl {
    return this.profileform.get(fieldName)!;
  }
}
