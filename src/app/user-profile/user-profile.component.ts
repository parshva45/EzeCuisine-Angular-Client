import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user.model.client';
import {UserServiceClient} from '../services/user.service.client';
import {Like} from '../models/like.model.client';
import {Rating} from '../models/rating.model.client';
import {LikeServiceClient} from '../services/like.service.client';
import {RatingServiceClient} from '../services/rating.service.client';
import {FollowServiceClient} from '../services/follow.service.client';
import {Follow} from '../models/follow.model.client';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userService: UserServiceClient,
              private likeService: LikeServiceClient,
              private ratingService: RatingServiceClient,
              private followService: FollowServiceClient,
              private router: Router) {
    this.route.params.subscribe(params =>  this.loadUser(params['username']));
  }

  currentUser: User = new User();
  user: User = new User();
  likedRecipes: Like[] = [];
  ratedRecipes: Rating[] = [];
  followers: Follow[] = [];
  followings: Follow[] = [];
  selection = 'Liked Recipes';

  follow() {
    if (this.currentUser['username']) {
      this.followService
        .follow(this.user._id)
        .then(() =>  this.loadFollowersForUser());
    } else {
      this.router.navigate(['login']);
    }
  }

  loadUser(username) {
    this
      .userService
      .profileOfUser(username)
      .then(user => {
        this.user = user;
        this.loadLikedRecipesForUser();
        this.loadRatedRecipesForUser();
        this.loadFollowersForUser();
        this.loadFollowingForUser();
      });
  }

  navigateToRecipe(likedRecipe) {
    this.router.navigate(['search/' + likedRecipe.recipe.name + '/' + likedRecipe.recipe.yummlyId]);
  }

  navigateToFollowerProfile(follower) {
    this.router.navigate(['profile/' + follower.from.username]);
  }

  navigateToFollowingProfile(following) {
    this.router.navigate(['profile/' + following.to.username]);
  }

  loadLikedRecipesForUser() {
    this.likeService
      .findLikedRecipesForUser(this.user._id)
      .then(recipes => this.likedRecipes = recipes);
  }

  loadRatedRecipesForUser() {
    this.ratingService
      .findRatedRecipesForUser(this.user._id)
      .then(recipes => this.ratedRecipes = recipes);
  }

  loadFollowersForUser() {
    this.followService
      .getFollowers(this.user._id)
      .then(followers => this.followers = followers);
  }

  loadFollowingForUser() {
    this.followService
      .getFollowing(this.user._id)
      .then(followings => this.followings = followings);
  }

  changeSelection(selection) {
    this.selection = selection;
  }

  ngOnInit() {
    this
      .userService
      .profile()
      .then(user => {
        this.currentUser = user;
      });
  }
}
