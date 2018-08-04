import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectExt } from '../project-service/project-service';
import { FavoriteFirebase, Favorite } from '../../models/favorites';
import { UserExt } from '../user-service/user-service';
import { Subscription } from 'rxjs/internal/Subscription';

export interface FavoriteExt extends Favorite {

}

@Injectable()
export class FavoriteServiceProvider {

  favoritesProject: FavoriteExt[];
  favoritesUser: FavoriteExt[];

  //
  favoriteListener: Subscription;

  constructor(public http: HttpClient, private favoriteFirebase: FavoriteFirebase) {
    console.log('Hello FavoriteServiceProvider Provider');
  }

  async loadFavorites(userID: string) {
    this.favoriteFirebase.loadFavorites(userID).subscribe(res => {
      this.favoritesProject = [];
      this.favoritesUser = [];
      if(typeof res != 'undefined') {
        if(typeof res['project'] != 'undefined') {
          res['project'].map(data => {
            let event = data as FavoriteExt;
            this.favoritesProject.push(event);
          })
        }
        else {
          this.favoriteFirebase.updateProject([]);
        }
  
        if(typeof res['user'] != 'undefined') {
          res['user'].map(data => {
            let event = data as FavoriteExt;
            this.favoritesUser.push(event);
          })
        }
        else {
          this.favoriteFirebase.updateUser([]);
        } 
      }
      else {
        this.favoriteFirebase.createDocument();
      }
    });
  }

  getFavoriteProject() {
    return this.favoritesProject;
  }

  addProjectFavorite(project: ProjectExt) {

    let new_favorite: FavoriteExt;
    new_favorite = {
      id: project.id
    }
    
    this.favoritesProject.push(new_favorite);
    this.favoriteFirebase.updateProject(this.favoritesProject);
  }

  deleteProjectFavorite(project: ProjectExt) {
    this.favoritesProject = this.favoritesProject.filter(value => value.id !== project.id);
    this.favoriteFirebase.updateProject(this.favoritesProject);
  }

  getFavoriteUsers() {
    return this.favoritesUser;
  }

  addUserFavorite(user: UserExt) {
    
    let new_favorite: FavoriteExt;
    new_favorite = {
      id: user.id
    }
    
    this.favoritesUser.push(new_favorite);
    this.favoriteFirebase.updateUser(this.favoritesUser);
  }
  
}
