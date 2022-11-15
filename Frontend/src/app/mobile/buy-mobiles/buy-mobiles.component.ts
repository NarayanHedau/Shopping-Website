import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-mobiles',
  templateUrl: './buy-mobiles.component.html',
  styleUrls: ['./buy-mobiles.component.scss']
})
export class BuyMobilesComponent implements OnInit {
  myThumbnail="../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg";
  myFullresImage="../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg";

  imageObject = [
    {
    image: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
    thumbImage: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
    // title: 'Hummingbirds are amazing creatures'
    },
    {
      image: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
      thumbImage: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
      // title: 'Hummingbirds are amazing creatures'
      },
      {
        image: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
        thumbImage: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
        // title: 'Hummingbirds are amazing creatures'
        },
        {
          image: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
          thumbImage: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
          // title: 'Hummingbirds are amazing creatures'
          },
          {
            image: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
            thumbImage: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
            // title: 'Hummingbirds are amazing creatures'
            },
            {
              image: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
              thumbImage: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
              // title: 'Hummingbirds are amazing creatures'
              },
              {
                image: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
                thumbImage: '../../../assets/i phone Image 2022-11-11 at 1.30.12 PM.jpeg',
                // title: 'Hummingbirds are amazing creatures'
                },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
