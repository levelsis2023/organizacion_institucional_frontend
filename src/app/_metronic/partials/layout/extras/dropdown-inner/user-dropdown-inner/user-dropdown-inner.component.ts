import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../core';
import { AuthService } from 'src/app/modules/auth';
@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  user$: any = null; // Observable<any> = null;

  users_actives:any = [];
  constructor(private layout: LayoutService, private auth:AuthService) {}

  isHability:Boolean = false;
  ngOnInit(): void {
    this.user$ = this.auth.user;
    this.extrasUserDropdownStyle = this.layout.getProp(
      'extras.user.dropdown.style'
    );
    
  }

  logout() {
    this.auth.logout();
  } 
}
