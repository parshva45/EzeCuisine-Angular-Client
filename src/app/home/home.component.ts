import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  slides = [
    {
      imageSrc: 'http://www.hhdenver.com/data1/images/fullhdwallpaperfood65.jpg',
      mainHeading: 'Main heading',
      subHeading: 'Sub heading'
    },
    {
      imageSrc: 'https://dmkz2i5qfmsty.cloudfront.net/aa7c2b48-6a24-4cf1-81de-682a0ed78ed3.jpg',
      mainHeading: 'Main heading',
      subHeading: 'Sub heading'
    },
    {
      imageSrc: 'http://www.donafilipahotel.com/media/2399125/_8004535.jpg?mode=crop-up&cropUpAlias=carousel&quality=70',
      mainHeading: 'Main heading',
      subHeading: 'Sub heading'
    }
  ];

  ngOnInit() {
  }

}
