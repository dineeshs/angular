import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const SOL_ID = "solid";
const ROLE = "role";
const ADNAME = "adname";
const SCALE = "scale";

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY!==null ? TOKEN_KEY : "");
  }

  public saveSolid(token: string) {
    window.sessionStorage.removeItem(SOL_ID);
    window.sessionStorage.setItem(SOL_ID,  token);
  }

  public getSolid(): string {
    return sessionStorage.getItem(SOL_ID!==null ? SOL_ID : "");
  }

  public saveRole(token: string) {
    window.sessionStorage.removeItem(ROLE);
    window.sessionStorage.setItem(ROLE,  token);
  }

  public getRole(): string {
    return sessionStorage.getItem(ROLE!==null ? ROLE : "");
  }

  public saveAdName(token: string) {
    window.sessionStorage.removeItem(ADNAME);
    window.sessionStorage.setItem(ADNAME,  token);
  }

  public getAdName(): string {
    return sessionStorage.getItem(ADNAME!==null ? ADNAME : "");
  }

  public saveScale(token: string) {
    window.sessionStorage.removeItem(SCALE);
    window.sessionStorage.setItem(SCALE,  token);
  }

  public getScale(): string {
    return sessionStorage.getItem(SCALE!==null ? SCALE : "");
  }
}
