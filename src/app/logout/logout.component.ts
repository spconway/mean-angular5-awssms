import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from "../services/authorize.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authorizeService: AuthorizeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authorizeService.logout();
    this.router.navigate(['/login']);
  }

}
