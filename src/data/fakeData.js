import burger_king from '../assets/images/restaurant_logo/burger_king.png';
import jco from '../assets/images/restaurant_logo/jco.png';
import kfc from '../assets/images/restaurant_logo/kfc.png';
import starbucks from '../assets/images/restaurant_logo/starbucks.png'

import fotocard from '../assets/images/fotocard.png';

const data = {
  near: [
    {
      id:10,
      restaurant: "Geprek Bensu",
      img: "https://www.marketeers.com/wp-content/uploads/2018/09/w644.jpeg",
      location: "0.2 KM"
    },
    {
      id:11,
      restaurant: "Nasi Goreng Mas Rony",
      img: "https://www.masakapahariini.com/wp-content/uploads/2019/01/nasi-goreng-jawa-620x440.jpg",
      location: "0.6 KM"
    },
    {
      id: 12,
      restaurant: "Pecel Ayam Prambanan",
      img: "https://www.masakapahariini.com/wp-content/uploads/2020/05/resep-pecel-ayam-1024x769.jpg",
      location: "0.6 KM"
    },
    {
      id:13,
      restaurant: "Kopi Kenangan",
      img: "https://ik.imagekit.io/tvlk/cul-asset/guys1L+Yyer9kzI3sp-pb0CG1j2bhflZGFUZOoIf1YOBAm37kEUOKR41ieUZm7ZJ/tvlk-prod-cul-assets/culinary/asset/REST_ken-720x779-FIT_AND_TRIM-a0bf7a71339b4ff79e2937b87ec9e7ac.jpeg?tr=q-40,c-at_max,w-1080,h-1920&_src=imagekit",
      location: "1.6 KM"
    }
  ],
  popular: [
    {
      id: 2,
      restaurant: "Burger King",
      logo: burger_king,
      products: []
    }, 
    {
      id: 3,
      restaurant: "Starbucks",
      logo: starbucks,
      products: []
    }, 
    {
      id: 4,
      restaurant: "KFC",
      logo: kfc,
      products: []
    }, 
    {
      id: 5,
      restaurant: "Jco",
      logo: jco,
      products: []
    }, 
  ],
  users:[
    {
      
      id: 1,
      email: "geprekBensu@gmail.com",
      fullName: "Geprek Bensu",
      gender: "male",
      password: "paspas",
      phoneNumber: "0909090909",
      role: "partner",
      fotoprofil: "",
      products: 
      [
        {
          name: "Paket Geprek" ,
          price: 15000,
          imgUrl: "https://www.marketeers.com/wp-content/uploads/2018/09/w644.jpeg"
        },
        {
          name: "Paket Geprek Keju" ,
          price: 20000,
          imgUrl: "https://assets-pergikuliner.com/uploads/image/picture/827657/picture-1518685049.jpg"
        },
        {
          name: "Paket Geprek Leleh" ,
          price: 25000,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD17PS9BULmZVFIUmFwxEqMbbvNExkUKTmKQ&usqp=CAU"

        },
        {
          name: "Paket Sambel Matah" ,
          price: 15000,
          imgUrl: "https://tastynesia.com/wp-content/uploads/2020/01/Resep-Ayam-Geprek-Sambal-Matah-1200x900.jpg"

        },
        {
          name: "Mie Ayam Geprek" ,
          price: 15000,
          imgUrl: "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/3/22/5659208/5659208_45bd39cc-43b4-428d-a53d-4f22ba8e1a22_550_550.jpg"

        },
        {
          name: "Mie Ayam Geprek Keju" ,
          price: 15000,
          imgUrl: "https://i1.wp.com/makassarkuliner.com/wp-content/uploads/2017/12/ayamgeprekmaster8-makassar-kuliner.jpg?resize=1000%2C667&ssl=1"

        },
        {
          name: "Mie Ayam Leleh" ,
          price: 15000,
          imgUrl: "http://mhm.asia/wp-content/uploads/2017/05/mie-samyang-640x532.jpg"

        },
        {
          name: "Mie Ayam Sambel Telur Asin" ,
          price: 15000,
          imgUrl: "https://tastynesia.com/wp-content/uploads/2020/01/Resep-Ayam-Geprek-Sambal-Matah-1200x900.jpg"

        },
      ]
    },
    {
      id:2,
      email: "asepSuherman@gmail.com",
      fullName: "asep cihuy",
      gender: "male",
      password: "paspas",
      phoneNumber: "0909090909",
      role: "user",
      fotoprofil: fotocard
    }
  ]
}

export default data;