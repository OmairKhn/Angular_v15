import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service'; // Ensure the path is correct
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = []; // To store fetched users
  editMode: boolean = false;
  editUserId: number | null = null;

  constructor(private fb: FormBuilder, private service: UserService) {
    this.userForm = this.fb.group({
      name: [''],
      phone: [''],
      email: [''],
      age: ['']
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  // Fetch users from the server
  getUsers(): void {
    this.service.getUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        alert('Failed to fetch users. Please try again.');
      }
    });
  }

  // Add or Update a user
  onSubmit(): void {
    if (this.editMode && this.editUserId !== null) {
      // Update user logic
      this.service.updateUser(this.editUserId, this.userForm.value).subscribe({
        next: (data) => {
          alert('User updated successfully!');
          this.userForm.reset();
          this.editMode = false;
          this.editUserId = null;
          this.getUsers();
        },
        error: (err) => {
          console.error('Error updating user:', err );
          alert('Failed to update user. Please try again.');
        }
      });
    } else {
      // Add user logic
      this.service.addUser(this.userForm.value).subscribe({
        next: (data: any) => {
          console.log(data)
          alert('User added successfully!');
          this.userForm.reset();
          this.getUsers();
        },
        error: (err: any) => {
          console.error('Error adding user:', err);
          alert('Failed to add user. Please try again.');
        }
      });
    }
  }

  // Reset the form and exit edit mode
  onReset(): void {
    this.userForm.reset();
    this.editMode = false;
    this.editUserId = null;
  }

  // Delete a user
  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(id).subscribe({
        next: () => {
          alert('User deleted successfully!');
          this.getUsers();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user. Please try again.');
        }
      });
    }
  }

  // Edit a user
  editUser(user: any): void {
    this.editMode = true;
    this.editUserId = user.id;
    this.userForm.patchValue({
      name: user.name,
      phone: user.phone,
      email: user.email,
      age: user.age
    });

    // Switch to the Add User tab
    const addUserTab = document.getElementById('pills-home-tab') as HTMLElement;
    addUserTab.click();
  }
}
