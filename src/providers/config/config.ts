import { Injectable } from '@angular/core';

let nameConfig: "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    username: ""
  }

  constructor() {

  }

  getConfig(): any {
    return localStorage.getItem(nameConfig) || {};
  }

  setConfig(showSlide?: boolean, name?: string, username?: string) {
    let config = {
      showSlide: false,
      name: "",
      username: ""
    }

    if (showSlide) {
      config.showSlide = showSlide;
    }

    if (name) {
      config.name = name;
    }

    if (username) {
      config.username = username;
    }

    localStorage.setItem(nameConfig, JSON.stringify(config));
  }


}
